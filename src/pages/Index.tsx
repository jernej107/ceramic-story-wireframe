import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCeramics from "@/components/FeaturedCeramics";
import JournalSection from "@/components/JournalSection";
import AboutSection from "@/components/AboutSection";
import SecondChanceCeramics from "@/components/SecondChanceCeramics";
import ContactForm from "@/components/ContactForm";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCeramics />
        <JournalSection />
        <AboutSection />
        <SecondChanceCeramics />
        <ContactForm />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Index;
