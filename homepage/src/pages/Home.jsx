import Footer from "../components/Footer";
import Headers from "../components/headers/Headers";
import Contactsection from "../components/sections/Contactsection";
import Faqsection from "../components/sections/Faqsection";
import FeaturesSection from "../components/sections/FeaturesSection";
import FeaturesTemplages from "../components/sections/FeaturesTemplages";
import Herosection from "../components/sections/Herosection";
import Pricingsection from "../components/sections/Pricingsection";
export default function Home() {
  return (
    <>
      <Headers />
      <Herosection />
      <FeaturesSection />
      <FeaturesTemplages />
      <Pricingsection />
      <Faqsection />
      <Contactsection />
      <Footer />
    </>
  );
}
