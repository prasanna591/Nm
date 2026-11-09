import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  usePageMeta(
    service ? `${service.title} | NM Research` : "Service | NM Research",
    service
      ? `${service.description} NM Research — ${service.title}.`
      : "Service not found.",
  );

  useEffect(() => {
    if (!service) navigate("/services");
  }, [service, navigate]);

  if (!service) return null;

  return (
    <>
      <PageHero
        label="Service catalogue"
        crumb="NM Research"
        title={
          <>
            {service.title}
            <br />
            <span style={{ color: "var(--accent)" }}>SERVICE DETAIL</span>
          </>
        }
        subtitle={service.description}

      />

      <section className="section-bg-0" style={{ paddingBlock: "5rem 4rem" }}>
        <div className="container">
          <SectionHeading
            index={service.index}
            label="Service overview"
            title={service.title}
            subtitle={service.description}
          />

          <div
            className="service-detail-grid"
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "clamp(2rem, 5vw, 4.5rem)",
            }}
          >
            <div>
              <div className="mono eyebrow" style={{ marginBottom: 16 }}>
                What's included
              </div>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  listStyle: "none",
                }}
              >
                {service.highlights.map((h) => (
                  <li key={h} style={{ position: "relative", paddingLeft: 24 }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.6em",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--accent)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.96rem",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                style={{
                  padding: "1.8rem",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface)",
                }}
              >
                <div
                  className="mono eyebrow"
                  style={{
                    marginBottom: 14,
                    letterSpacing: "0.14em",
                    color: "var(--text-faint)",
                    fontSize: 10,
                  }}
                >
                  Service at a glance
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        color: "var(--text-faint)",
                      }}
                    >
                      Catalogue index
                    </span>
                    <span
                      className="display-md"
                      style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}
                    >
                      {service.index}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        color: "var(--text-faint)",
                      }}
                    >
                      Tags
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 9.5,
                        letterSpacing: "0.08em",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {service.tags.slice(0, 3).join(" · ")}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 28 }}>
                <Link
                  to="/services"
                  className="btn btn-ghost"
                  style={{ fontSize: 11.5, paddingInline: 14 }}
                >
                  ← Back to service catalogue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
