import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { associatedCompanies } from "@/data/group";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const company = associatedCompanies.find((c) => c.slug === slug);

  usePageMeta(
    company
      ? `${company.name} | NM Research`
      : "Company | NM Research",
    company
      ? `${company.tagline}. Part of the NM Group of Industries and Research Foundation research ecosystem.`
      : "View the group companies profile page.",
  );

  useEffect(() => {
    if (!company) navigate("/companies");
  }, [company, navigate]);

  if (!company) return null;

  return (
    <>
      <PageHero
        label="Our group"
        crumb="NM Research"
        title={
          <>
            {company.name}
            <br />
            <span style={{ color: "var(--accent)" }}>GROUP COMPANY PROFILE</span>
          </>
        }
        subtitle={`${company.tagline} — ${company.description.toLowerCase()}`}
        diagram="microplate"
      />

      <section style={{ position: "relative", paddingBlock: "5rem 4rem", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            index={company.index}
            label="Company profile"
            title={
              <>
                WHAT {company.name.toUpperCase()} DOES,{" "}
                <span style={{ color: "var(--accent)" }}>IN ONE PLACE</span>
              </>
            }
            subtitle={company.description}
          />

          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 4.5rem)",
            }}
          >
            <div>
              <div className="mono eyebrow" style={{ marginBottom: 16 }}>
                Focus areas
              </div>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  listStyle: "none",
                }}
              >
                {company.focus.map((f) => (
                  <li key={f} style={{ position: "relative", paddingLeft: 22 }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
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
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 40 }}>
                <div className="mono eyebrow" style={{ marginBottom: 16 }}>
                  Group role
                </div>
                <p
                  style={{
                    fontSize: "0.96rem",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                  }}
                >
                  {company.name} operates as an independent legal entity within the NM
                  Group of Industries and Research Foundation, drawing on the shared
                  research network, academic partnerships and group infrastructure while
                  maintaining its own specialised mandate.
                </p>
              </div>
            </div>

            <div>
              <div style={{ padding: "1.9rem", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)", background: "var(--surface)" }}>
                <div className="mono eyebrow" style={{ marginBottom: 14, letterSpacing: "0.14em", color: "var(--text-faint)", fontSize: 10 }}>
                  Company at a glance
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)" }}>
                      Index
                    </span>
                    <span className="display-md" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                      {company.index}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)" }}>
                      Tagline
                    </span>
                    <span
                      className="mono"
                      style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--accent-bright)", textTransform: "uppercase" }}
                    >
                      {company.tagline}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)" }}>
                      Focus count
                    </span>
                    <span className="display-md" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                      {company.focus.length}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Link
                  to="/companies"
                  className="btn btn-ghost"
                  style={{ fontSize: 11.5, paddingInline: 14 }}
                >
                  ← Back to group companies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .company-grid-detail { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
