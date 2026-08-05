import { env } from "@/config/env/server";
import { MARKET_LIST, type Market } from "@/config/markets";
import { WhatsAppLauncher } from "@/components/ui/WhatsAppLauncher";

function getWhatsAppNumbers(): Record<Market, string> {
  const numbers = {} as Record<Market, string>;
  for (const market of MARKET_LIST) {
    const prefix =
      market === "abu-dhabi"
        ? "DMC_ABU_DHABI"
        : market === "dubai"
          ? "DMC_DUBAI"
          : market === "qatar"
            ? "DMC_QATAR"
            : market === "kuwait"
              ? "DMC_KUWAIT"
              : "DMC_INDIA";
    numbers[market] = env[`${prefix}_WHATSAPP_E164` as keyof typeof env] as string;
  }
  return numbers;
}

export function MarketFloatingWidgets({ market }: { market: Market }) {
  const numbers = getWhatsAppNumbers();
  const prefilledMessage = env.WHATSAPP_PREFILLED_MESSAGE;

  return <WhatsAppLauncher market={market} prefilledMessage={prefilledMessage} numbers={numbers} />;
}
