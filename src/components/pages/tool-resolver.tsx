import type { ReactNode } from "react";

import { CRSCalculator } from "@/components/calculators/CRSCalculator";
import { CLBCalculator } from "@/components/calculators/CLBCalculator";
import { FSW67Calculator } from "@/components/calculators/FSW67Calculator";
import { AustraliaPointsCalculator } from "@/components/calculators/AustraliaPointsCalculator";
import { AustraliaFeeEstimator } from "@/components/calculators/AustraliaFeeEstimator";
import { AustraliaProcessingTimes } from "@/components/calculators/AustraliaProcessingTimes";
import { AustraliaOccupationChecker } from "@/components/calculators/AustraliaOccupationChecker";
import { PnpMatcher } from "@/components/calculators/PnpMatcher";
import { RcipEligibilityTool } from "@/components/calculators/RcipEligibilityTool";
import { EligibilityChecker } from "@/components/calculators/EligibilityChecker";
import { PNP_PROVINCES } from "@/features/tools/canada-pnp";
import type { Market } from "@/config/markets";

export function resolveToolComponent(component: string, market: Market): ReactNode {
  switch (component) {
    case "eligibility-checker":
      return <EligibilityChecker market={market} />;
    case "crs":
      return <CRSCalculator />;
    case "clb":
      return <CLBCalculator />;
    case "fsw67":
      return <FSW67Calculator />;
    case "australia-points":
      return <AustraliaPointsCalculator />;
    case "australia-fees":
      return <AustraliaFeeEstimator />;
    case "australia-processing":
      return <AustraliaProcessingTimes />;
    case "australia-occupations":
      return <AustraliaOccupationChecker />;
    case "rcip":
      return <RcipEligibilityTool />;
    default: {
      const pnp = component.startsWith("pnp:") ? component.slice(4) : null;
      const province = pnp ? PNP_PROVINCES.find((p) => p.slug === pnp) : null;
      if (province) return <PnpMatcher province={province} />;
      return null;
    }
  }
}
