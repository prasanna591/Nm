import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  careerOpportunities,
  collaborationTracks,
  coreValues,
  internshipOpportunities,
} from "@/data/group";
import { site } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Careers() {
  usePageMeta(
    "Careers & Internships | NM Research",
    "Careers and internships at the NM Group of Industries and Research Foundation — research, technology, business development, drone technology and healthcare tracks.",
  );

  const tracks = [
    {
      label: "Career opportunities",
      caption: "Full-time & specialist roles",
      items: careerOpportunities,
    },
    {
      label: "Internship opportunities",
      caption: "Supervised, project-based learning",
      items: internshipOpportunities,
    },
  ];

  return (
    <>
      <PageHero
        label="Careers & internships"
        crumb="NM Research"
        title={
          <>
            BUILD THE NEXT{" "}
            <span style={{ color: "var(--accent)" }}>FRONTIER WITH US</span>
          </>
        }
        subtitle="We welcome applications from qualified and motivated candidates interested in research, technology, business development and innovation."
        diagram="centrifuge"
      />

      <section className="section-bg-0" style={{ paddingBlock: "5rem 4rem" }}>
        <div className="container">
          <SectionHeading
            index="01"
            label="Open tracks"
            title={
              <>
                RESEARCH, TECHNOLOGY{" "}
                <span style={{ color: "var(--accent)" }}>&amp; BEYOND</span>
              </>
            }
            subtitle="Opportunities span the full life of an idea — from scientific discovery and engineering to commercialisation and leadership."
          />

          <div
            className="careers-grid"
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            {tracks.map((track, t) => (
              <Reveal key={track.label} delay={t * 0.08}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    padding: "1.9rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="mono eyebrow" style={{ marginBottom: 8 }}>
                    {track.caption}
                  </div>
                  <h3 className="display-md" style={{ fontSize: "1.5rem" }}>
                    {track.label}
                  </h3>

                  <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 0 }}>
                    {track.items.map((item, i) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 14,
                          padding: "0.95rem 0",
                          borderTop: "1px solid var(--hairline)",
                        }}
                      >
                        <span
                          className="mono"
                          style={{ fontSize: 10.5, color: "var(--accent)", minWidth: 22 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: "0.96rem", color: "var(--text-secondary)" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: 30,
                border: "1px solid var(--accent-line)",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(160deg, rgba(126,47,58,0.09), var(--surface) 60%)",
                padding: "1.5rem 1.7rem",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                Before you apply
              </div>
              <p style={{ fontSize: "0.94rem", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 780 }}>
                Internship duration, eligibility, location, selection process and
                remuneration (where applicable) are specified in individual
                opportunity announcements. Send your CV and a short statement of
                interest to{" "}
                <a href={`mailto:${site.contact.emails[0]}`} style={{ color: "var(--accent-bright)" }}>
                  {site.contact.emails[0]}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-bg-1" style={{ paddingBlock: "4rem 5rem", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <SectionHeading
            index="02"
            label="Life at NM"
            title={
              <>
                WHAT WE LOOK FOR{" "}
                <span style={{ color: "var(--accent)" }}>IN EVERY HIRE</span>
              </>
            }
            subtitle="The same principles that guide our research guide our teams."
          />

          <div
            className="careers-values"
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    padding: "1.7rem 1.4rem",
                  }}
                >
                  <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md" style={{ marginTop: 12, fontSize: "1.2rem" }}>
                    {v.title}
                  </h3>
                  <p style={{ marginTop: 8, fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-3" style={{ paddingBlock: "5rem 4rem", borderTop: "1px solid var(--hairline)" }}>
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
            subtitle="Join research collaborations across universities, institutions, industries and international networks."
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

      <section className="section-bg-2" style={{ paddingBlock: "5rem 6rem", borderTop: "1px solid var(--hairline)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="mono eyebrow" style={{ justifyContent: "center", display: "flex", marginBottom: 24 }}>
              APPLY / ENQUIRE
            </div>
          </Reveal>
          <SectionHeading
            center
            label="Take the next step"
            title={
              <>
                HAVE SOMETHING{" "}
                <span style={{ color: "var(--accent)" }}>TO CONTRIBUTE?</span>
              </>
            }
            subtitle="Tell us about your background, the track that fits and the problems you want to work on. We review every application."
          />
          <Reveal delay={0.1}>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: 11.5 }}>
                Apply via contact form <span className="btn-arrow">→</span>
              </Link>
              <a
                href={`mailto:${site.contact.emails[0]}?subject=Career%20or%20Internship%20Enquiry`}
                className="btn btn-ghost"
                style={{ fontSize: 11.5 }}
              >
                Email the team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .careers-grid { grid-template-columns: 1fr !important; }
          .careers-values { grid-template-columns: 1fr 1fr !important; }
          .collab-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .careers-values { grid-template-columns: 1fr !important; }
          .collab-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
