import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ServiceArea from "@/components/ServiceArea";
import Contractors from "@/components/Contractors";
import EstimateForm from "@/components/EstimateForm";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <TrustBar />
        <Services />
        <Gallery />
        <BeforeAfter />
        <Process />
        <About />
        <Testimonials />
        <ServiceArea />
        <Contractors />
        <EstimateForm />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
