# Workflow ComfyUI — Piloto visual Clase 1

## Principio de trabajo

Cada plano se produce en tres aprobaciones:

1. **Frame maestro**: composicion, color, identidad visual.
2. **Movimiento**: camara, parallax, particulas, agua, luz.
3. **Plano final**: resolucion, limpieza, integracion sonora y montaje.

No pasar a movimiento hasta aprobar el frame maestro.

## Carpeta recomendada

```text
PRODUCCION_VIDEO_CLASE_01/
  00_REFERENCIAS/
  01_STORYBOARD/
  02_ANIMATIC/
  03_FRAMES_MAESTROS/
  04_COMFY_WORKFLOWS/
  05_VIDEO_TESTS/
  06_AUDIO/
  07_MONTAJE/
  08_APROBADOS/
```

## Nomenclatura

```text
IB_C01_P1_2_RAIZ_FRAME_V001.png
IB_C01_P1_2_RAIZ_VIDEO_TEST_V001.mp4
IB_C01_P1_2_RAIZ_WORKFLOW_V001.json
IB_C01_PILOTO60_ANIMATIC_V001.mp4
IB_C01_PILOTO60_MASTER_TEST_V001.mp4
```

## Tipos de plano

| Plano | Tipo | Metodo recomendado |
| --- | --- | --- |
| P1.1 Negro | Edicion | Premiere/DaVinci/CapCut, sin IA necesaria |
| P1.2 Raiz | 2.5D macro | Imagen maestra + depth/parallax + particulas |
| P1.3 Cordillera | Video IA / guia 3D si hace falta | Imagen inicial/final + control de camara |
| P1.4 Lago | 2.5D paisaje | Capas: nube, lago, reflejo, arbol |
| P1.5 Caminos | 2.5D humano detalle | Microplanos, referencias de personaje |
| P1.6 Maestro | Imagen controlada | Mano/props con referencia fuerte |
| P1.7 Primer sol | 2.5D + post | Luz, rocio, pulso tenue, titulo en edicion |

## Ajustes visuales base

- Anime cinematografico adulto.
- Realismo poetico, no infantil.
- Textura organica.
- Luz volumetrica suave.
- Color preamanecer: azules profundos, verdes apagados, coral minimo, oro reservado.
- Profundidad y parallax antes que accion.
- Movimiento selectivo: viento, agua, rocio, hojas, particulas, respiracion.

## Reglas de oro

- El oro significa informacion/conduccion, no magia.
- El arbol no habla en esta apertura.
- La puerta no se ve como puerta fisica.
- Los alumnos aun no se presentan como retratos.
- El Maestro no se revela de rostro en el piloto.
- Evitar cualquier marca, logo o texto accidental en objetos.

## Paquetes de referencia necesarios antes de final

### Mundo exterior

- Gran Arbol / logo vivo.
- Lago preamanecer.
- Cordillera y oceano de nubes.
- Tierra humeda y raiz microscopica.
- Paleta luz: preamanecer, primer sol, oro biologico.

### Personajes

Para el piloto bastan referencias parciales:

- botas/pantalon de Tomas;
- mano/manga de Lucia;
- silueta de Ines;
- postura de Nico;
- mano de Amina y semilla;
- respiracion/cuerpo de Elena;
- mano, manga y presencia del Maestro.

No hace falta cerrar aun expresiones completas.

## Riesgos tecnicos y solucion

| Riesgo | Solucion |
| --- | --- |
| Raiz demasiado magica | bajar emision, mantener textura tierra, oro puntual |
| Montanas deformadas | usar guia Blender simple o video con menos camara |
| Agua artificial | separar reflejo y superficie en capas |
| Manos deformadas | usar referencia fotografica/control pose/inpainting |
| Inconsistencia alumnos | ocultar rostros, fijar vestuario por silueta |
| Titulo con artefactos IA | poner texto solo en edicion, nunca generado |

## Orden de produccion recomendado

1. P1.2 raiz frame maestro.
2. P1.4 lago/arbol frame maestro.
3. P1.3 cordillera frame maestro.
4. P1.7 primer sol frame maestro.
5. P1.6 Maestro/televisiones frame maestro.
6. P1.5 microplanos alumnos.
7. Animatic con estos frames.
8. Movimiento por prioridad: raiz → lago → primer sol → cordillera → alumnos → Maestro.

## Primer test util

Antes de producir todo el piloto:

- Renderizar P1.2 completo de 8-10 s.
- Renderizar P1.4 completo de 8-10 s.
- Montarlos con sonido provisional.

Si esos dos planos funcionan, el lenguaje visual esta vivo.

