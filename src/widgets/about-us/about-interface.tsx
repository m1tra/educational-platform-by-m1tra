
import { AboutUsPreview } from "./_ui/about-preview"
import { AboutUsDivider } from "./_ui/about-divider"
import { AboutUsFeatures } from "./_ui/about-features"
import { AboutUsAi } from "./_ui/about-ai-features"
import { AboutUsAdmin } from "./_ui/about-admin"
import { AboutUsCTA } from "./_ui/about-cta"
import { AboutUsFooter } from "./_ui/about-footer"
import { AboutUsHeader } from "./_ui/about-header"

export function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Asymmetrical design */}
        <AboutUsHeader/>

      {/* Hero Section - Asymmetrical grid layout */}
        <AboutUsPreview/>

      {/* Divider with counter */}
        <AboutUsDivider/>
      {/* Features - Asymmetrical layout */}
        <AboutUsFeatures/>

      {/* AI Section - Asymmetrical design */}
        <AboutUsAi/>

      {/* Admin Panel - Unique layout */}   
        <AboutUsAdmin/>

      {/* CTA - Minimalist design */}
        <AboutUsCTA/>

      {/* Footer - Minimalist */}
        <AboutUsFooter/>
    </div>
  )
}
