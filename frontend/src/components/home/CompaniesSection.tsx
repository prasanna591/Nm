import { Link } from "react-router-dom";
import { associatedCompanies } from "@/data/group";
import { Reveal, SectionLabel } from "@/components/ui/Reveal";

export default function CompaniesSection() {
  return (
    <section
      id="home-companies"
      style={{ paddingBlock: "6rem 5rem", borderTop: "1px solid var(--hairline)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <SectionLabel>Our group</SectionLabel>
            <h2 className="display-lg">
              FIVE COMPANIES,{" "}
              <span style={{ color: "var(--accent)" }}>ONE MISSION</span>
            </h2>
          </div>
          <Link
            to="/companies"
            className="btn btn-line"
            style={{ fontSize: 12, letterSpacing: "0.14em" }}
          >
            Explore the group →
          </Link>
        </div>

        <div style={{ marginTop: 44 }}>
          {associatedCompanies.map((company, i) => (
            <Reveal key={company.slug} delay={i * 0.04}>
              <Link
                to="/companies"
                data-cursor-label="VIEW"
                className="company-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr 1.1fr auto",
                  gap: "clamp(1rem, 3vw, 2.4rem)",
                  alignItems: "baseline",
                  padding: "1.6rem 0.5rem",
                  borderBottom: "1px solid var(--hairline)",
                  transition: "background-color .4s var(--ease-out)",
                  color: "inherit",
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                  {company.index}
                </span>
                <span
                  className="display-md company-row-title"
                  style={{
                    fontSize: "clamp(1.15rem, 2.4vw, 1.7rem)",
                    color: "var(--text-primary)",
                    transition: "color .3s var(--ease-out)",
                  }}
                >
                  {company.name}
                </span>
                <span
                  className="mono company-row-tagline"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {company.tagline}
                </span>
                <span
                  className="mono company-row-arrow"
                  style={{
                    fontSize: "1.3rem",
                    color: "var(--accent)",
                    transition: "transform .3s var(--ease-out)",
                  }}
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .company-row:hover { background: rgba(126,47,58,0.04); }
        .company-row:hover .company-row-title { color: var(--accent-bright); }
        .company-row:hover .company-row-arrow { transform: translateX(6px); }
        @media (max-width: 760px) {
          .company-row { grid-template-columns: 40px 1fr auto !important; gap: 12px !important; }
          .company-row-tagline { display: none !important; }
        }
      `}</style>
    </section>
  );
}
