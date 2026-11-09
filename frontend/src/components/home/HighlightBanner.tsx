import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

export default function HighlightBanner() {
  return (
    <section
      className="section-bg-0"
      style={{
        background: "var(--bg-primary)",
        paddingBlock: "55px clamp(4vw, 8%, 10%)",
        textAlign: "center",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <Reveal>
        <h2
          className="display-lg"
          style={{
            color: "var(--accent-bright)",
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 48px)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Building Knowledge. Creating Innovation.
        </h2>
        <p
          style={{
            maxWidth: 850,
            marginInline: "auto",
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            marginBottom: 25,
          }}
        >
          Connecting people, research and technology for a sustainable future.
        </p>
        <Reveal delay={0.1}>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ fontSize: 13, padding: "12px 28px", fontWeight: 600 }}
          >
            Explore Collaborations <span style={{ marginLeft: 6 }}>→</span>
          </Link>
        </Reveal>
      </Reveal>
    </section>
  );
}
