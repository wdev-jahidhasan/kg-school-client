import Image from "next/image";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";
import AcademicPrograms from "./components/AcademicPrograms";
import PhotoGallery from "./components/PhotoGallery";
import FAQSection from "./components/FaqSection";
import Marquee from "./components/Marquee";
import PrincipalMessage from "./components/PrincipalMessage";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Marquee></Marquee>
      <Banner></Banner>
      {/* <Hero></Hero> */}
      <PhotoGallery></PhotoGallery>
      <AcademicPrograms></AcademicPrograms>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
      <PrincipalMessage></PrincipalMessage>
      <ContactSection></ContactSection>
    </div>
  );
}
