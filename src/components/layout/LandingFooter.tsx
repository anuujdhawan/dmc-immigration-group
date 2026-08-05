import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";

/**
 * Distraction-free footer for landing pages.
 *
 * Legal labels render as plain text (not links), matching the reference
 * campaign page: the visitor has exactly one job on this page — completing the
 * assessment form.
 */
export function LandingFooter() {
  return (
    <footer className="border-t border-brand-600/10 bg-white">
      <Container className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <BrandLogo variant="footer" className="h-10 w-auto" />
          <p className="mt-3 text-sm font-semibold text-charcoal">
            Registered immigration guidance — from eligibility to landing.
          </p>
          <p className="mt-2 max-w-xl text-xs leading-6 text-muted">
            Migration outcomes depend on individual circumstances. DMC does not
            guarantee visa approval. This page provides general information only
            and is not legal advice.
          </p>
        </div>
        <div className="space-y-3 lg:text-right">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} DMC Immigration Group. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end">
            <span className="text-xs font-semibold text-charcoal">Privacy Policy</span>
            <span className="text-xs font-semibold text-charcoal">Terms of Use</span>
            <span className="text-xs font-semibold text-charcoal">Disclaimer</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
