import type { Metadata } from "next";
import StudentJournal from "../components/student/StudentJournal";

export const metadata: Metadata = {
  title: "Mi Bitácora — INNATEBIOLOGI",
  description:
    "Espacio privado de autorregistro para ordenar observaciones y releer el proceso INNATEBIOLOGI.",
};

export default function AlumnoPage() {
  return <StudentJournal />;
}
