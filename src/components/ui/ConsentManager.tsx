"use client";

import { useEffect, useRef } from "react";

interface ConsentManagerProps {
  enabled: boolean;
  cookieName: string;
  policyRevision: number;
}

export function ConsentManager({ enabled, cookieName, policyRevision }: ConsentManagerProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled || initialized.current) return;
    initialized.current = true;

    import("vanilla-cookieconsent").then((mod) => {
      const cc = mod.default;

      cc.run({
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: { enabled: false },
          marketing: { enabled: false },
        },
        language: {
          default: "en",
          translations: {
            en: {
              consentModal: {
                title: "We value your privacy",
                description:
                  "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
                acceptAllBtn: "Accept All",
                showPreferencesBtn: "Manage Preferences",
              },
              preferencesModal: {
                title: "Cookie Preferences",
                acceptAllBtn: "Accept All",
                savePreferencesBtn: "Save Preferences",
                closeIconLabel: "Close preferences",
                sections: [
                  {
                    title: "Strictly Necessary",
                    description:
                      "These cookies are essential for the website to function. They enable core features like market selection and consent preferences.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Analytics",
                    description:
                      "These cookies help us understand how visitors interact with our website, enabling us to improve the user experience.",
                    linkedCategory: "analytics",
                  },
                  {
                    title: "Marketing",
                    description:
                      "These cookies are used to track visitors across websites for marketing purposes.",
                    linkedCategory: "marketing",
                  },
                ],
              },
            },
          },
        },
        cookie: {
          name: cookieName,
          expiresAfterDays: 365,
        },
        onConsent: () => {
          window.dispatchEvent(new CustomEvent("dmc-consent-change"));
        },
        onChange: () => {
          window.dispatchEvent(new CustomEvent("dmc-consent-change"));
        },
      });
    });
  }, [enabled, cookieName, policyRevision]);

  return null;
}
