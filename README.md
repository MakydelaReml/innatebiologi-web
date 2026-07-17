# INNATEBIOLOGI — repositorio web e integración

Este repositorio contiene la web de INNATEBIOLOGI y, temporalmente, el núcleo común que utilizan los agentes, el curso, la identidad narrativa y la producción audiovisual.

## Mapa rápido

| Área | Ruta | Responsabilidad |
|---|---|---|
| Web y app | `app/` | Interfaz pública y aplicación del alumno |
| Recursos web oficiales | `public/` | Imágenes, SVG y archivos servidos por la web |
| Núcleo compartido | `INNATEBIOLOGI_AI/` | Canon, memoria, ciencia, curso, narrativa, marca y agentes |
| Procedimientos auxiliares | `docs/` | SOP de agentes y documentación técnica breve |
| Archivo histórico web | `archive/web/` | Versiones antiguas conservadas, no activas |
| Trabajo local | `output/`, `tmp_character_sheets/` | Resultados en revisión; no son oficiales ni se suben a Git |
| Grafo local | `graphify-out/` | Índice regenerable de Graphify; no es fuente canónica |

## Autoridad documental

1. `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/CANON_INNATEBIOLOGI_V1.md`
2. Decisiones maestras posteriores aprobadas
3. Glosario y matriz científica vigentes
4. Mapas, guiones e identidad narrativa
5. Transcripciones y material original
6. Borradores, análisis y propuestas de agentes

La arquitectura y el reparto entre repositorios se define en `INNATEBIOLOGI_AI/DOCUMENTOS_MAESTROS/ARQUITECTURA_REPOSITORIOS_V1.md`.

## Regla de publicación

Un archivo generado no se convierte en oficial por existir dentro del proyecto. Para publicarlo o compartirlo debe trasladarse a su carpeta canónica, recibir un nombre estable, quedar enlazado desde el índice correspondiente y superar la revisión necesaria.

## Desarrollo web

```powershell
npm install
npm run dev
```

La aplicación se abre normalmente en `http://localhost:3000`.
