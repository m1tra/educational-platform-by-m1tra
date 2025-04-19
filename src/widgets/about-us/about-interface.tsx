
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

        <AboutUsHeader/>

        <AboutUsPreview/>

        <AboutUsDivider/>

        <AboutUsFeatures/>

        <AboutUsAi/>

        <AboutUsAdmin/>

        <AboutUsCTA/>

        <AboutUsFooter/>
    </div>
  )
}
