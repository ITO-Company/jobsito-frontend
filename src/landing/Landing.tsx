import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/AboutSection";
import { PricingSection } from "./components/PricingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
