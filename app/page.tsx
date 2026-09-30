import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import XORExplanation from "./components/XORExplanation";
import XorSteps from "./components/XorSteps";
import XorDemo from "./components/XorDemo";
import OneTimePad from "./components/OneTimePad";
import TestCases from "./components/TestCases";
import ScrollButton from "./components/ScrollButton";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Hero />
      <XORExplanation />
      <section id="xor-cipher" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">XOR Cipher</h2>
        <p className="mt-4 mb-10 max-w-2xl text-lg text-muted">
          Alice locks a message with a key. Bob needs the same key to read it.
        </p>
        <XorSteps />
        <div id="demo" className="scroll-mt-24">
          <XorDemo />
        </div>
        <div className="mt-8">
          <ScrollButton target="tests">See test cases ↓</ScrollButton>
        </div>
      </section>
      <OneTimePad />
      <TestCases />
      <Footer />
    </div>
  );
}