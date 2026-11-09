import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import {
  cookieCategories,
  privacyIntroSections,
  privacyNav,
  privacyOutroSections,
  privacyUpdated,
  type LegalSection,
} from "@/data/legal";
import { openCookieSettings } from "@/lib/cookies";
import { usePageMeta } from "@/hooks/usePageMeta";

const bodyText = {
  marginBottom: 14,
  fontSize: "0.96rem",
  lineHeight: 1.8,
  color: "var(--text-secondary)",
};

const sectionTitle = {
  fontSize: "clamp(1.35rem, 2.4vw, 1.8rem)",
  marginBottom: 16,
};

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="section-bg-0" style={{ scrollMarginTop: 120 }}>
      <h2 className="display-md" style={sectionTitle}>
        {section.title}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} style={bodyText}>
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            listStyle: "none",
          }}
        >
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                fontSize: "0.94rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
              }}
            >
              <span className="status-dot" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CookieSection() {
  return (
    <section id="cookies" className="section-bg-1" style={{ scrollMarginTop: 120 }}>
      <h2 className="display-md" style={sectionTitle}>
        Cookies and similar technologies
      </h2>
      <p style={bodyText}>
        Cookies are small text files stored on your device. We use them to
        remember your cookie choice, keep the site secure and, only with your
        consent, understand how the site is used. Your cookie choice is stored
        in your browser's local storage so we can remember it on your next
        visit.
      </p>
      <p style={bodyText}>
        We do not currently use advertising or cross-site tracking cookies.
      </p>

      <div
        className="cookie-cat-grid"
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {cookieCategories.map((category) => (
          <div key={category.name} className="card" style={{ padding: "1.3rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <h3 className="display-md" style={{ fontSize: "1.05rem" }}>
                {category.name}
              </h3>
              <span
                className="mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color:
                    category.status === "always"
                      ? "var(--accent)"
                      : "var(--text-faint)",
                  whiteSpace: "nowrap",
                }}
              >
                {category.status === "always"
                  ? "ALWAYS ON"
                  : category.status === "optional"
                    ? "OPTIONAL"
                    : "THIRD PARTY"}
              </span>
            </div>
            <p
              style={{
                marginTop: 10,
                fontSize: "0.88rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
              }}
            >
              {category.purpose}
            </p>
            <div
              className="mono"
              style={{
                marginTop: 12,
                fontSize: 9.5,
                lineHeight: 1.6,
                color: "var(--text-faint)",
              }}
            >
              {category.examples}
            </div>
          </div>
        ))}
      </div>

      <p style={{ ...bodyText, marginTop: 20 }}>
        You can change or withdraw your cookie choice at any time using the
        button below or the Cookie settings link in the footer. You can also
        block or delete cookies in your browser settings; strictly necessary
        cookies may be required for parts of the site to work.
      </p>

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={openCookieSettings}
          className="btn btn-primary"
          style={{ fontSize: 11.5 }}
        >
          Cookie settings
        </button>
        <Link to="/contact" className="btn btn-ghost" style={{ fontSize: 11.5 }}>
          Ask about privacy
        </Link>
      </div>

      <p style={{ ...bodyText, marginTop: 18 }}>
        Third-party services such as Google Fonts and WhatsApp may process
        technical data when their content is loaded or when you follow a link.
        Please review their privacy notices for more information.
      </p>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-bg-2" style={{ scrollMarginTop: 120 }}>
      <h2 className="display-md" style={sectionTitle}>
        Contact us
      </h2>
      <p style={bodyText}>
        Questions about this policy, cookies or your personal information can be
        sent to us using the details below.
      </p>

      <div
        className="legal-contact"
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <a
          href={`mailto:${site.contact.emails[0]}`}
          className="card"
          style={{ padding: "1.2rem", color: "inherit" }}
        >
          <div className="mono eyebrow" style={{ marginBottom: 8 }}>
            Email
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              color: "var(--accent-bright)",
              wordBreak: "break-word",
            }}
          >
            {site.contact.emails[0]}
          </div>
        </a>

        <a
          href={`tel:${site.contact.phones[0].replace(/\s+/g, "")}`}
          className="card"
          style={{ padding: "1.2rem", color: "inherit" }}
        >
          <div className="mono eyebrow" style={{ marginBottom: 8 }}>
            Phone
          </div>
          <div style={{ fontSize: "0.95rem", color: "var(--accent-bright)" }}>
            {site.contact.phones[0]}
          </div>
        </a>

        <div
          className="card"
          style={{ padding: "1.2rem", gridColumn: "1 / -1" }}
        >
          <div className="mono eyebrow" style={{ marginBottom: 8 }}>
            Registered location
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
            }}
          >
            Kerala, India
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: "0.88rem",
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            Global presence: {site.contact.offices}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Privacy() {
  usePageMeta(
    "Privacy & Cookie Policy | NM Research",
    "How NM Research collects, uses and protects personal information, and how you can control cookies and your privacy choices.",
  );

  return (
    <>
      <PageHero
        label="Legal"
        crumb="NM Research"
        title={
          <>
            PRIVACY &amp;{" "}
            <span style={{ color: "var(--accent)" }}>COOKIE POLICY</span>
          </>
        }
        subtitle="How we collect, use and protect your information — and how you stay in control of cookies."
      />

      <section className="section-bg-3" style={{ paddingBlock: "4rem 6rem" }}>
        <div className="container">
          <div
            className="legal-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "220px minmax(0, 1fr)",
              gap: "clamp(2rem, 5vw, 4.5rem)",
              alignItems: "start",
            }}
          >
            <aside
              className="legal-nav"
              style={{ position: "sticky", top: 110, alignSelf: "start" }}
            >
              <div className="mono eyebrow" style={{ marginBottom: 16 }}>
                On this page
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {privacyNav.map((item) => (
                  <Link
                    key={item.id}
                    to={`/privacy#${item.id}`}
                    className="link-underline"
                    style={{
                      padding: "0.45rem 0",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div
                style={{
                  marginTop: 24,
                  padding: "1rem",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface)",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.12em",
                    color: "var(--text-faint)",
                  }}
                >
                  LAST UPDATED
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {privacyUpdated}
                </div>
              </div>
            </aside>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 44,
                minWidth: 0,
              }}
            >
              <Reveal>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                    lineHeight: 1.55,
                    color: "var(--text-primary)",
                  }}
                >
                  Your trust matters. This policy explains what we collect, why
                  we collect it and the choices available to you.
                </p>
              </Reveal>

              {privacyIntroSections.map((section) => (
                <Reveal key={section.id}>
                  <LegalSectionBlock section={section} />
                </Reveal>
              ))}

              <Reveal>
                <CookieSection />
              </Reveal>

              {privacyOutroSections.map((section) => (
                <Reveal key={section.id}>
                  <LegalSectionBlock section={section} />
                </Reveal>
              ))}

              <Reveal>
                <ContactSection />
              </Reveal>
            </div>
          </div>

          <style>{`
            .legal-nav {
              max-height: calc(100vh - 130px);
              overflow-y: auto;
            }
            @media (max-width: 900px) {
              .legal-layout { grid-template-columns: 1fr !important; }
              .legal-nav {
                position: static !important;
                max-height: none;
                overflow: visible;
              }
              .legal-nav nav {
                max-height: 220px;
                overflow-y: auto;
                padding-right: 8px;
              }
            }
            @media (max-width: 720px) {
              .cookie-cat-grid { grid-template-columns: 1fr !important; }
              .legal-contact { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
