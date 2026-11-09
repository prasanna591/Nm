import { lazy, Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import SceneShell from "@/components/3d/SceneShell";
import FounderSection from "@/components/founder/FounderSection";
import { site, stats } from "@/data/site";
import { collaborationTracks, coreValues, newsUpdate } from "@/data/group";
import { usePageMeta } from "@/hooks/usePageMeta";

const LatticeGlobe = lazy(() => import("@/components/3d/LatticeGlobe"));

const foundingStats = [
  { target: 150, suffix: "+", label: "Academic & industry partners" },
  { target: 15, suffix: "+", label: "Years of research excellence" },
  { target: 500, suffix: "+", label: "SCI / Scopus publications" },
  { target: 8, suffix: "", label: "Countries of operation" },
];

export default function About() {
  const location = useLocation();
  usePageMeta(
    "About | NM Research",
    "The NM Group of Industries and Research Foundation — a globally recognised research ecosystem across 8 countries, 150+ partners, and 15+ years of research excellence.",
  );

  // Deep-link: arriving with state.scrollTo === "founder" scrolls to the
  // founder section (used by the R&D / 001 annotation elsewhere on the site).
  useEffect(() => {
    const state = (location.state ?? {}) as { scrollTo?: string };
    if (state.scrollTo !== "founder") return;
    const t = window.setTimeout(() => {
      const target = document.getElementById("founder");
      const lenis = (window as unknown as {
        __lenis?: { scrollTo: (y: number, o?: { immediate?: boolean }) => void };
      }).__lenis;
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(y, { immediate: false });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, 350);
    return () => window.clearTimeout(t);
  }, [location.state]);

  return (
    <>
      <PageHero
        label="About the foundation"
        crumb="NM Research"
        title={
          <>
            A VISION FOR{" "}
            <span style={{ color: "var(--accent)" }}>GLOBAL RESEARCH EXCELLENCE</span>
          </>
        }
        subtitle="Become a globally recognised research and innovation foundation conducting high-impact research while empowering the next generation of researchers, scientists and innovators."
        diagram="microscope"
      />

      <section style={{ position: "relative", paddingBlock: "6rem 5rem", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="about-page-grid"
            style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "clamp(2rem, 5vw, 5rem)" }}
          >
            {/* Founder + presence */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Reveal>
                <div
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface)",
                    padding: "1.8rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <img
                      src={`${import.meta.env.BASE_URL}images/nm.png`}
                      alt="NM Research mark"
                      width={90}
                      height={60}
                      style={{ borderRadius: 10, objectFit: "contain", border: "1px solid var(--border-subtle)" }}
                    />
                    <div>
                      <div className="display-md" style={{ fontSize: "1.15rem" }}>
                        {site.founder.name}
                      </div>
                      <div
                        className="mono"
                        style={{ marginTop: 3, fontSize: 10, letterSpacing: "0.14em", color: "var(--accent-bright)" }}
                      >
                        {site.founder.role.toUpperCase()}
                      </div>
                      <div className="mono" style={{ marginTop: 2, fontSize: 10, color: "var(--text-muted)" }}>
                        {site.founder.credentials}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--hairline)" }}>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>Contact the founder</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <a
                        href={`tel:${site.contact.phones[0].replace(/[^+\d]/g, "")}`}
                        className="mono"
                        style={{ fontSize: 12, color: "var(--text-secondary)" }}
                      >
                        {site.contact.phones[0]}
                      </a>
                      <a
                        href={`tel:${site.contact.phones[1].replace(/[^+\d]/g, "")}`}
                        className="mono"
                        style={{ fontSize: 12, color: "var(--text-secondary)" }}
                      >
                        {site.contact.phones[1]}
                      </a>
                      <a
                        href={`mailto:${site.contact.emails[0]}`}
                        className="mono"
                        style={{ fontSize: 11.5, color: "var(--text-secondary)", wordBreak: "break-all" }}
                      >
                        {site.contact.emails[0]}
                      </a>
                      <a
                        href={`mailto:${site.contact.emails[1]}`}
                        className="mono"
                        style={{ fontSize: 11.5, color: "var(--text-secondary)", wordBreak: "break-all" }}
                      >
                        {site.contact.emails[1]}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface)",
                    padding: "1.8rem",
                  }}
                >
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Global presence</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {site.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div style={{ margin: "1.4rem 0", height: 1, background: "var(--hairline)" }} />
                  <div className="eyebrow" style={{ marginBottom: 16 }}>India — state presence</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {site.stateTags.map((t) => (
                      <span key={t} className="tag tag-accent">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div
                  style={{
                    border: "1px solid var(--accent-line)",
                    borderRadius: "var(--radius-md)",
                    background:
                      "linear-gradient(160deg, rgba(126,47,58,0.14), var(--surface) 55%)",
                    padding: "1.8rem",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      color: "var(--accent-bright)",
                      textTransform: "uppercase",
                    }}
                  >
                    <span className="status-dot" aria-hidden="true" /> Global impact
                  </div>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: "0.98rem",
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                      maxWidth: 640,
                    }}
                  >
                    The foundation has established collaborative relationships
                    with more than {stats[1].value}+ academic institutions,
                    universities, research organisations and industry partners
                    across the world — connecting emerging scientists with
                    training, mentorship and publication pathways.
                  </p>
                  <Link
                    to="/research"
                    className="btn btn-line"
                    style={{ marginTop: 22, fontSize: 11.5, paddingInline: 0 }}
                  >
                    Enter the research index <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Vision */}
            <div>
              <SectionHeading
                index="01"
                label="About the foundation"
                title={
                  <>
                    RESEARCH <span style={{ color: "var(--accent)" }}>MEASURED.</span>{" "}
                    NOT MERELY CLAIMED.
                  </>
                }
                subtitle={`${site.fullName} is an institute where research is measured, verified, quantified and peer-reviewed — an ecosystem empowering the next generation of scientists through research services, publication support, PhD assistance and global conferences.`}
              />

              <Reveal delay={0.12}>
                <div style={{ marginTop: 36 }}>
                  <div className="eyebrow" style={{ marginBottom: 14 }}>
                    Core values
                  </div>
                  <div
                    className="values-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {coreValues.map((v) => (
                      <div
                        key={v.title}
                        className="card"
                        style={{
                          padding: "1.1rem 1.2rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="status-dot" aria-hidden="true" />
                          <span className="display-md" style={{ fontSize: "1.05rem" }}>
                            {v.title}
                          </span>
                        </div>
                        <p
                          style={{
                            marginTop: 8,
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {v.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div
                  className="about-stats"
                  style={{
                    marginTop: 36,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  {foundingStats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "1.5rem 1rem",
                        textAlign: "center",
                        borderRight: "1px solid var(--hairline)",
                        background: "var(--surface)",
                      }}
                    >
                      <div className="display-md" style={{ fontSize: "1.8rem", color: "var(--accent-bright)" }}>
                        <Counter target={s.target} suffix={s.suffix} />
                      </div>
                      <div
                        className="mono"
                        style={{ marginTop: 6, fontSize: 9.5, letterSpacing: "0.1em", color: "var(--text-muted)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <SceneShell
          style={{
            width: "54vw",
            maxWidth: 720,
            height: 560,
            top: 0,
            right: "-8vw",
          }}
        >
          <Suspense fallback={null}>
            <LatticeGlobe />
          </Suspense>
        </SceneShell>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision-mission"
        style={{
          paddingBlock: "5rem 4rem",
          borderTop: "1px solid var(--hairline)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="container">
          <SectionHeading
            index="02"
            label="Direction"
            title={
              <>
                VISION &amp;{" "}
                <span style={{ color: "var(--accent)" }}>MISSION</span>
              </>
            }
          />
          <div
            className="vm-grid"
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            <Reveal>
              <div className="card" style={{ height: "100%", padding: "1.9rem" }}>
                <div className="mono eyebrow" style={{ marginBottom: 14 }}>
                  Our vision
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                  }}
                >
                  {site.vision}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card" style={{ height: "100%", padding: "1.9rem" }}>
                <div className="mono eyebrow" style={{ marginBottom: 14 }}>
                  Our mission
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                  }}
                >
                  {site.mission}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Global collaborations */}
      <section
        id="collaborations"
        style={{ paddingBlock: "5rem 4rem", borderTop: "1px solid var(--hairline)" }}
      >
        <div className="container">
          <SectionHeading
            index="03"
            label="Global collaborations"
            title={
              <>
                WE BUILD WITH{" "}
                <span style={{ color: "var(--accent)" }}>PARTNERS</span>
              </>
            }
            subtitle="We welcome meaningful collaborations with universities, colleges, research institutions, industries, startups and independent researchers."
          />
          <div
            className="collab-grid"
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {collaborationTracks.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="card" style={{ height: "100%", padding: "1.6rem" }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md" style={{ marginTop: 12, fontSize: "1.15rem" }}>
                    {t.title}
                  </h3>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: 11.5 }}>
              Submit collaboration enquiry <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* News & updates */}
      <section
        id="news"
        style={{
          paddingBlock: "5rem 6rem",
          borderTop: "1px solid var(--hairline)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="container">
          <SectionHeading
            index="04"
            label="News & updates"
            title={
              <>
                WHAT&apos;S{" "}
                <span style={{ color: "var(--accent)" }}>NEXT</span>
              </>
            }
            subtitle={newsUpdate.intro}
          />
          <div
            className="news-grid"
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {newsUpdate.channels.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="card" style={{ height: "100%", padding: "1.5rem 1.3rem" }}>
                  <span className="status-dot" aria-hidden="true" />
                  <div className="display-md" style={{ marginTop: 12, fontSize: "1rem" }}>
                    {c}
                  </div>
                  <div
                    className="mono"
                    style={{
                      marginTop: 8,
                      fontSize: 9.5,
                      letterSpacing: "0.12em",
                      color: "var(--text-faint)",
                    }}
                  >
                    FORTHCOMING
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-ghost" style={{ fontSize: 11.5 }}>
              Request updates <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .vm-grid { grid-template-columns: 1fr !important; }
          .collab-grid { grid-template-columns: 1fr 1fr !important; }
          .news-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .collab-grid { grid-template-columns: 1fr !important; }
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <FounderSection />
    </>
  );
}