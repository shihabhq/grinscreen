import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { ReelShowcase } from "@/components/home/ReelShowcase";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { Stats } from "@/components/home/Stats";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ReelShowcase />
      <ClientMarquee />
      <Stats />
      <CTA />
    </>
  );
}
