import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export default function LeadershipSection() {
  return (
    <section className="section-bg-1" style={{ paddingBlock: "6rem 5rem", borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <SectionHeading
          index="04"
          label="Leadership"
          title={
            <>
              LEADERSHIP <span style={{ color: "var(--accent)" }}>VISION</span>
            </>
          }
          subtitle="Dr. Mathivanan Nallathambi leads the NM Group of Industries and Research Foundation with a focus on research development, scientific collaboration, innovation and entrepreneurship."
        />
        <Reveal delay={0.1}>
          <div
            className="card"
            style={{
              maxWidth: 800,
              margin: "44px auto 0",
              padding: "2.4rem 2.6rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 14,
                color: "var(--accent-bright)",
                fontSize: 14,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 30, height: 2, background: "var(--accent)" }} />
              FOUNDER &amp; CEO
              <span style={{ width: 30, height: 2, background: "var(--accent)" }} />
            </div>
            <h3
              className="display-md"
              style={{ marginBottom: 8, color: "var(--text-primary)", fontSize: "1.75rem" }}
            >
              {site.founder.name}
            </h3>
            <p className="mono" style={{ marginBottom: 16, fontSize: 11, color: "var(--text-muted)" }}>
              {site.founder.credentials}
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: 560,
                marginInline: "auto",
              }}
            >
              Dr. Mathivanan Nallathambi is a researcher and entrepreneur with an academic background in
              Chemistry and a Ph.D. in Material Science. His leadership focus includes research development,
              scientific collaboration, innovation and entrepreneurship.
            </p>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "center",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-faint)" }}
              >
                Research Development
              </span>
              <span
                className="mono"
                style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-faint)" }}
              >
                Scientific Collaboration
              </span>
              <span
                className="mono"
                style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--text-faint)" }}
              >
                Innovation &amp; Entrepreneurship
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
