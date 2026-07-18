"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./StudentJournal.module.css";
import {
  createEntry,
  createId,
  DailyEntry,
  emptyState,
  getPhase,
  getRatio,
  JournalState,
  MapCategory,
  parseState,
  phases,
  STORAGE_KEY,
} from "./journal-model";

type ViewId = "registro" | "historial" | "mapa";

function formatRatio(value: number | null) {
  return value === null ? "—" : `${value.toFixed(1).replace(".", ",")} g/L`;
}

function safeLoad(): JournalState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseState(JSON.parse(raw)) ?? emptyState : emptyState;
  } catch {
    return emptyState;
  }
}

export default function StudentJournal() {
  const [view, setView] = useState<ViewId>("registro");
  const [state, setState] = useState<JournalState>(emptyState);
  const [draft, setDraft] = useState<DailyEntry>(() => createEntry());
  const [signalText, setSignalText] = useState("");
  const [signalCategory, setSignalCategory] = useState<MapCategory>("Todavía no lo sé");
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState(safeLoad());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const sortedEntries = useMemo(
    () => [...state.entries].sort((a, b) => b.date.localeCompare(a.date)),
    [state.entries],
  );
  const ratio = draft ? getRatio(draft) : null;
  const phaseId = getPhase(ratio);
  const phase = phaseId ? phases[phaseId] : null;

  function updateDraft(field: keyof DailyEntry, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function saveEntry() {
    if (!draft.date) {
      setMessage("Añade una fecha antes de guardar.");
      return;
    }
    setState((current) => ({ ...current, entries: [draft, ...current.entries] }));
    setDraft(createEntry());
    setMessage("Registro guardado en este dispositivo.");
  }

  function deleteEntry(id: string) {
    if (!window.confirm("¿Eliminar este registro de la Bitácora?")) return;
    setState((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== id),
    }));
  }

  function addSignal() {
    const text = signalText.trim();
    if (!text) return;
    setState((current) => ({
      ...current,
      signals: [
        {
          id: createId(),
          text,
          category: signalCategory,
          date: new Date().toISOString().slice(0, 10),
        },
        ...current.signals,
      ],
    }));
    setSignalText("");
  }

  function exportJournal() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `innatebiologi-bitacora-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Copia de la Bitácora preparada.");
  }

  async function importJournal(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const imported = parseState(JSON.parse(await file.text()));
      if (!imported) throw new Error("invalid");
      if (!window.confirm("La importación sustituirá los datos guardados en este dispositivo. ¿Continuar?")) return;
      setState(imported);
      setMessage("Copia importada correctamente.");
    } catch {
      setMessage("No se pudo leer esa copia. El archivo no tiene el formato esperado.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Volver a INNATEBIOLOGI">
          <Image src="/ISOTIPO_master.png" alt="" width={42} height={42} priority />
          <span>INNATEBIOLOGI</span>
        </Link>
        <div className={styles.headerActions}>
          <button type="button" onClick={exportJournal}>Exportar copia</button>
          <button type="button" onClick={() => importRef.current?.click()}>Importar</button>
          <input ref={importRef} type="file" accept="application/json" hidden onChange={importJournal} />
        </div>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Mi espacio de observación</p>
        <h1>La Bitácora</h1>
        <p className={styles.lead}>
          Lo que anotas no dicta una conclusión. Conserva el rastro para que puedas mirar el
          proceso con contexto, tiempo y compañía.
        </p>
        <p className={styles.localNotice}>
          Privacidad V1: la información permanece solo en este navegador. No se envía a
          INNATEBIOLOGI. Guarda copias periódicas y evita incluir información clínica sensible.
        </p>
      </section>

      <nav className={styles.tabs} aria-label="Secciones de la Bitácora">
        {(["registro", "historial", "mapa"] as ViewId[]).map((item) => (
          <button
            key={item}
            type="button"
            className={view === item ? styles.activeTab : ""}
            aria-current={view === item ? "page" : undefined}
            onClick={() => setView(item)}
          >
            {item === "registro" ? "Registro de hoy" : item === "historial" ? "Relectura" : "Mi mapa"}
          </button>
        ))}
      </nav>

      {message && <p className={styles.message} role="status">{message}</p>}

      {view === "registro" && (
        <section className={styles.twoColumns}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Datos que tú decides anotar</p>
            <h2>Un día, sin prisas</h2>
            <div className={styles.formGrid}>
              <Field label="Fecha" type="date" value={draft.date} onChange={(value) => updateDraft("date", value)} />
              <Field label="Sal anotada (g)" value={draft.salt} onChange={(value) => updateDraft("salt", value)} />
              <Field label="Líquido anotado (L)" value={draft.liquid} onChange={(value) => updateDraft("liquid", value)} />
              <Field label="Peso anotado (kg)" value={draft.weight} onChange={(value) => updateDraft("weight", value)} />
              <Field label="Carbohidratos (g)" value={draft.carbs} onChange={(value) => updateDraft("carbs", value)} />
              <Field label="Grasa (g)" value={draft.fat} onChange={(value) => updateDraft("fat", value)} />
            </div>
            <label className={styles.fullField}>
              Observaciones y contexto
              <textarea
                value={draft.note}
                onChange={(event) => updateDraft("note", event.target.value)}
                placeholder="¿Qué merece ser recordado de este día?"
              />
            </label>
            <button className={styles.primaryButton} type="button" onClick={saveEntry}>Guardar este día</button>
          </article>

          <aside className={`${styles.card} ${styles.phaseCard}`}>
            <p className={styles.eyebrow}>Modelo INNATEBIOLOGI</p>
            <h2>{formatRatio(ratio)}</h2>
            {phase ? (
              <>
                <p className={styles.phaseName}>{phase.name}</p>
                <p>{phase.range}. {phase.description}</p>
              </>
            ) : (
              <p>Anota sal y líquido para calcular la proporción de este registro.</p>
            )}
            <div className={styles.boundary}>
              Esta cifra ordena lo que has anotado dentro del método. No mide por sí sola todos
              los compartimentos del cuerpo, no es un diagnóstico y no indica automáticamente
              que debas cambiar o avanzar.
            </div>
          </aside>
        </section>
      )}

      {view === "historial" && (
        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Relectura</p>
              <h2>Tu recorrido anotado</h2>
            </div>
            <span>{sortedEntries.length} {sortedEntries.length === 1 ? "día" : "días"}</span>
          </div>
          {sortedEntries.length ? (
            <div className={styles.entryList}>
              {sortedEntries.map((entry) => {
                const entryRatio = getRatio(entry);
                return (
                  <article key={entry.id} className={styles.entry}>
                    <div>
                      <time dateTime={entry.date}>{entry.date}</time>
                      <strong>{formatRatio(entryRatio)}</strong>
                    </div>
                    <p>{entry.note || "Sin observación escrita."}</p>
                    <dl>
                      <div><dt>Sal</dt><dd>{entry.salt || "—"} g</dd></div>
                      <div><dt>Líquido</dt><dd>{entry.liquid || "—"} L</dd></div>
                      <div><dt>Peso</dt><dd>{entry.weight || "—"} kg</dd></div>
                    </dl>
                    <button type="button" onClick={() => deleteEntry(entry.id)}>Eliminar</button>
                  </article>
                );
              })}
            </div>
          ) : <p className={styles.empty}>Todavía no hay días guardados. El recorrido empieza con una observación.</p>}
        </section>
      )}

      {view === "mapa" && (
        <section className={styles.twoColumns}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Palabras propias</p>
            <h2>Añadir una señal</h2>
            <p>La app no la interpreta. Tú eliges dónde dejarla mientras aprendes a releerla.</p>
            <textarea
              className={styles.signalInput}
              value={signalText}
              onChange={(event) => setSignalText(event.target.value)}
              placeholder="Algo que has percibido y quieres recordar…"
            />
            <select value={signalCategory} onChange={(event) => setSignalCategory(event.target.value as MapCategory)}>
              <option>Estado Conductivo</option>
              <option>Estado Vivo</option>
              <option>Todavía no lo sé</option>
            </select>
            <button className={styles.primaryButton} type="button" onClick={addSignal}>Añadir al mapa</button>
          </article>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Mapa vivo</p>
            <h2>Señales anotadas</h2>
            <div className={styles.signalList}>
              {state.signals.map((signal) => (
                <div key={signal.id}>
                  <span>{signal.category}</span>
                  <p>{signal.text}</p>
                  <time dateTime={signal.date}>{signal.date}</time>
                </div>
              ))}
              {!state.signals.length && <p className={styles.empty}>Aún no has añadido ninguna señal.</p>}
            </div>
          </article>
        </section>
      )}

      <footer className={styles.footer}>
        <p>Bitácora educativa de autorregistro. No sustituye evaluación, diagnóstico ni atención sanitaria.</p>
        <Link href="/">Volver al encuentro</Link>
      </footer>
    </main>
  );
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
  type?: "text" | "date";
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        inputMode={type === "text" ? "decimal" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={type === "text" ? "—" : undefined}
      />
    </label>
  );
}
