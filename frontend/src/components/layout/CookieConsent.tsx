import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  COOKIE_SETTINGS_EVENT,
  getCookieConsent,
  saveCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookies";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null);

  useEffect(() => {
    const existing = getCookieConsent();
    setChoice(existing?.choice ?? null);
    setVisible(!existing);

    const open = () => {
      const current = getCookieConsent();
      setChoice(current?.choice ?? null);
      setVisible(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cookie-banner-open", visible);
    return () => document.body.classList.remove("cookie-banner-open");
  }, [visible]);

  const decide = (value: CookieConsentChoice) => {
    saveCookieConsent(value);
    setChoice(value);
    setVisible(false);
  };

  if (!visible) return null;

  return createPortal(
    <div
      className="cookie-banner"
      role="region"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: "fixed",
        left: "clamp(1rem, 3vw, 1.5rem)",
        bottom: "clamp(1rem, 3vw, 1.5rem)",
        width: "min(560px, calc(100vw - 2rem))",
        zIndex: "var(--z-cookie, 1450)",
        background: "var(--bg-primary)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 24px 70px rgba(16,16,16,0.24)",
        padding: "1.25rem 1.35rem",
      }}
    >
      <div className="mono eyebrow" style={{ marginBottom: 10 }}>
        Cookie notice
      </div>
      <h2 className="display-md" style={{ fontSize: "1.35rem", lineHeight: 1.2 }}>
        Your privacy, your choice.
      </h2>
      <p
        style={{
          marginTop: 10,
          fontSize: "0.9rem",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
        }}
      >
        We use essential cookies and similar technologies to keep this site
        working and, with your consent, optional cookies to understand how it is
        used. You can accept all cookies or continue with essential cookies
        only.{" "}
        <Link
          to="/privacy#cookies"
          onClick={() => setVisible(false)}
          style={{
            color: "var(--accent-bright)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Read the cookie policy
        </Link>
        .
      </p>

      {choice && (
        <div
          className="mono"
          style={{
            marginTop: 12,
            fontSize: 10,
            letterSpacing: "0.08em",
            color: "var(--text-faint)",
          }}
        >
          Current preference: {choice === "all" ? "All cookies" : "Essential only"}
        </div>
      )}

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button
          type="button"
          onClick={() => decide("all")}
          className="btn btn-primary"
          style={{ fontSize: 11, padding: "0.65rem 1.1rem" }}
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => decide("essential")}
          className="btn btn-ghost"
          style={{ fontSize: 11, padding: "0.65rem 1.1rem" }}
        >
          Essential only
        </button>
      </div>

      <div
        className="mono"
        style={{
          marginTop: 12,
          fontSize: 9.5,
          letterSpacing: "0.06em",
          color: "var(--text-faint)",
        }}
      >
        Change your choice anytime via Cookie settings in the footer.
      </div>

      <style>{`
        .cookie-banner {
          animation: cookie-in .45s var(--ease-out) both;
        }
        @keyframes cookie-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        body.cookie-banner-open .chatbot {
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s var(--ease-out);
        }
        @media (prefers-reduced-motion: reduce) {
          .cookie-banner { animation: none; }
        }
      `}</style>
    </div>,
    document.body,
  );
}
