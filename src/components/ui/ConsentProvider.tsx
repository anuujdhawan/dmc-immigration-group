"use client";

import { ConsentManager } from "./ConsentManager";

interface ConsentProviderProps {
  enabled: boolean;
  cookieName: string;
  policyRevision: number;
}

export function ConsentProvider({ enabled, cookieName, policyRevision }: ConsentProviderProps) {
  return <ConsentManager enabled={enabled} cookieName={cookieName} policyRevision={policyRevision} />;
}
