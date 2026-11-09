import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/ui/Marquee";
import SceneShell from "@/components/3d/SceneShell";

const LabDiagram = lazy(() => import("@/components/3d/LabDiagram"));

export default function CTASection() {
  return (
    <section
      style={{
        paddingBlock: "7rem 0",
        borderTop: "1px solid var(--hairline)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(126,47,58,0.12), transparent 70%)",
        }}
      />

      <SceneShell
        className="scene-stage home-lab-stage"
        intensity={0.5}
        desktopOnly
        style={{
          top: "4%",
          right: "-2%",
          width: "min(42vw, 560px)",
          height: "78%",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 24%, black 55%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 24%, black 55%)",
        }}
      >
        <Suspense fallback={null}>
          <LabDiagram variant="molecule" />
        </Suspense>
      </SceneShell>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Reveal>
          <div className="mono eyebrow" style={{ justifyContent: "center", display: "flex", marginBottom: 32 }}>
            {site.founded} · {site.tagline}
          </div>
        </Reveal>

        <SplitReveal as="h2" className="display-xl" stagger={0.08}>
          <span style={{ maxWidth: 1000, display: "inline-block" }}>
            HAVE A QUESTION{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: "var(--weight-body)" }}>
              WORTH RESEARCHING?
            </span>
            <br />
            <span className="serif" style={{ color: "var(--accent)" }}>
              Let's explore it.
            </span>
          </span>
        </SplitReveal>

        <Reveal delay={0.12}>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Magnetic strength={0.35}>
              <Link
                to="/contact"
                data-cursor-label="START"
                className="btn btn-primary"
                style={{ padding: "1.1rem 2.2rem", fontSize: 12 }}
              >
                Start a conversation <span className="btn-arrow">→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.35}>
              <Link
                to="/membership"
                className="btn btn-ghost"
                style={{ padding: "1.1rem 2.2rem", fontSize: 12 }}
              >
                Become a member
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: "5rem", opacity: 0.9 }}>
        <Marquee items={site.stateTags} outline reverse duration={26} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .home-lab-stage { display: none !important; }
        }
      `}</style>
    </section>
  );
}