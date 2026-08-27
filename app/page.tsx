import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MostSearchedCars from "@/components/MostSearchedCars";
import LatestCars from "@/components/LatestCars";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F6F9]">
     <Navbar />
      <Hero />
      <MostSearchedCars />
      <LatestCars />
      <Footer />
    </main>
  );
}