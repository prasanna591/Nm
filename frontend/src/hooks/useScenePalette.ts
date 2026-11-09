import { useState } from "react";

export type ScenePalette = {
  accent: string;
  accentDeep: string;
  metal: string;
  glass: string;
  dark: string;
  text: string;
  surface: string;
  background: string;
};

const FALLBACK: ScenePalette = {
  accent: "#7e2f3a",
  accentDeep: "#5c1e28",
  metal: "#a07a4f",
  glass: "#ecddc8",
  dark: "#241c16",
  text: "#4a3d33",
  surface: "#efe5d8",
  background: "#e3d6c6",
};

function readPalette(): ScenePalette {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return FALLBACK;
  }

  const styles = getComputedStyle(document.documentElement);
  const value = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    accent: value("--accent", FALLBACK.accent),
    accentDeep: value("--accent-deep", FALLBACK.accentDeep),
    metal: value("--metal", FALLBACK.metal),
    glass: value("--champagne", FALLBACK.glass),
    dark: value("--text-primary", FALLBACK.dark),
    text: value("--text-secondary", FALLBACK.text),
    surface: value("--surface", FALLBACK.surface),
    background: value("--bg-primary", FALLBACK.background),
  };
}

export function useScenePalette(): ScenePalette {
  const [palette] = useState<ScenePalette>(readPalette);
  return palette;
}
