"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { Market } from "@/config/markets";
import { buildFlow } from "@/config/guided-chat.flow";

const ChatBot = dynamic(() => import("react-chatbotify").then((m) => m.default), {
  ssr: false,
  loading: () => null,
});

const CHAT_SETTINGS = {
  general: {
    primaryColor: "#358e1a",
    secondaryColor: "#2a7015",
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
    showHeader: true,
    showFooter: false,
    showInputRow: true,
  },
  tooltip: {
    mode: "CLOSE",
    text: "Need help? Chat with us! 💬",
  },
  chatWindow: {
    showScrollbar: true,
    showTypingIndicator: true,
    autoJumpToBottom: true,
    defaultOpen: false,
  },
  header: {
    showAvatar: false,
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #43aa1b, #358e1a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
            boxShadow: "0 2px 6px rgba(7, 29, 4, 0.25)",
          }}
        >
          DM
        </div>
        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
            }}
          >
            DM Consultants
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "1px" }}>
            Immigration Experts
          </div>
        </div>
      </div>
    ),
  },
  botBubble: {
    showAvatar: false,
  },
  userBubble: {
    showAvatar: false,
  },
  notification: {
    disabled: false,
    volume: 0.5,
  },
  emoji: {
    disabled: true,
  },
  audio: {
    disabled: true,
  },
  voice: {
    disabled: true,
  },
  fileAttachment: {
    disabled: true,
  },
  chatHistory: {
    disabled: true,
  },
  device: {
    desktopEnabled: true,
    mobileEnabled: true,
  },
};

const CHAT_STYLES = {
  chatWindowStyle: {
    width: "380px",
    height: "560px",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow:
      "0 25px 50px -12px rgba(7, 29, 4, 0.28), 0 0 0 1px rgba(53, 142, 26, 0.14)",
  },
  chatWindowContainerStyle: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    background: "#ffffff",
  },
  chatContentContainerStyle: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px",
    background: "linear-gradient(180deg, #f4f9f1 0%, #ffffff 35%)",
  },
  botBubbleContainerStyle: {
    maxWidth: "80%",
    marginBottom: "8px",
  },
  botBubbleStyle: {
    background: "linear-gradient(135deg, #f4f9f1, #e5f3df)",
    color: "#1d241b",
    borderRadius: "20px 20px 20px 6px",
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: "1.5",
    border: "1px solid rgba(53, 142, 26, 0.14)",
    boxShadow: "0 1px 3px rgba(23, 61, 13, 0.05)",
  },
  userBubbleContainerStyle: {
    maxWidth: "80%",
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "8px",
  },
  userBubbleStyle: {
    background: "linear-gradient(135deg, #43aa1b, #358e1a)",
    color: "#ffffff",
    borderRadius: "20px 20px 6px 20px",
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: "1.5",
    boxShadow: "0 1px 3px rgba(23, 61, 13, 0.12)",
  },
  sendButtonContainerStyle: {
    background: "#ffffff",
    borderTop: "1px solid #e5f3df",
  },
  inputContainerStyle: {
    background: "#ffffff",
    borderTop: "1px solid #e5f3df",
    padding: "12px 16px",
  },
  textAreaStyle: {
    width: "100%",
    border: "1px solid #cce9c3",
    borderRadius: "16px",
    padding: "10px 14px",
    fontSize: "14px",
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
    resize: "none" as const,
    outline: "none",
    transition: "border-color 0.15s ease",
  },
  textAreaFocusStyle: {
    borderColor: "#358e1a",
    boxShadow: "0 0 0 3px rgba(53, 142, 26, 0.12)",
  },
  optionStyle: {
    background: "#ffffff",
    color: "#2a7015",
    border: "1.5px solid #358e1a",
    borderRadius: "999px",
    padding: "9px 20px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
  },
  optionHoverStyle: {
    background: "linear-gradient(135deg, #43aa1b, #358e1a)",
    color: "#ffffff",
  },
};

export function DmcGuidedChat({ market }: { market: Market }) {
  const flow = useMemo(() => buildFlow(market), [market]);

  return (
    <>
      <ChatBot
        id="dmc-guided-chat"
        flow={flow}
        settings={CHAT_SETTINGS}
        styles={CHAT_STYLES}
      />

      <style jsx global>{`
        /* ── Reposition the library's own chat button to bottom-left ── */
        .rcb-toggle-button {
          left: 24px !important;
          right: auto !important;
          bottom: 24px !important;
          box-shadow:
            0 8px 24px rgba(53, 142, 26, 0.38),
            0 0 0 1px rgba(53, 142, 26, 0.2) !important;
        }

        /* Move the "Need help?" tooltip to sit beside the left bubble */
        .rcb-chat-tooltip {
          left: 96px !important;
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
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
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
