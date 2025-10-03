import HeroSection from "@/components/HeroSection";
import FeaturedCeramics from "@/components/FeaturedCeramics";
import JournalSection from "@/components/JournalSection";
import AboutSection from "@/components/AboutSection";
import SecondChanceCeramics from "@/components/SecondChanceCeramics";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <main>
        <FeaturedCeramics />
        <JournalSection />
        <AboutSection />
        <SecondChanceCeramics />
      </main>
      <Footer />
    </>
  );
};

export default Index;
