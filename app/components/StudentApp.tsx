"use client";

import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  BookOpen,
  Compass,
  Download,
  FileUp,
  Leaf,
  LineChart,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";

type PhaseId = "base" | "neutral" | "transition" | "advanced";
type TabId = "bitacora" | "mapa" | "repaso" | "evolucion";
type MapCategory = "Estado Conductivo" | "Estado Vivo" | "Todavía no lo sé";

type DailyEntry = {
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

type MapSignal = {
  id: string;
  text: string;
  category: MapCategory;
  date: string;
};

type ReviewEntry = {
  classId: number;
  answer: string;
  veil: string;
  sealedAt?: string;
};

type StudentAppState = {
  entries: DailyEntry[];
  signals: MapSignal[];
  reviews: ReviewEntry[];
};

const STORAGE_KEY = "innatebiologi-student-app-v1";

const emptyEntry = (): DailyEntry => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString().slice(0, 10),
  salt: "",
  liquid: "",
  weight: "",
  carbs: "",
  fat: "",
  ketones: "",
  ph: "",
  note: "",
});

const phases: Record<
  PhaseId,
  {
    name: string;
    short: string;
    range: string;
    description: string;
    focus: string;
    carbs?: [number, number];
    fat?: [number, number];
    active: string[];
  }
> = {
  base: {
    name: "Fase 1 — Base azul",
    short: "Base azul",
    range: "menos de 4 g/L",
    description: "En esta franja, el diario se centra en agua, sal y proporción.",
    focus:
      "Antes de añadir más variables, relee la base hidroelectrolítica que has ido anotando.",
    active: ["sal", "líquido", "proporción", "peso"],
  },
  neutral: {
    name: "Fase 2 — Neutral",
    short: "Neutral",
    range: "4 a 7 g/L",
    description: "Se abre la observación alimentaria básica dentro del SAU.",
    focus: "Marco interno de esta fase: carbohidratos 50-100 g y grasa 30-50 g.",
    carbs: [50, 100],
    fat: [30, 50],
    active: ["sal", "líquido", "proporción", "peso", "carbohidratos", "grasa"],
  },
  transition: {
    name: "Fase 3 — Transición metabólica",
    short: "Transición",
    range: "7 a 12 g/L",
    description: "El alumno observa con más detalle combustible, energía y señales.",
    focus: "Marco interno de esta fase: carbohidratos 40-70 g y grasa 50-70 g.",
    carbs: [40, 70],
    fat: [50, 70],
    active: [
      "sal",
      "líquido",
      "proporción",
      "peso",
      "carbohidratos",
      "grasa",
      "cetonas",
    ],
  },
  advanced: {
    name: "Fase 4 — Observación avanzada",
    short: "Avanzada",
    range: "más de 12 g/L",
    description: "El diario abre el registro de todas las variables del proceso.",
    focus: "Marco interno de esta fase: carbohidratos por debajo de 40 g y grasa hasta 100 g.",
    carbs: [0, 40],
    fat: [0, 100],
    active: ["todos los campos"],
  },
};

const reviewPrompts = [
  "¿Qué cambia cuando dejo de mirar síntomas sueltos y empiezo a mirar condiciones?",
  "¿Qué significa para mí construir base antes de buscar respuestas?",
  "¿Qué me enseñó el mapa azul sobre agua, sal y conducción?",
  "¿Dónde confundía cantidad con equilibrio?",
  "¿Qué señal corporal empiezo a escuchar con más respeto?",
  "¿Qué parte de mi proceso necesita menos prisa?",
  "¿Qué patrón veo ahora que antes parecía casualidad?",
  "¿Qué suelo he construido para entrar en el Estado Vivo?",
];

const initialState: StudentAppState = {
  entries: [],
  signals: [],
  reviews: reviewPrompts.map((_, index) => ({
    classId: index + 1,
    answer: "",
    veil: "",
  })),
};

function toNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : NaN;
}

function getRatio(entry: DailyEntry) {
  const salt = toNumber(entry.salt);
  const liquid = toNumber(entry.liquid);
  if (!salt || !liquid || liquid <= 0) return null;
  return salt / liquid;
}

function getPhase(ratio: number | null): PhaseId {
  if (ratio === null || ratio < 4) return "base";
  if (ratio < 7) return "neutral";
  if (ratio <= 12) return "transition";
  return "advanced";
}

function inRange(value: string, range?: [number, number]) {
  if (!range || value.trim() === "") return "empty";
  const n = toNumber(value);
  if (!Number.isFinite(n)) return "empty";
  return n >= range[0] && n <= range[1] ? "inside" : "outside";
}

function average(entries: DailyEntry[], key: keyof DailyEntry, days: number) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, days);
  const values = sorted.map((entry) => toNumber(String(entry[key]))).filter(Number.isFinite);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function ratioAverage(entries: DailyEntry[], days: number) {
  const values = [...entries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, days)
    .map(getRatio)
    .filter((value): value is number => value !== null);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatMaybe(value: number | null, suffix = "") {
  if (value === null) return "—";
  return `${value.toFixed(1).replace(".", ",")}${suffix}`;
}

function safeLoadState(): StudentAppState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<StudentAppState>;
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      signals: Array.isArray(parsed.signals) ? parsed.signals : [],
      reviews: reviewPrompts.map((_, index) => {
        const existing = parsed.reviews?.find((item) => item.classId === index + 1);
        return existing ?? { classId: index + 1, answer: "", veil: "" };
      }),
    };
  } catch {
    return initialState;
  }
}

export default function StudentApp() {
  const [activeTab, setActiveTab] = useState<TabId>("bitacora");
  const [state, setState] = useState<StudentAppState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [entryDraft, setEntryDraft] = useState<DailyEntry>(emptyEntry);
  const [signalText, setSignalText] = useState("");
  const [signalCategory, setSignalCategory] = useState<MapCategory>("Todavía no lo sé");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState(safeLoadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const currentRatio = getRatio(entryDraft);
  const currentPhaseId = getPhase(currentRatio);
  const currentPhase = phases[currentPhaseId];
  const sortedEntries = useMemo(
    () => [...state.entries].sort((a, b) => b.date.localeCompare(a.date)),
    [state.entries],
  );

  const addEntry = () => {
    setState((previous) => ({
      ...previous,
      entries: [entryDraft, ...previous.entries],
    }));
    setEntryDraft(emptyEntry());
  };

  const deleteEntry = (id: string) => {
    setState((previous) => ({
      ...previous,
      entries: previous.entries.filter((entry) => entry.id !== id),
    }));
  };

  const updateDraft = (key: keyof DailyEntry, value: string) => {
    setEntryDraft((previous) => ({ ...previous, [key]: value }));
  };

  const addSignal = () => {
    if (!signalText.trim()) return;
    setState((previous) => ({
      ...previous,
      signals: [
        {
          id: crypto.randomUUID(),
          text: signalText.trim(),
          category: signalCategory,
          date: new Date().toISOString().slice(0, 10),
        },
        ...previous.signals,
      ],
    }));
    setSignalText("");
  };

  const deleteSignal = (id: string) => {
    setState((previous) => ({
      ...previous,
      signals: previous.signals.filter((signal) => signal.id !== id),
    }));
  };

  const updateReview = (classId: number, field: "answer" | "veil", value: string) => {
    setState((previous) => ({
      ...previous,
      reviews: previous.reviews.map((review) =>
        review.classId === classId ? { ...review, [field]: value } : review,
      ),
    }));
  };

  const sealVeil = (classId: number) => {
    setState((previous) => ({
      ...previous,
      reviews: previous.reviews.map((review) =>
        review.classId === classId
          ? { ...review, sealedAt: new Date().toISOString().slice(0, 10) }
          : review,
      ),
    }));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `innatebiologi-bitacora-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text) as StudentAppState;
      setState({
        entries: Array.isArray(parsed.entries) ? parsed.entries : [],
        signals: Array.isArray(parsed.signals) ? parsed.signals : [],
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : initialState.reviews,
      });
    } catch {
      alert("No he podido importar ese archivo. Revisa que sea un JSON exportado por la app.");
    } finally {
      event.target.value = "";
    }
  };

  const completedReviews = state.reviews.filter(
    (review) => review.answer.trim() || review.veil.trim(),
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#41392f]">
      <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(139,124,105,0.18),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(154,191,139,0.18),transparent_30%),linear-gradient(180deg,#f7f3ea_0%,#efe7d8_100%)]" />
        <div className="relative mx-auto max-w-6xl">
          <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-[#e5dccb] bg-white/55 p-5 shadow-[0_20px_60px_rgba(65,57,47,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8b7c69]">
                INNATEBIOLOGI · app interna
              </p>
              <h1 className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">
                Mi Bitácora
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#675c4f]">
                Un espejo con marco: registra, calcula y ordena tus datos sin diagnosticar,
                sin prometer y sin empujar al cuerpo.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d8ccb9] bg-[#fbf8f1]/85 p-4 text-sm text-[#675c4f]">
              <div className="mb-2 flex items-center gap-2 font-medium text-[#41392f]">
                <ShieldCheck className="h-4 w-4" />
                Cómo leer esta bitácora
              </div>
              La app registra y ordena tu proceso. Las fases son la nomenclatura interna de
              INNATEBIOLOGI: no diagnostican ni deciden por ti. Ninguna cifra aislada indica que
              debas subir, bajar o avanzar de fase.
            </div>
          </header>

          <nav className="mb-6 grid grid-cols-2 gap-2 rounded-3xl border border-[#e5dccb] bg-white/45 p-2 backdrop-blur lg:grid-cols-4">
            <TabButton
              active={activeTab === "bitacora"}
              icon={<Activity className="h-4 w-4" />}
              label="Mi Bitácora"
              onClick={() => setActiveTab("bitacora")}
            />
            <TabButton
              active={activeTab === "mapa"}
              icon={<Compass className="h-4 w-4" />}
              label="Mi Mapa"
              onClick={() => setActiveTab("mapa")}
            />
            <TabButton
              active={activeTab === "repaso"}
              icon={<BookOpen className="h-4 w-4" />}
              label="Mi Repaso"
              onClick={() => setActiveTab("repaso")}
            />
            <TabButton
              active={activeTab === "evolucion"}
              icon={<LineChart className="h-4 w-4" />}
              label="Tu Evolución"
              onClick={() => setActiveTab("evolucion")}
            />
          </nav>

          {activeTab === "bitacora" && (
            <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <Eyebrow>registro diario</Eyebrow>
                    <h2 className="font-serif text-3xl">El tablero de mandos</h2>
                  </div>
                  <Leaf className="h-8 w-8 text-[#8b7c69]" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Fecha" type="date" value={entryDraft.date} onChange={(v) => updateDraft("date", v)} />
                  <Field label="Peso (kg)" value={entryDraft.weight} onChange={(v) => updateDraft("weight", v)} />
                  <Field label="Sal (g)" value={entryDraft.salt} onChange={(v) => updateDraft("salt", v)} />
                  <Field label="Líquido (L)" value={entryDraft.liquid} onChange={(v) => updateDraft("liquid", v)} />
                  <Field label="Carbohidratos (g)" value={entryDraft.carbs} onChange={(v) => updateDraft("carbs", v)} />
                  <Field label="Grasa (g)" value={entryDraft.fat} onChange={(v) => updateDraft("fat", v)} />
                  <Field label="Cetonas" value={entryDraft.ketones} onChange={(v) => updateDraft("ketones", v)} />
                  <Field label="pH" value={entryDraft.ph} onChange={(v) => updateDraft("ph", v)} />
                </div>

                <label className="mt-3 block text-sm font-medium text-[#675c4f]">
                  Nota del día
                  <textarea
                    className="mt-2 min-h-24 w-full rounded-2xl border border-[#ded2bf] bg-white/75 px-4 py-3 outline-none transition focus:border-[#8b7c69]"
                    value={entryDraft.note}
                    onChange={(event) => updateDraft("note", event.target.value)}
                    placeholder="Energía, digestión, sueño, señales, contexto..."
                  />
                </label>

                <button
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#41392f] px-5 py-3 text-sm font-medium text-[#fffaf2] shadow-lg shadow-[#41392f]/15 transition hover:bg-[#5b5146]"
                  onClick={addEntry}
                >
                  <Plus className="h-4 w-4" />
                  Guardar registro
                </button>
              </Card>

              <div className="space-y-5">
                <Card>
                  <Eyebrow>fase asociada al registro</Eyebrow>
                  <div className="mt-3 rounded-[1.5rem] bg-[#41392f] p-5 text-[#fffaf2]">
                    <p className="text-sm text-[#d8ccb9]">Proporción sal/líquido</p>
                    <p className="mt-1 font-serif text-5xl">
                      {currentRatio === null ? "—" : currentRatio.toFixed(1).replace(".", ",")}
                      <span className="ml-2 text-lg">g/L</span>
                    </p>
                    <p className="mt-4 text-lg font-medium">{currentPhase.name}</p>
                    <p className="mt-1 text-sm text-[#d8ccb9]">{currentPhase.range}</p>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#675c4f]">{currentPhase.description}</p>
                  <p className="mt-2 text-sm leading-6 text-[#675c4f]">{currentPhase.focus}</p>
                  <p className="mt-3 rounded-2xl bg-[#efe7d8]/70 px-4 py-3 text-xs leading-5 text-[#675c4f]">
                    Esta lectura se calcula con los datos que anotas. Sirve para releer el proceso
                    y comentarlo con tu asesor; no es una orden automática ni una medición directa
                    del estado interno del cuerpo.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <RangePill
                      label="Carbohidratos"
                      value={entryDraft.carbs}
                      range={currentPhase.carbs}
                    />
                    <RangePill label="Grasa" value={entryDraft.fat} range={currentPhase.fat} />
                  </div>
                </Card>

                <Card>
                  <Eyebrow>resumen neutro</Eyebrow>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Sal media 7 días" value={formatMaybe(average(sortedEntries, "salt", 7), " g")} />
                    <Metric label="Sal media 30 días" value={formatMaybe(average(sortedEntries, "salt", 30), " g")} />
                    <Metric label="Proporción 7 días" value={formatMaybe(ratioAverage(sortedEntries, 7), " g/L")} />
                    <Metric label="Carbohidratos 7 días" value={formatMaybe(average(sortedEntries, "carbs", 7), " g")} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="ActionButton" onClick={exportJson}>
                      <Download className="h-4 w-4" />
                      Exportar JSON
                    </button>
                    <button className="ActionButton" onClick={() => fileInputRef.current?.click()}>
                      <FileUp className="h-4 w-4" />
                      Importar JSON
                    </button>
                    <input
                      ref={fileInputRef}
                      className="hidden"
                      type="file"
                      accept="application/json"
                      onChange={importJson}
                    />
                  </div>
                </Card>
              </div>

              <Card className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <Eyebrow>historial</Eyebrow>
                    <h2 className="font-serif text-2xl">Tus registros</h2>
                  </div>
                  <span className="rounded-full bg-[#efe7d8] px-3 py-1 text-xs text-[#675c4f]">
                    {sortedEntries.length} días
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="text-xs uppercase tracking-[0.16em] text-[#8b7c69]">
                      <tr>
                        <th className="py-3">Fecha</th>
                        <th>Fase</th>
                        <th>Sal</th>
                        <th>Líquido</th>
                        <th>g/L</th>
                        <th>Carbs</th>
                        <th>Grasa</th>
                        <th>Nota</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eadfce]">
                      {sortedEntries.map((entry) => {
                        const ratio = getRatio(entry);
                        const phase = phases[getPhase(ratio)];
                        return (
                          <tr key={entry.id} className="align-top">
                            <td className="py-3">{entry.date}</td>
                            <td>{phase.short}</td>
                            <td>{entry.salt || "—"}</td>
                            <td>{entry.liquid || "—"}</td>
                            <td>{ratio === null ? "—" : ratio.toFixed(1).replace(".", ",")}</td>
                            <td>{entry.carbs || "—"}</td>
                            <td>{entry.fat || "—"}</td>
                            <td className="max-w-xs text-[#675c4f]">{entry.note || "—"}</td>
                            <td>
                              <button
                                className="rounded-full p-2 text-[#8b7c69] transition hover:bg-[#efe7d8] hover:text-[#41392f]"
                                onClick={() => deleteEntry(entry.id)}
                                aria-label="Eliminar registro"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {!sortedEntries.length && (
                    <p className="py-8 text-center text-sm text-[#8b7c69]">
                      Todavía no hay registros. Guarda el primer día y la curva empezará a hablar.
                    </p>
                  )}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "mapa" && (
            <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <Card>
                <Eyebrow>mi mapa</Eyebrow>
                <h2 className="font-serif text-3xl">La brújula del alumno</h2>
                <p className="mt-3 text-sm leading-6 text-[#675c4f]">
                  Escribe señales con tus palabras. La app no interpreta: tú clasificas,
                  observas y relees.
                </p>
                <textarea
                  className="mt-5 min-h-32 w-full rounded-2xl border border-[#ded2bf] bg-white/75 px-4 py-3 outline-none transition focus:border-[#8b7c69]"
                  value={signalText}
                  onChange={(event) => setSignalText(event.target.value)}
                  placeholder="Ej: me levanto con sed, digestión pesada, piel más seca..."
                />
                <select
                  className="mt-3 w-full rounded-2xl border border-[#ded2bf] bg-white/75 px-4 py-3 outline-none"
                  value={signalCategory}
                  onChange={(event) => setSignalCategory(event.target.value as MapCategory)}
                >
                  <option>Estado Conductivo</option>
                  <option>Estado Vivo</option>
                  <option>Todavía no lo sé</option>
                </select>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#41392f] px-5 py-3 text-sm font-medium text-[#fffaf2]" onClick={addSignal}>
                  <Plus className="h-4 w-4" />
                  Añadir señal
                </button>
              </Card>

              <Card>
                <Eyebrow>lista y relectura</Eyebrow>
                <div className="mt-4 space-y-3">
                  {state.signals.map((signal) => (
                    <div
                      key={signal.id}
                      className="rounded-2xl border border-[#eadfce] bg-[#fbf8f1]/80 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="rounded-full bg-[#efe7d8] px-3 py-1 text-xs text-[#675c4f]">
                            {signal.category}
                          </span>
                          <p className="mt-3 leading-6">{signal.text}</p>
                          <p className="mt-2 text-xs text-[#8b7c69]">{signal.date}</p>
                        </div>
                        <button
                          className="rounded-full p-2 text-[#8b7c69] transition hover:bg-[#efe7d8]"
                          onClick={() => deleteSignal(signal.id)}
                          aria-label="Eliminar señal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {!state.signals.length && (
                    <p className="rounded-2xl border border-dashed border-[#d8ccb9] p-6 text-center text-sm text-[#8b7c69]">
                      Aún no hay señales. El mapa empieza con una frase honesta.
                    </p>
                  )}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "repaso" && (
            <section className="space-y-5">
              <Card>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Eyebrow>mi repaso</Eyebrow>
                    <h2 className="font-serif text-3xl">Asentar clase a clase</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#675c4f]">
                      Fase 1 disponible en esta V1. Las clases 9-15 pueden entrar después como
                      contenido modular sin tocar el corazón de la app.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#efe7d8] px-4 py-2 text-sm text-[#675c4f]">
                    {completedReviews} de 8 repasos con escritura
                  </span>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {state.reviews.map((review) => (
                  <Card key={review.classId}>
                    <Eyebrow>clase {review.classId}</Eyebrow>
                    <h3 className="mt-2 font-serif text-2xl">{reviewPrompts[review.classId - 1]}</h3>
                    <textarea
                      className="mt-4 min-h-28 w-full rounded-2xl border border-[#ded2bf] bg-white/75 px-4 py-3 outline-none transition focus:border-[#8b7c69]"
                      value={review.answer}
                      onChange={(event) => updateReview(review.classId, "answer", event.target.value)}
                      placeholder="Respuesta del alumno..."
                    />
                    <div className="mt-4 rounded-2xl border border-[#d8ccb9] bg-[#f7f3ea] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8b7c69]">El Velo</p>
                      <textarea
                        className="mt-3 min-h-20 w-full rounded-xl border border-[#ded2bf] bg-white/70 px-3 py-2 outline-none"
                        value={review.veil}
                        onChange={(event) => updateReview(review.classId, "veil", event.target.value)}
                        placeholder="Un despertar, una frase que queda sellada..."
                      />
                      <button
                        className="mt-3 rounded-full border border-[#cdbfa9] px-4 py-2 text-xs text-[#675c4f] transition hover:bg-white"
                        onClick={() => sealVeil(review.classId)}
                      >
                        {review.sealedAt ? `Sellado: ${review.sealedAt}` : "Sellar con fecha"}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {activeTab === "evolucion" && (
            <section className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="Proporción sal/líquido" entries={sortedEntries} getValue={getRatio} suffix="g/L" />
              <ChartCard title="Carbohidratos" entries={sortedEntries} getValue={(entry) => finiteOrNull(entry.carbs)} suffix="g" />
              <ChartCard title="Peso" entries={sortedEntries} getValue={(entry) => finiteOrNull(entry.weight)} suffix="kg" />
              <ChartCard title="Sal" entries={sortedEntries} getValue={(entry) => finiteOrNull(entry.salt)} suffix="g" />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

function finiteOrNull(value: string) {
  const n = toNumber(value);
  return Number.isFinite(n) ? n : null;
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        active ? "bg-[#41392f] text-[#fffaf2] shadow-lg shadow-[#41392f]/15" : "text-[#675c4f] hover:bg-white/70"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[2rem] border border-[#e5dccb] bg-white/60 p-5 shadow-[0_18px_50px_rgba(65,57,47,0.07)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.24em] text-[#8b7c69]">{children}</p>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-[#675c4f]">
      {label}
      <input
        className="mt-2 w-full rounded-2xl border border-[#ded2bf] bg-white/75 px-4 py-3 text-[#41392f] outline-none transition placeholder:text-[#a89b89] focus:border-[#8b7c69]"
        type={type}
        inputMode={type === "text" ? "decimal" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={type === "date" ? undefined : "—"}
      />
    </label>
  );
}

function RangePill({
  label,
  value,
  range,
}: {
  label: string;
  value: string;
  range?: [number, number];
}) {
  const status = inRange(value, range);
  const text =
    status === "empty"
      ? range
        ? `${range[0]}-${range[1]} g`
        : "Se registra en otras fases"
      : status === "inside"
        ? "Coincide con el marco de esta fase"
        : "Dato registrado fuera del marco de esta fase";
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-[#fbf8f1] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8b7c69]">{label}</p>
      <p className="mt-2 text-sm font-medium">{text}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-[#fbf8f1]/80 p-4">
      <p className="text-xs text-[#8b7c69]">{label}</p>
      <p className="mt-1 font-serif text-2xl">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  entries,
  getValue,
  suffix,
}: {
  title: string;
  entries: DailyEntry[];
  getValue: (entry: DailyEntry) => number | null;
  suffix: string;
}) {
  const points = [...entries]
    .reverse()
    .map((entry) => ({ date: entry.date, value: getValue(entry) }))
    .filter((point): point is { date: string; value: number } => point.value !== null)
    .slice(-14);
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <Card>
      <Eyebrow>curva propia</Eyebrow>
      <h2 className="mt-2 font-serif text-3xl">{title}</h2>
      <div className="mt-6 flex h-56 items-end gap-2 rounded-[1.5rem] border border-[#eadfce] bg-[#fbf8f1]/75 p-4">
        {points.map((point) => (
          <div key={`${point.date}-${point.value}`} className="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              className="min-h-2 rounded-t-full bg-[#8b7c69]"
              style={{ height: `${Math.max(6, (point.value / max) * 100)}%` }}
              title={`${point.date}: ${point.value.toFixed(1)} ${suffix}`}
            />
          </div>
        ))}
        {!points.length && (
          <div className="flex w-full items-center justify-center text-sm text-[#8b7c69]">
            Aún no hay datos suficientes para esta curva.
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-[#8b7c69]">
        Sin metas ni zonas de color: solo la forma de tus propios datos.
      </p>
    </Card>
  );
}
