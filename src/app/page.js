import Image from "next/image";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <Banner></Banner>
      {/* <Hero></Hero> */}
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
