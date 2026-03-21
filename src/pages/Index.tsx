import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeSection from "@/components/landing/MarqueeSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ToolsSection from "@/components/landing/ToolsSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MarqueeSection />
      <FeaturesSection />
      <ToolsSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
