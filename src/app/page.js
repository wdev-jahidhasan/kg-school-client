import Image from "next/image";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";
import AcademicPrograms from "./components/AcademicPrograms";
import PhotoGallery from "./components/PhotoGallery";
import FAQSection from "./components/FaqSection";
import NoticeCarousel from "./components/NoticeCaurosel";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NoticeCarousel></NoticeCarousel>
      <Banner></Banner>
      {/* <Hero></Hero> */}
      <PhotoGallery></PhotoGallery>
      <AcademicPrograms></AcademicPrograms>
      <WhyChooseUs></WhyChooseUs>
      <FAQSection></FAQSection>
    </div>
  );
}
