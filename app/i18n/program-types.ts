import { ProgramItem } from "./types";

export interface ProgramModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: ProgramLesson[];
}

export interface ProgramLesson {
  id: string;
  title: string;
  slug: string;
  content?: string; // Markdown or CMS ID
  videoUrl?: string;
  duration?: string;
  order: number;
}

export interface ProgramDetail extends ProgramItem {
  id: string;
  fullDescription: string;
  duration: string;
  format: string;
  targetAudience: string;
  outcomes: string[];
  modules: ProgramModule[];
  investment: {
    price: number;
    currency: string;
    description: string;
  };
}
