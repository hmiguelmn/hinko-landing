# Guardado — no se publica

Esta carpeta está en `.vercelignore`: nada de aquí sale en hinko.co.

## Mantenimiento integral por suscripción (retirado el 2026-11-18)

La página de mantenimiento ofrecía un **plan anual con pago mensual** (niveles básico, estándar e integral). Se retiró mientras se explora mejor ese modelo; la pauta arranca con mantenimiento **por intervención**.

- `mantenimiento-integral-suscripcion.html` — copia exacta de la página como estaba (commit `cdad822`, también marcado con la etiqueta git `mantenimiento-suscripcion-v1`). Las rutas a `site.css`, `img/` y `assets/` son relativas a la raíz: para verla igual, cópiela a la raíz del repo.

### Para volver a la suscripción

1. Restaurar la página: `git checkout mantenimiento-suscripcion-v1 -- mantenimiento-integral.html` (o copiar el archivo de esta carpeta a la raíz).
2. Volver a poner los textos que se cambiaron en otras páginas:

| Dónde | Texto con suscripción |
|---|---|
| Menú de servicios (todas las páginas, desplegable) | `Planes anuales para edificios en operación` |
| `index.html`, tarjeta 01 de `#servicios` | `Planes anuales para edificios en operación.` |
| `nosotros.html`, cifra 48 h | `Respuesta a emergencias<br />en planes de mantenimiento` |
| `nosotros.html`, cifra 6 m | `Garantía en planes<br />de mantenimiento` |

3. En `CLAUDE.md`, volver a describir el plan anual en "Datos del negocio" y la fila "Plan anual con 3 niveles" (`.plan`, `.tier`).

Los estilos `.plan` y `.tier` siguen en `site.css`; la versión por intervención los reutiliza para el bloque "Tipos de intervención".
