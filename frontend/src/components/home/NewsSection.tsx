import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NewsSection() {
  return (
    <section className="section-bg-3" style={{ paddingBlock: "6rem 5rem", borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <SectionHeading
          index="06"
          label="News & updates"
          title={
            <>
              NEWS <span style={{ color: "var(--accent)" }}>UPDATES</span>
            </>
          }
          subtitle="Updates on research initiatives, institutional collaborations, conferences, internships, recruitment and innovation programs."
        />
        <Reveal delay={0.08}>
          <div
            style={{
              marginTop: 40,
              maxWidth: 720,
              marginInline: "auto",
              fontSize: "0.96rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            Research initiatives, collaboration announcements, conference participation,
            internship openings and recruitment updates will be published here. Check back
            for the latest from the NM research ecosystem.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
