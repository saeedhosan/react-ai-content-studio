import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Headers from "../components/headers/Headers";
import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";
import FaqSection from "../components/sections/FaqSection";
import FeatureSection from "../components/sections/FeatureSection";
import HeroSection from "../components/sections/HeroSection";
import PlanSection from "../components/sections/PlanSection";
import TemplateSection from "../components/sections/TemplateSection";
import useTitle from "../hooks/useTitle";

export default function Homepage(): JSX.Element {
  useTitle("Home");
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <>
      <Headers />
      <HeroSection />
      <FeatureSection />
      <TemplateSection />
      <PlanSection />
      <FaqSection />
      <ContactSection />
      <BlogSection />
      <Footer />
    </>
  );
}
