# Arquitectura de repositorios de INNATEBIOLOGI V1

## Decisión

INNATEBIOLOGI mantiene dos productos técnicos distintos, pero una sola identidad y una sola memoria de proyecto.

- `innatebiologi-web` contiene el producto web y la aplicación del alumno.
- `innatebiologi-academia` contiene la plataforma académica desplegada en el VPS.
- El canon, la voz, la ciencia, la marca y las decisiones maestras constituyen un núcleo común. No deben divergir entre ambos repositorios.

Durante esta fase, la copia canónica del núcleo común permanece en `innatebiologi-web/INNATEBIOLOGI_AI/`. Esta decisión es transitoria y evita crear un tercer repositorio antes de tener un protocolo de sincronización probado.

## Propiedad por áreas

### Núcleo común — autoridad compartida

Rutas principales:

- `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/`
- `INNATEBIOLOGI_AI/05_MEMORY_CORE/`
- `INNATEBIOLOGI_AI/06_BRANDING_CORE/`
- `INNATEBIOLOGI_AI/07_IDENTIDAD_NARRATIVA/`
- `INNATEBIOLOGI_AI/01_VISION_EMPRESA/`
- `AGENTS.md`

Estos documentos gobiernan tanto la web como la academia. Claude Code y Codex deben leerlos antes de modificar contenido que afecte al método, la voz, la identidad, la ciencia o la experiencia del alumno.

### Academia y producción educativa

Rutas principales en este entorno de integración:

- `INNATEBIOLOGI_AI/03_CURSO_MASTER/`
- `INNATEBIOLOGI_AI/04_NOTEBOOKLM/`
- `INNATEBIOLOGI_AI/AGENTES/CURSO/`
- `INNATEBIOLOGI_AI/ANALISIS_CURRICULAR/`
- `INNATEBIOLOGI_AI/Material_original_curso/`
- `INNATEBIOLOGI_AI/TRANSCRIPCIONES/`

El repositorio `innatebiologi-academia` es propietario del código de la plataforma académica. Las clases y decisiones curriculares solo pueden considerarse oficiales cuando coinciden con el canon común y están registradas en los índices maestros.

### Web y aplicación

Rutas:

- `app/`
- `public/`
- archivos de configuración de Next.js, TypeScript y Tailwind

`innatebiologi-web` es la fuente de verdad de esta capa. La web puede representar el núcleo, pero no redefinirlo dentro de componentes o textos aislados.

### Archivo y material local

- `archive/` conserva versiones anteriores que ya no están activas.
- `output/` y `tmp_character_sheets/` contienen resultados en evaluación.
- `graphify-out/` y `app/graphify-out/` son índices regenerables.
- `.codex/` contiene configuración dependiente del equipo local.

Ninguna de estas rutas tiene autoridad canónica. Un resultado aprobado debe trasladarse a `public/` o a su área oficial dentro de `INNATEBIOLOGI_AI/`.

## Flujo entre Codex y Claude Code

1. Antes de trabajar, actualizar el repositorio correspondiente desde GitHub.
2. Leer `AGENTS.md`, el canon y este documento.
3. Realizar cada cambio en una rama propia y explicar qué área modifica.
4. No editar simultáneamente el mismo documento maestro desde dos equipos.
5. Integrar primero los cambios del núcleo común; después adaptar web o academia.
6. Tras integrar, el otro entorno debe actualizarse antes de continuar trabajando sobre esa materia.

## Regla contra versiones paralelas

No crear copias como `canon_nuevo`, `canon_final`, `canon_bueno` o equivalentes en otra carpeta. Las revisiones deben conservar un nombre estable con versión formal, quedar enlazadas desde el índice maestro y declarar qué documento sustituyen.

Cuando web y academia necesiten el mismo archivo, no deben mantener dos fuentes de verdad editables. Hasta que exista `innatebiologi-core`, la autoridad es la ruta canónica de este repositorio.

## Cuándo crear `innatebiologi-core`

La separación a un tercer repositorio se hará únicamente cuando:

1. ambos repositorios consuman una versión identificable del núcleo;
2. exista una persona o agente responsable de aprobar cambios comunes;
3. haya un mecanismo de actualización probado en PC y VPS;
4. los enlaces y automatizaciones hayan sido ensayados en una rama de migración;
5. el fundador apruebe expresamente la separación.

Hasta entonces, esta estructura funciona como repositorio de integración: producto web más memoria común, con límites documentados.
