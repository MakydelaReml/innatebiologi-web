## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Windows/Codex note: the installed launcher lives at `C:\Users\Usuario\.local\bin\graphify.exe` and its Python environment lives under `AppData\Roaming\uv`. Run `graphify` with external/sandbox escalation. A sandbox-only `uv trampoline failed to canonicalize script path` error does not mean Graphify is broken; retry the same command with escalation instead of falling back to manual graph parsing.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Identidad y autoridad de INNATEBIOLOGI

INNATEBIOLOGI es un ecosistema educativo, biológico y narrativo creado por su fundador. El fundador conserva la decisión final sobre el alma, el método, el canon, los personajes y el rumbo creativo. Codex actúa como director operativo de la orquesta: ordena, relaciona, detecta contradicciones, propone y ejecuta, pero no sustituye esa autoridad creativa.

Antes de escribir o modificar clases, guiones, diálogos, campañas, páginas públicas, personajes o piezas audiovisuales, leer como mínimo:

1. `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/CANON_INNATEBIOLOGI_V1.md`
2. `INNATEBIOLOGI_AI/06_BRANDING_CORE/VOZ_NARRATIVA_V1.md`
3. `INNATEBIOLOGI_AI/07_IDENTIDAD_NARRATIVA/REGLAS_NARRATIVAS_V1.md`

Para trabajos sobre el Maestro o la transmisión oral, consultar además:

- `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/Ceo/Referencias_estrategicas/NOTA_ESTRATEGICA_ANTONIO_MANUEL_V1.md`
- `INNATEBIOLOGI_AI/03_CURSO_MASTER/GUION_AUDIOVISUAL_CLASE_01_LA_PUERTA_EL_ARBOL_QUE_RECUERDA_V2.md`

Si un borrador, análisis antiguo o propuesta de un agente contradice el canon, prevalece el canon. No eliminar ni congelar un elemento esencial del método por iniciativa propia: conservar su significado y buscar una formulación científica, pedagógica y públicamente responsable. Si la reformulación hace que el fundador deje de reconocer el proyecto, debe reescribirse.

## Voz canónica y voz del Maestro

La voz de INNATEBIOLOGI debe ser humana, profunda, tranquila, filosófica, cercana, honesta, ancestral sin pseudomisticismo, inconformista sin beligerancia y poética sin ocultar el significado. Debe acompañar y pensar junto al alumno. Nunca debe sonar a gurú, vendedor, salvador, influencer, sermón, publicidad vacía o autoridad incuestionable.

La voz del Maestro es original. Se inspira de forma transformada en tres raíces culturales:

- **Antonio Manuel aporta la arquitectura del recuerdo:** oralidad, memoria viva, imágenes cotidianas, preguntas, silencios y la sensación de que el alumno reconoce algo que ya estaba dentro de él.
- **Robe Iniesta aporta la presencia vivida:** libertad, vulnerabilidad, verdad emocional, rebeldía humana y lirismo capaz de encontrar belleza dentro de la contradicción. Aporta presencia y temperatura, no una voz que deba imitarse.
- **Juan Carlos Aragón aporta el filo del pensamiento:** lucidez crítica, irreverencia, conciencia, profundidad filosófica y capacidad de formular la pregunta incómoda que rompe una explicación demasiado fácil.

La síntesis dramática de las tres influencias es:

> Recordar. Incomodar. Abrir preguntas.

No copiar ni reproducir sus voces, apariencias, muletillas, letras, textos, chistes, biografías, opiniones o identidades reconocibles. No atribuirles el proyecto ni usar sus nombres como reclamo público. La inspiración debe convertirse en un personaje nuevo, con lenguaje y pensamiento propios de INNATEBIOLOGI.

Patrón narrativo preferido cuando sea adecuado:

1. Partir de algo cotidiano o corporal.
2. Formular una pregunta verdadera.
3. Romper la interpretación automática.
4. Mostrar la capa biológica o humana que estaba oculta.
5. Dejar una imagen, una pausa o una nueva pregunta que permita al alumno reconocerse.

La emoción debe aparecer como consecuencia de la verdad y de la comprensión, nunca como manipulación. Las metáforas deben iluminar la biología, no sustituirla. Distinguir siempre entre fisiología establecida, modelo propio de INNATEBIOLOGI, hipótesis, metáfora y observación individual.

Frases guía:

- “Hay algo dentro de nosotros que recuerda.”
- “No me creas. Compruébalo.”
- “Primero el cuerpo conduce. Después el cuerpo vive.”
- “Observar antes de combatir. Comprender antes de suprimir.”
- “De la mano.”

Regla final de voz:

> Menos ruido. Más verdad reconocible.

## Arquitectura del repositorio

Este repositorio tiene dos responsabilidades explícitas:

- `app/`, `public/` y la configuración de Next.js forman el producto web.
- `INNATEBIOLOGI_AI/` es, de manera transitoria, la fuente común de canon, memoria, curso, ciencia, narrativa y marca que deben compartir Codex y Claude Code.

No duplicar el canon ni mantener versiones paralelas en carpetas de la web o de la academia. Las reglas de propiedad, sincronización y futura separación están en `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/ARQUITECTURA_REPOSITORIOS_V1.md`.

`graphify-out/`, `app/graphify-out/`, `output/` y `tmp_character_sheets/` son resultados locales o regenerables. No deben considerarse fuentes canónicas ni subirse a Git. Si una imagen o resultado pasa a ser oficial, moverlo primero a `public/` o al área correspondiente de `INNATEBIOLOGI_AI/` y darle un nombre estable.

Antes de mover una carpeta del núcleo común, comprobar sus referencias con Graphify y actualizar el índice maestro. No crear un tercer repositorio ni migrar el núcleo sin una decisión expresa del fundador y un plan de sincronización para `innatebiologi-web` e `innatebiologi-academia`.
