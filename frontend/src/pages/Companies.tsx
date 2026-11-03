import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import SceneShell from "@/components/3d/SceneShell";
import { associatedCompanies } from "@/data/group";
import { domains, totalSubjects } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const HexagonalObject = lazy(() => import("@/components/3d/HexagonalObject"));

const groupMetrics = [
  { value: String(associatedCompanies.length), label: "Associated companies" },
  { value: `${domains.length}`, label: "Research domains" },
  { value: `${totalSubjects}+`, label: "Supported subjects" },
  { value: "8", label: "Countries of operation" },
];

export default function Companies() {
  usePageMeta(
    "Companies | NM Research",
    "The five associated companies of the NM Group of Industries and Research Foundation — spanning business development, publishing, technology, drones and healthcare innovation.",
  );

  return (
    <>
      <PageHero
        label="Our group"
        crumb="NM Research"
        title={
          <>
            FIVE COMPANIES,{" "}
            <span style={{ color: "var(--accent)" }}>ONE RESEARCH ECOSYSTEM</span>
          </>
        }
        subtitle="Our group brings together specialised initiatives across business development, publications, technology, agriculture and healthcare — connected by a shared commitment to research and innovation."
      />

      <section style={{ position: "relative", paddingBlock: "5rem 4rem", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            index="01"
            label="Associated companies"
            title={
              <>
                SPECIALISED VENTURES,{" "}
                <span style={{ color: "var(--accent)" }}>SHARED PURPOSE</span>
              </>
            }
            subtitle="Each company operates with a distinct focus while drawing on the group's research network, academic partnerships and shared infrastructure."
          />

          <div
            className="company-grid"
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {associatedCompanies.map((company, i) => (
              <Reveal key={company.slug} delay={(i % 2) * 0.06}>
                <Link
                  to={`/companies/${company.slug}`}
                  className="card company-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1.9rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 16,
                    }}
                  >
                    <span
                      className="mono"
                      style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)" }}
                    >
                      {company.index}
                    </span>
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: "var(--text-faint)", textAlign: "right" }}>
                      NM GROUP
                    </span>
                  </div>

                  <h3
                    className="display-md"
                    style={{ marginTop: 18, fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)" }}
                  >
                    {company.name}
                  </h3>
                  <div
                    className="mono"
                    style={{
                      marginTop: 8,
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      color: "var(--accent-bright)",
                      textTransform: "uppercase",
                    }}
                  >
                    {company.tagline}
                  </div>

                  <p
                    style={{
                      marginTop: 16,
                      fontSize: "0.94rem",
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {company.description}
                  </p>

                  <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {company.focus.map((f) => (
                      <span key={f} className="tag">
                        {f}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <SceneShell
          style={{
            width: "38vw",
            maxWidth: 520,
            height: 480,
            top: "8vw",
            right: "-8vw",
          }}
        >
          <Suspense fallback={null}>
            <HexagonalObject />
          </Suspense>
        </SceneShell>
      </section>

      <section style={{ paddingBlock: "3rem 5rem", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <Reveal>
            <div
              className="company-metrics"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
              }}
            >
              {groupMetrics.map((m, i) => (
                <div
                  key={m.label}
                  style={{
                    padding: "1.7rem 1.4rem",
                    textAlign: "center",
                    background: i === 0 ? "rgba(133,21,9,0.07)" : "var(--surface)",
                    borderRight: i < groupMetrics.length - 1 ? "1px solid var(--hairline)" : "none",
                  }}
                >
                  <div className="display-md" style={{ fontSize: "1.7rem", color: "var(--accent-bright)" }}>
                    {m.value}
                  </div>
                  <div className="mono" style={{ marginTop: 6, fontSize: 9.5, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBlock: "4rem 6rem", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <SectionHeading
            index="02"
            label="Work with the group"
            title={
              <>
                ONE NETWORK,{" "}
                <span style={{ color: "var(--accent)" }}>MANY ENTRY POINTS</span>
              </>
            }
            subtitle="Whether you are a researcher, student, institution or industry partner, there is a route into the NM ecosystem."
          />

          <div
            className="group-links"
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {[
              {
                title: "Explore research",
                desc: "Search 250+ subjects across 11 domains and find the support your work needs.",
                to: "/research",
                cta: "Open the research index",
              },
              {
                title: "Work with our services",
                desc: "From topic framing to publication — six services delivered through one documented workflow.",
                to: "/services",
                cta: "View the service catalogue",
              },
              {
                title: "Join the team",
                desc: "Research, technology, business and internship tracks across the group.",
                to: "/careers",
                cta: "See careers & internships",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <Link
                  to={item.to}
                  className="card group-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1.8rem",
                    color: "inherit",
                  }}
                >
                  <h3 className="display-md" style={{ fontSize: "1.35rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ marginTop: 12, fontSize: "0.92rem", lineHeight: 1.7, color: "var(--text-secondary)", flex: 1 }}>
                    {item.desc}
                  </p>
                  <span className="btn btn-line" style={{ marginTop: 20, fontSize: 11, paddingInline: 0, display: "inline-flex" }}>
                    {item.cta} <span className="btn-arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: 11.5 }}>
              Discuss a partnership <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .company-card:hover { border-color: var(--accent-line); }
        .group-link:hover h3 { color: var(--accent-bright); }
        .group-link h3 { transition: color .3s var(--ease-out); }
        @media (max-width: 900px) {
          .company-grid { grid-template-columns: 1fr !important; }
          .group-links { grid-template-columns: 1fr !important; }
          .company-metrics { grid-template-columns: 1fr 1fr !important; }
          .company-metrics > div:nth-child(2) { border-right: none !important; }
          .company-metrics > div:nth-child(1),
          .company-metrics > div:nth-child(2) { border-bottom: 1px solid var(--hairline); }
        }
      `}</style>
    </>
  );
}
