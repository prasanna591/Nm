import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
import Chatbot from "./components/layout/Chatbot";
import CookieConsent from "./components/layout/CookieConsent";
import ScrollProgress from "./components/ui/ScrollProgress";
import SceneEnergy from "./components/SceneEnergy";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Research = lazy(() => import("./pages/Research"));
const ResearchDomain = lazy(() => import("./pages/ResearchDomain"));
const Membership = lazy(() => import("./pages/Membership"));
const Contact = lazy(() => import("./pages/Contact"));
const Companies = lazy(() => import("./pages/Companies"));
const CompanyDetail = lazy(() => import("./pages/CompanyDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let cancelled = false;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (y: number, o?: { immediate?: boolean }) => void };
    }).__lenis;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const scrollToTarget = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90;
          if (lenis) lenis.scrollTo(top);
          else window.scrollTo({ top, behavior: "smooth" });
        } else if (tries++ < 40) {
          window.setTimeout(scrollToTarget, 50);
        }
      };
      const timer = window.setTimeout(scrollToTarget, 60);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Pages() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:domainId" element={<ResearchDomain />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:slug" element={<CompanyDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <SceneEnergy />
      <Navbar />
      <Chatbot />
      <CookieConsent />
      <main>
        <Pages />
      </main>
      <Footer />
    </>
  );
}
