import Hero from "@/components/Hero";

import MostSearchedCars from "@/components/MostSearchedCars";
import LatestCars from "@/components/LatestCars";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F6F9]">
     
      <Hero />
      <MostSearchedCars />
      <LatestCars />
      <Footer />
    </main>
  );
}