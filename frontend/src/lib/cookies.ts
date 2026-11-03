export type CookieConsentChoice = "all" | "essential";

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  updatedAt: string;
};

const STORAGE_KEY = "nm-cookie-consent";

export const COOKIE_SETTINGS_EVENT = "nm:open-cookie-settings";
export const COOKIE_CONSENT_EVENT = "nm:cookie-consent-changed";

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStorage(value: string): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

export function getCookieConsent(): CookieConsentRecord | null {
  const raw = readStorage();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>;
    if (parsed.choice !== "all" && parsed.choice !== "essential") return null;
    return {
      choice: parsed.choice,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: CookieConsentChoice): CookieConsentRecord {
  const record: CookieConsentRecord = {
    choice,
    updatedAt: new Date().toISOString(),
  };
  writeStorage(JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: record }));
  return record;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
