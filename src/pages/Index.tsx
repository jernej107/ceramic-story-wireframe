import HeroSection from "@/components/HeroSection";
import FeaturedCeramics from "@/components/FeaturedCeramics";
import JournalSection from "@/components/JournalSection";
import SecondChanceCeramics from "@/components/SecondChanceCeramics";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <main>
        <FeaturedCeramics />
        <SecondChanceCeramics />
        <JournalSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
