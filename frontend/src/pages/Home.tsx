import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import ResearchAreas from "@/components/home/ResearchAreas";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import InnovationScene from "@/components/home/InnovationScene";
import ServicesStrip from "@/components/home/ServicesStrip";
import StatsBand from "@/components/home/StatsBand";
import CompaniesSection from "@/components/home/CompaniesSection";
import InsightsSection from "@/components/home/InsightsSection";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import PublicationsSection from "@/components/home/PublicationsSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import NewsSection from "@/components/home/NewsSection";
import HighlightBanner from "@/components/home/HighlightBanner";
import Marquee from "@/components/ui/Marquee";
import { usePageMeta } from "@/hooks/usePageMeta";

const marqueeItems = [
  "Chemistry & Materials",
  "Biomedical & Life Sciences",
  "Environmental & Energy",
  "Engineering & Technology",
  "Physics, Maths & Data",
  "Agricultural & Food Sciences",
  "Management & Business",
  "Social Sciences & Humanities",
  "Law, IP & Entrepreneurship",
];

export default function Home() {
  usePageMeta("NM Research | Research. Intelligence. Innovation.");
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} duration={42} />
      <section className="section-bg-1"><Introduction /></section>
      <section className="section-bg-2"><ResearchAreas /></section>
      <section className="section-bg-3"><FeaturedResearch /></section>
      <section className="section-bg-0"><ProcessTimeline /></section>
      <section className="section-bg-1"><InnovationScene /></section>
      <section className="section-bg-2"><ServicesStrip /></section>
      <section className="section-bg-3"><StatsBand /></section>
      <section className="section-bg-0"><CompaniesSection /></section>
      <section className="section-bg-1"><InsightsSection /></section>
      <section className="section-bg-2"><AboutSection /></section>
      <section className="section-bg-3"><CTASection /></section>
      <section className="section-bg-0"><PublicationsSection /></section>
      <section className="section-bg-1"><LeadershipSection /></section>
      <section className="section-bg-2"><NewsSection /></section>
      <section className="section-bg-3"><HighlightBanner /></section>
    </>
  );
}