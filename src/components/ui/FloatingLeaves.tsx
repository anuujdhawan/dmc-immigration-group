/**
 * Shared floating-leaves decoration (the botanical hero's falling leaf field).
 * Renders the same `.botanical-leaf` spans used by the hero on every page that
 * wants the light-green hero treatment; styling/animation live in globals.css
 * (`.botanical-leaf`, `.leaf-1`…`.leaf-7`, `@keyframes botanicalLeafFloat`).
 */
const LEAVES = [
  { className: "leaf-1", top: "-4%", left: "7%" },
  { className: "leaf-2", top: "-5%", left: "25%", width: "18px" },
  { className: "leaf-3", top: "-7%", left: "44%", width: "29px" },
  { className: "leaf-4", top: "-4%", left: "63%" },
  { className: "leaf-5", top: "-8%", left: "79%", width: "20px" },
  { className: "leaf-6", top: "-5%", left: "90%", width: "27px" },
  { className: "leaf-7", top: "-6%", left: "53%", width: "17px" },
];

const LEAF_SVG =
  "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z";

export function FloatingLeaves() {
  return (
    <>
      {LEAVES.map((leaf) => (
        <span
          key={leaf.className}
          aria-hidden="true"
          className={`botanical-leaf ${leaf.className}`}
          style={{ top: leaf.top, left: leaf.left, ...(leaf.width ? { width: leaf.width } : {}) }}
        >
          <svg viewBox="0 0 24 24">
            <path d={LEAF_SVG} />
          </svg>
        </span>
      ))}
    </>
  );
}
