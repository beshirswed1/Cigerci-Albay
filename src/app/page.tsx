import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import AboutSection from "@/components/landing/AboutSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import ContactSection from "@/components/landing/ContactSection";
import PaymentCarousel from "@/components/landing/PaymentCarousel";
import MapSection from "@/components/landing/MapSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        {/* <AboutSection /> */}
        <ReviewsSection />
        <ContactSection />
        <PaymentCarousel />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
