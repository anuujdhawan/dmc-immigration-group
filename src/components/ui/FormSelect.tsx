"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/lib/utils/cn";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  id?: string;
  label?: string;
  placeholder?: string;
  options: FormSelectOption[];
  /** Render a "placeholder" row at the top of the list so the field can be cleared. Default true. */
  showPlaceholder?: boolean;
  error?: string;
  className?: string;
}

/**
 * Custom dropdown select. Native `<select>` popups are rendered by the OS on
 * mobile/tablet (iOS wheel, Android dialog), so this component renders its own
 * listbox directly beneath the field it belongs to on every viewport.
 */
export function FormSelect<T extends FieldValues>({
  name,
  control,
  id,
  label,
  placeholder = "Select",
  options,
  showPlaceholder = true,
  error,
  className,
}: FormSelectProps<T>) {
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const listboxId = `${autoId}-listbox`;

  const list = showPlaceholder ? [{ value: "", label: placeholder }, ...options] : options;
  const selected = options.find((option) => option.value === field.value);
  const selectedLabel = selected?.label ?? placeholder;

  // Close when tapping/clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectOption = (value: string) => {
    field.onChange(value);
    setOpen(false);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = list.findIndex((option) => option.value === field.value);
        setHighlighted(currentIndex >= 0 ? currentIndex : 0);
        setOpen(true);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((index) => Math.min(list.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((index) => Math.max(0, index - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setHighlighted(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setHighlighted(list.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = list[highlighted];
      if (option) selectOption(option.value);
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        // Close when focus moves outside the component (Tab away, or a second
        // select opened via keyboard) — but not when focus moves between the
        // trigger and a listbox option, which are both inside this wrapper.
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-left text-sm transition focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "focus:border-brand-500 focus:ring-brand-300",
          !selected ? "text-slate-400" : "text-ink",
          className,
        )}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn("size-3 shrink-0 text-slate-500 transition-transform", open && "rotate-180")}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white py-1.5 shadow-2xl shadow-brand-950/10"
        >
          {list.map((option, index) => {
            const isSelected = field.value === option.value;
            const isHighlighted = highlighted === index;
            return (
              <li key={option.value || "__placeholder__"} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onPointerDown={(event) => {
                    // Keep focus on the trigger: focus moving into an option would
                    // fire the wrapper's focusout close and unmount the listbox
                    // before this click could select (a real hazard on touch).
                    event.preventDefault();
                  }}
                  ref={(node) => {
                    // Keep the keyboard-highlighted option in view inside the
                    // scrollable max-height listbox.
                    if (node && isHighlighted) {
                      node.scrollIntoView({ block: "nearest" });
                    }
                  }}
                  onClick={() => selectOption(option.value)}
                  onMouseEnter={() => setHighlighted(index)}
                  className={cn(
                    "block w-full px-4 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : isHighlighted
                        ? "bg-slate-50 text-ink"
                        : option.value === ""
                          ? "text-slate-500"
                          : "text-ink hover:bg-slate-50",
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
