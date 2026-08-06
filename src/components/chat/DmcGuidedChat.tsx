"use client";

import dynamic from "next/dynamic";
import type { Market } from "@/config/markets";

const GuidedChatApp = dynamic(() => import("./GuidedChatApp"), {
  ssr: false,
  loading: () => null,
});

export function DmcGuidedChat({ market }: { market: Market }) {
  return (
    <>
      <GuidedChatApp market={market} />

      <style jsx global>{`
        /* ── Reposition the library's own chat button to bottom-left ── */
        .rcb-toggle-button {
          left: 24px !important;
          right: auto !important;
          bottom: 24px !important;
          width: 56px !important;
          height: 56px !important;
          /* Cube shape: square button with a small corner radius. */
          border-radius: 12px !important;
          box-shadow: none !important;
          border: none !important;
        }

        .rcb-toggle-icon {
          width: 56px !important;
          height: 56px !important;
          /* Keep the full icon visible — never crop it inside the cube. */
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
          border-radius: 12px !important;
        }

        /* Keep the chat bubble's base aligned with the WhatsApp bubble
           (WhatsAppLauncher uses Tailwind max-sm:bottom-4 = 16px below
           640px — Tailwind's max-sm is 639.98px, so match it exactly). */
        @media (max-width: 639.98px) {
          .rcb-toggle-button {
            bottom: 16px !important;
          }
        }

        /* Move the "Need help?" tooltip to sit beside the left bubble.
           Hidden by default (tooltip.mode = NEVER) and revealed only while
           the chat bubble is hovered. */
        .rcb-chat-tooltip {
          left: 84px !important;
          right: auto !important;
          bottom: 36px !important;
          background: #1d241b !important;
          color: #ffffff !important;
          border-radius: 14px 14px 14px 4px !important;
          padding: 10px 14px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          font-family: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif !important;
          box-shadow: 0 6px 20px rgba(7, 29, 4, 0.25) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transition: opacity 0.25s ease, visibility 0.25s ease !important;
        }

        .rcb-chatbot-global:has(.rcb-toggle-button:hover) .rcb-chat-tooltip {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }

        .rcb-chat-tooltip-tail {
          border-color: transparent #1d241b transparent transparent !important;
          left: -6px !important;
          right: auto !important;
        }

        /* Reposition the chat window to bottom-left */
        .rcb-chat-window {
          left: 24px !important;
          right: auto !important;
          bottom: 96px !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          box-shadow:
            0 25px 50px -12px rgba(7, 29, 4, 0.28),
            0 0 0 1px rgba(53, 142, 26, 0.14) !important;
        }

        /* ── Theme-matched overrides ── */
        .rcb-chat-header {
          background: linear-gradient(135deg, #43aa1b, #358e1a) !important;
          color: #ffffff !important;
          padding: 14px 18px !important;
          border-bottom: none !important;
          border-radius: 24px 24px 0 0 !important;
        }

        .rcb-chat-header .rcb-close-chat-icon,
        .rcb-chat-header .rcb-header-icon {
          color: #ffffff !important;
          fill: #ffffff !important;
        }

        .rcb-chat-input {
          background: #ffffff !important;
          border-top: 1px solid #e5f3df !important;
          padding: 12px 16px !important;
        }

        .rcb-chat-input-textarea {
          border: 1px solid #cce9c3 !important;
          border-radius: 16px !important;
          padding: 10px 14px !important;
          font-size: 14px !important;
          font-family: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif !important;
          resize: none !important;
          outline: none !important;
          transition: border-color 0.15s ease !important;
          background: #fbfef9 !important;
          color: #1d241b !important;
          /* Let the textarea shrink fully so the send button can never be
             pushed outside the window's right edge on narrow screens. */
          min-width: 0 !important;
          box-sizing: border-box !important;
        }

        .rcb-chat-input-textarea:focus {
          border-color: #358e1a !important;
          box-shadow: 0 0 0 3px rgba(53, 142, 26, 0.12) !important;
          background: #ffffff !important;
        }

        .rcb-chat-input-textarea::placeholder {
          color: #9aab96 !important;
        }

        .rcb-send-button {
          background: linear-gradient(135deg, #43aa1b, #358e1a) !important;
          color: #ffffff !important;
          border-radius: 50% !important;
          width: 38px !important;
          height: 38px !important;
          min-width: 38px !important;
          box-shadow: 0 2px 8px rgba(53, 142, 26, 0.3) !important;
        }

        .rcb-send-button:hover {
          background: linear-gradient(135deg, #358e1a, #2a7015) !important;
        }

        .rcb-chat-body-container {
          background: linear-gradient(180deg, #f4f9f1 0%, #ffffff 35%) !important;
          padding: 16px !important;
        }

        .rcb-options {
          background: #ffffff !important;
          color: #2a7015 !important;
          border: 1.5px solid #358e1a !important;
          border-radius: 999px !important;
          padding: 9px 20px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          font-family: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif !important;
        }

        .rcb-options:hover {
          background: linear-gradient(135deg, #43aa1b, #358e1a) !important;
          color: #ffffff !important;
          border-color: #358e1a !important;
        }

        .rcb-bot-message {
          background: linear-gradient(135deg, #f4f9f1, #e5f3df) !important;
          color: #1d241b !important;
          border-radius: 20px 20px 20px 6px !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          border: 1px solid rgba(53, 142, 26, 0.14) !important;
          box-shadow: 0 1px 3px rgba(23, 61, 13, 0.05) !important;
          max-width: 80% !important;
        }

        .rcb-user-message {
          background: linear-gradient(135deg, #43aa1b, #358e1a) !important;
          color: #ffffff !important;
          border-radius: 20px 20px 6px 20px !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          box-shadow: 0 1px 3px rgba(23, 61, 13, 0.12) !important;
          max-width: 80% !important;
          margin-left: auto !important;
        }

        .rcb-bot-avatar,
        .rcb-message-bot-avatar {
          display: none !important;
        }

        .rcb-typing-indicator {
          border-radius: 20px 20px 20px 6px !important;
          background: linear-gradient(135deg, #f4f9f1, #e5f3df) !important;
          border: 1px solid rgba(53, 142, 26, 0.14) !important;
        }

        .rcb-typing-indicator-dot {
          background: #358e1a !important;
        }

        .rcb-toast-prompt {
          border-radius: 14px !important;
          background: #358e1a !important;
          color: #ffffff !important;
          font-family: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif !important;
        }

        .rcb-spinner {
          border-color: rgba(53, 142, 26, 0.2) !important;
          border-top-color: #358e1a !important;
        }

        /* ── Mobile: full-screen chat ── */
        @media (max-width: 480px) {
          .rcb-chat-window {
            /* Anchor at the top of the screen. The library's mobile inline
               style already sets top:0, but being explicit here guards the
               case where an inline width/height overrides it. */
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            /* Dynamic viewport height: tracks the visible on-screen area as
               the mobile browser's toolbar collapses/expands and as the
               keyboard opens, so the input row (send button) never slides
               behind the browser chrome. The 'height: 100%' above is the
               fallback for browsers without dvh support. */
            height: 100dvh !important;
            border-radius: 0 !important;
          }

          .rcb-chat-header {
            border-radius: 0 !important;
          }

          .rcb-chat-tooltip {
            left: 84px !important;
            bottom: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
