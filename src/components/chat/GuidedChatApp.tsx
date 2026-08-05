"use client";

import { useEffect, useMemo } from "react";
import ChatBot, { ChatBotProvider, useMessages, usePaths, useSettings } from "react-chatbotify";
import type { Market } from "@/config/markets";
import { buildFlow, CONTACT_QUESTION_FRAGMENTS } from "@/config/guided-chat.flow";

/**
 * The only flow blocks that collect free text. Every other block uses
 * option buttons, so the manual input row must stay hidden for those.
 *
 * The gate confirms the question has actually been rendered (fragment match
 * on the delivered bot message) before showing the input row, which avoids
 * an input flash during the typing transition after the final option click.
 * Copy lives in CONTACT_QUESTION_FRAGMENTS next to the flow definition.
 */
const FREE_TEXT_BLOCKS = CONTACT_QUESTION_FRAGMENTS;

function InputRowGate() {
  const { paths } = usePaths();
  const { messages } = useMessages();
  const { settings, updateSettings } = useSettings();

  const currPath = paths.length > 0 ? paths[paths.length - 1] ?? null : null;
  const expectedFragment = currPath ? FREE_TEXT_BLOCKS[currPath] : undefined;
  const questionDelivered =
    expectedFragment !== undefined &&
    messages.some(
      (m) =>
        m.sender.toUpperCase() === "BOT" &&
        typeof m.content === "string" &&
        m.content.includes(expectedFragment),
    );
  const showInput = expectedFragment !== undefined && questionDelivered;
  const current = settings.general?.showInputRow ?? false;

  useEffect(() => {
    if (current !== showInput) {
      updateSettings({ general: { showInputRow: showInput } });
    }
  }, [current, showInput, updateSettings]);

  return null;
}

const CHAT_SETTINGS = {
  general: {
    primaryColor: "#358e1a",
    secondaryColor: "#2a7015",
    fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
    showHeader: true,
    showFooter: false,
    // Hidden by default; InputRowGate turns it on only for the contact steps.
    showInputRow: false,
  },
  tooltip: {
    // NEVER keeps the bubble label hidden by default; the CSS in
    // DmcGuidedChat reveals it only while the chat bubble is hovered.
    mode: "NEVER",
    text: "Need help? Chat with us! 💬",
  },
  chatWindow: {
    showScrollbar: true,
    showTypingIndicator: true,
    autoJumpToBottom: true,
    defaultOpen: false,
  },
  chatButton: {
    // Client-approved bubble icon (transparent-background WebP).
    icon: "/media/brand/chat-bubble-icon.webp",
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

// The bubble icon carries its own green bubbles on a transparent background,
// so strip the library's default gradient and let the icon be the button.
const CHAT_BUTTON_STYLE = {
  background: "transparent",
  backgroundImage: "none",
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

export default function GuidedChatApp({ market }: { market: Market }) {
  const flow = useMemo(() => buildFlow(market), [market]);

  return (
    <ChatBotProvider>
      <InputRowGate />
      <ChatBot
        id="dmc-guided-chat"
        flow={flow}
        settings={CHAT_SETTINGS}
        styles={{
          ...CHAT_STYLES,
          chatButtonStyle: CHAT_BUTTON_STYLE,
          chatButtonHoveredStyle: CHAT_BUTTON_STYLE,
        }}
      />
    </ChatBotProvider>
  );
}
