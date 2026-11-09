type ConversionEvent = {
  type: "conversion";
  event: "nm_conversion";
  name: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function emit(event: ConversionEvent) {
  window.dispatchEvent(new CustomEvent("nm:conversion", { detail: event }));
  window.dataLayer?.push({ ...event });
  window.gtag?.("event", event.event, event);
  if (import.meta.env.DEV) {
    console.info("[NM conversion]", event);
  }
}

export function trackConversion(
  name: string,
  properties: Record<string, unknown> = {},
) {
  emit({
    type: "conversion",
    event: "nm_conversion",
    name,
    ...properties,
  });
}
