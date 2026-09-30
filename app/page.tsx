import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import XORExplanation from "./components/XORExplanation";
import Footer from "./components/Footer";


export default function Home() {
  return (
     <div className="flex min-h-screen flex-col items-center justify-between"> 
      <Header />
      <Hero />
      <XORExplanation />
      <Footer />

     </div>
  );
}
