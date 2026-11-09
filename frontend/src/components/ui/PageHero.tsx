import {
  Children,
  Fragment,
  Suspense,
  isValidElement,
  lazy,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SceneShell from "@/components/3d/SceneShell";
import type { LabDiagramVariant } from "@/components/3d/LabDiagram";

const LabDiagram = lazy(() => import("@/components/3d/LabDiagram"));

const maskStyle: React.CSSProperties = {
  display: "block",
  overflow: "hidden",
  paddingBlock: "0.08em",
};

const lineStyle: React.CSSProperties = {
  display: "inline-block",
};

function toLines(title: ReactNode): ReactNode[] {
  if (title == null || title === false) return [];
  if (Array.isArray(title)) return title;
  if (isValidElement(title) && title.type === Fragment) {
    return Children.toArray(title.props.children).filter((c) => {
      if (typeof c === "string" && c.trim() === "") return false;
      return c != null;
    });
  }
  if (typeof title === "string") return title.split("\n");
  return [title];
}

export default function PageHero({
  label,
  title,
  subtitle,
  crumb,
  diagram,
}: {
  label: string;
  title: ReactNode;
  subtitle?: string;
  crumb?: string;
  diagram?: LabDiagramVariant;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-ph-line]",
        { yPercent: 112 },
        { yPercent: 0, duration: 1.1, stagger: 0.1 }
      ).fromTo(
        "[data-ph-fade]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
        "-=0.7"
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        padding: "clamp(8rem, 16vh, 11rem) 0 clamp(3rem, 6vh, 5rem)",
        overflow: "hidden",
        borderBottom: "1px solid var(--hairline)",
      }}
      aria-label={`${label} — ${crumb ?? "NM Research"}`}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 60% at 78% 10%, rgba(126,47,58,0.09), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {diagram && (
        <SceneShell
          className="scene-stage page-hero-lab"
          intensity={0.58}
          desktopOnly
          style={{
            top: "6%",
            right: "-3%",
            width: "min(44vw, 600px)",
            height: "82%",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 22%, black 52%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 22%, black 52%)",
          }}
        >
          <Suspense fallback={null}>
            <LabDiagram variant={diagram} />
          </Suspense>
        </SceneShell>
      )}

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Link
          to="/"
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
            padding: "0.55rem 1rem 0.55rem 0",
            marginBottom: 40,
          }}
          data-ph-fade
        >
          <span style={{ color: "var(--accent)", fontSize: 24 }}>←</span>
          <span style={{ textTransform: "uppercase" }}>
            {crumb ?? "NM Research"}
          </span>
        </Link>

        <div className="mono eyebrow" style={{ marginBottom: 24 }} data-ph-fade>
          {label}
        </div>

        <h1 className="display-xl" style={{ maxWidth: 1000 }}>
          {toLines(title).map((line, i) => (
            <span key={i} style={maskStyle}>
              <span data-ph-line style={lineStyle}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {subtitle && (
          <div
            data-ph-fade
            style={{
              marginTop: 32,
              maxWidth: 560,
              color: "var(--text-secondary)",
              fontSize: "1.02rem",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .page-hero-lab { display: none !important; }
        }
      `}</style>
    </section>
  );
}