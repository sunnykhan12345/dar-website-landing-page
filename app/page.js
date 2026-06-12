import Hero from "@/components/sections/hero";
import BrandNeeds from "@/components/sections/brand-needs";
import Steps from "@/components/sections/steps";
import SellOnline from "@/components/sections/sell-online";
import FastTeams from "@/components/sections/fast-teams";
import Testimonials from "@/components/sections/testimonials";
import AfterSwitchSection from "@/components/sections/AfterSwitchSection";
import YesSection from "@/components/sections/YesSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandNeeds />
      <SellOnline />
      <FastTeams />
      <YesSection />
      <AfterSwitchSection />
      <Steps />
      <Testimonials />
    </main>
  );
}
