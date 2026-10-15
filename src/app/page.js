import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";
import AcademicPrograms from "./components/AcademicPrograms";
import PhotoGallery from "./components/PhotoGallery";
import FAQSection from "./components/FaqSection";
import Marquee from "./components/Marquee";
import PrincipalMessage from "./components/PrincipalMessage";
import Testimonials from "./components/Testimonials";
import TeachersPanel from "./components/TeacherPanel";
import SuccessStories from "./components/SuccessStories";
import HeroCarousel from "./components/HeroCarousel";
import SpecialEvent from "./components/SpecialEvent";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Marquee></Marquee>
      {/* <SpecialEvent></SpecialEvent> */}
      <Banner></Banner>
      <PrincipalMessage></PrincipalMessage>
      <TeachersPanel></TeachersPanel>
      <SuccessStories></SuccessStories>
      {/* <HeroCarousel></HeroCarousel> */}
      <WhyChooseUs></WhyChooseUs>
      <AcademicPrograms></AcademicPrograms>
      <PhotoGallery></PhotoGallery>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
      {/* <ContactSection></ContactSection> */}
    </div>
  );
}
