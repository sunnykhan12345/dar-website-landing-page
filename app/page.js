import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import BrandNeeds from '@/components/sections/brand-needs';
import Steps from '@/components/sections/steps';
import SellOnline from '@/components/sections/sell-online';
import FastTeams from '@/components/sections/fast-teams';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <BrandNeeds />

      <SellOnline />
      <FastTeams />
      <Steps />
      <Testimonials />
      <Footer />
    </main>
  );
}
