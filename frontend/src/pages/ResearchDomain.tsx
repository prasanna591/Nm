import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { domains } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ResearchDomain() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const domain = domains.find((d) => d.id === domainId);

  usePageMeta(
    domain ? `${domain.title} | NM Research` : "Research Domain | NM Research",
    domain
      ? `${domain.title} — ${domain.subjects.length} subjects supported by NM Research.`
      : "Research domain not found.",
  );

  useEffect(() => {
    if (!domain) navigate("/research");
  }, [domain, navigate]);

  if (!domain) return null;

  return (
    <>
      <PageHero
        label="Research index"
        crumb="NM Research"
        title={
          <>
            {domain.title}
            <br />
            <span style={{ color: "var(--accent)" }}>RESEARCH DOMAIN</span>
          </>
        }
        subtitle={`${domain.subjects.length} subjects in ${domain.title}, supported from topic framing to publication.`}
        diagram="molecule"
      />

      <section style={{ paddingBlock: "5rem 4rem" }}>
        <div className="container">
          <SectionHeading
            index="01"
            label="Core subjects"
            title={domain.title}
            subtitle={`${domain.subjects.length} research subjects fully supported within this domain.`}
          />

          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {domain.subjects.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1rem 1.1rem",
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--text-faint)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="display-md"
                    style={{
                      marginTop: 6,
                      fontSize: "clamp(1rem, 2vw, 1.25rem)",
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link
              to="/research"
              className="btn btn-ghost"
              style={{ fontSize: 11.5 }}
            >
              ← Back to research index <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
