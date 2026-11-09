import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PublicationsSection() {
  return (
    <section className="section-bg-2" style={{ paddingBlock: "6rem 5rem", borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <SectionHeading
          index="05"
          label="Publications & knowledge"
          title={
            <>
              PUBLICATIONS <span style={{ color: "var(--accent)" }}>DEVELOPMENT</span>
            </>
          }
          subtitle="Supporting scholarly communication through research books, academic publications, conference proceedings and scientific knowledge-sharing initiatives."
        />
        <Reveal delay={0.08}>
          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 35,
            }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <div className="mono eyebrow" style={{ marginBottom: 12, color: "var(--accent)" }}>
                Research Publishing
              </div>
              <h3
                className="display-md"
                style={{ marginBottom: 12, color: "var(--text-primary)", fontSize: "1.35rem" }}
              >
                Scholarly Communication
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.94rem" }}>
                Supporting research books, academic publications, conference proceedings and scientific
                knowledge-sharing initiatives across disciplines.
              </p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  SCI / SCIE / Scopus indexed publications
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  Book chapters & conference proceedings
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  Patent filing & documentation support
                </span>
              </div>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div className="mono eyebrow" style={{ marginBottom: 12, color: "var(--accent)" }}>
                Innovation &amp; IP
              </div>
              <h3
                className="display-md"
                style={{ marginBottom: 12, color: "var(--text-primary)", fontSize: "1.35rem" }}
              >
                Intellectual Property
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.94rem" }}>
                Supporting innovation documentation, patent-related guidance, intellectual property
                awareness and connections with professional services.
              </p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  Patent-related guidance & documentation
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  Intellectual property awareness
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>▸</span>
                  Technology transfer & innovation policy
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
