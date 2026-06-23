import type { Metadata } from "next";
import HomePage from "../components/HomePage";
import { en } from "../i18n/en";

export const metadata: Metadata = en.metadata;

export default function EnglishPage() {
  return <HomePage />;
}
