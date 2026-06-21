import { programsData } from "../../i18n/programs-data";
import ProgramDetail from "../../components/ProgramDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return programsData.map((program) => ({
    id: program.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const program = programsData.find((p) => p.id === params.id);

  if (!program) {
    notFound();
  }

  return <ProgramDetail program={program} />;
}
