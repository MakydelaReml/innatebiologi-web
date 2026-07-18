export const STORAGE_KEY = "innatebiologi-student-app-v1";

export type PhaseId = "base" | "neutral" | "transition" | "advanced";
export type MapCategory = "Estado Conductivo" | "Estado Vivo" | "Todavía no lo sé";

export type DailyEntry = {
  id: string;
  date: string;
  salt: string;
  liquid: string;
  weight: string;
  carbs: string;
  fat: string;
  ketones: string;
  ph: string;
  note: string;
};

export type MapSignal = {
  id: string;
  text: string;
  category: MapCategory;
  date: string;
};

type PreservedReview = {
  classId: number;
  answer: string;
  veil: string;
  sealedAt?: string;
};

export type JournalState = {
  entries: DailyEntry[];
  signals: MapSignal[];
  reviews: PreservedReview[];
};

export const emptyState: JournalState = {
  entries: [],
  signals: [],
  reviews: [],
};

export function createId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const phases: Record<PhaseId, { name: string; range: string; description: string }> = {
  base: {
    name: "Fase 1 — Base azul",
    range: "menos de 4 g/L",
    description: "El registro permanece en la base de observación del método.",
  },
  neutral: {
    name: "Fase 2 — Neutral",
    range: "de 4 a menos de 7 g/L",
    description: "La bitácora sitúa el dato en la segunda franja del recorrido.",
  },
  transition: {
    name: "Fase 3 — Transición",
    range: "de 7 a 12 g/L",
    description: "El registro entra en la franja de transición del modelo.",
  },
  advanced: {
    name: "Fase 4 — Avanzada",
    range: "más de 12 g/L",
    description: "La cifra queda ordenada en la franja avanzada de la bitácora.",
  },
};

export function createEntry(): DailyEntry {
  return {
    id: createId(),
    date: new Date().toISOString().slice(0, 10),
    salt: "",
    liquid: "",
    weight: "",
    carbs: "",
    fat: "",
    ketones: "",
    ph: "",
    note: "",
  };
}

export function toNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export function getRatio(entry: Pick<DailyEntry, "salt" | "liquid">): number | null {
  const salt = toNumber(entry.salt);
  const liquid = toNumber(entry.liquid);
  if (salt === null || liquid === null || salt < 0 || liquid <= 0) return null;
  return salt / liquid;
}

export function getPhase(ratio: number | null): PhaseId | null {
  if (ratio === null) return null;
  if (ratio < 4) return "base";
  if (ratio < 7) return "neutral";
  if (ratio <= 12) return "transition";
  return "advanced";
}

export function parseState(value: unknown): JournalState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<JournalState>;
  if (!Array.isArray(candidate.entries) || !Array.isArray(candidate.signals)) return null;
  return {
    entries: candidate.entries,
    signals: candidate.signals,
    reviews: Array.isArray(candidate.reviews) ? candidate.reviews : [],
  };
}
