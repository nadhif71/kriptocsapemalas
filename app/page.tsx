import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import XORExplanation from "./components/XORExplanation";
import XorDemo from "./components/XorDemo"; 
import Footer from "./components/Footer";


export default function Home() {
  return (
     <div className="flex min-h-screen flex-col items-center justify-between"> 
      <Header />
      <Hero />
      <XORExplanation />
      <section className="w-full max-w-5xl px-6 py-16">
        <XorDemo />
      </section>
      <Footer />

     </div>
  );
}
