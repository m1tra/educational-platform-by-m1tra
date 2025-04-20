
import { AboutUsPreview } from "./_ui/about-preview"
import { AboutUsDivider } from "./_ui/about-divider"
import { AboutUsFeatures } from "./_ui/about-features"
import { AboutUsAi } from "./_ui/about-ai-features"
import { AboutUsAdmin } from "./_ui/about-admin"
import { AboutUsCTA } from "./_ui/about-cta"
import { AboutUsFooter } from "./_ui/about-footer"
import { AboutUsHeader } from "./_ui/about-header"
import { useEffect, useState } from "react"
import { MainPreloader } from "@/src/shared/components/preloader"

export function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MainPreloader />;
  }
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
