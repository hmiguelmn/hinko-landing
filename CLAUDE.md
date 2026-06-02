# HINKO Ingeniería — Landing Page

Sitio web institucional de HINKO Ingeniería. HTML/CSS estático, sin framework ni bundler.

**Deploy:** Vercel — auto-deploy en cada push a `main` · **Repo:** github.com/hmiguelmn/hinko-landing · **Dominio:** hinko.co

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 estático (`index.html`) |
| Estilos | CSS3 puro + variables en `brand.css` |
| Fuentes | Google Fonts — Archivo · IBM Plex Sans · IBM Plex Mono |
| Deploy | Vercel Static (sin build step) |

---

## Estructura

```
hinko-landing/
  index.html          # página principal
  brand.css           # variables CSS del sistema de marca compartido
  assets/
    favicon.svg
    logo-knockout.png  # logo blanco para fondos oscuros (nav + footer)
    logo-primary.png
    mark-chevron-gold.svg
    mark-navy.svg
    mark-paper.svg
```

---

## Sistema de marca (`brand.css`)

Variables CSS compartidas con el brandkit de HINKO:

```css
--navy: #001C38
--navy-80: #1A3450
--gold: #CD9A3A
--gold-soft: #E2C27E
--gold-deep: #846010
--sage: #5E7B58
--paper: #F6F4EF
--mist: #E5E1D8
--concrete: #B8B4A8
--graphite: #595F66
--ink: #001C38
--font-display: 'Archivo'
--font-body: 'IBM Plex Sans'
--font-mono: 'IBM Plex Mono'
```

---

## Secciones

| ID | Sección |
|----|---------|
| `#top` | Hero (fullscreen, navy + chevron dorado doble + grid técnica + meta bar) |
| `#servicios` | Grid 2×2 de servicios con animación de borde dorado |
| `#sostenibilidad` | Dos columnas: stats en cards + placeholder de imagen |
| `#proyectos` | Portafolio 3 columnas con numeración P—01/02/03 (placeholders) |
| `#contacto` | Footer con datos de contacto, CTA de correo y equipo |

**Equipo:** Nicolás Luengas (nicolas@hinko.co) · Henry Muñoz (henry@hinko.co) · Julián Castellanos (julian@hinko.co)

---

## Componentes y patrones

**Nav**
- Fijo en la parte superior; pasa de transparente a `rgba(0,22,46,.92)` con blur al hacer scroll (>40px)
- Logo: 52px inicial → 42px al hacer scroll; altura del row: 92px → 74px
- Links con animación de subrayado dorado deslizante en hover
- Menú hamburguesa (≤980px) con panel `#mobile-menu` que se desliza desde arriba

**Hero**
- Doble chevron: `chev-front` (sólido, opacity .92) + `chev-back` (calado stroke, opacity .10)
- Grid técnica de líneas finas con máscara radial
- Kick line con barra dorada `::before`
- Meta bar inferior con tres datos (Sede · Alcance · Enfoque) + punto pulsante "Desliza"
- Animaciones de entrada escalonadas `.anim.a1`–`.a5` (respetan `prefers-reduced-motion`)

**Reveal animation**
- Clase `.reveal` → `.reveal.in` activada por `IntersectionObserver` (threshold 16%)
- Clases `.d1`–`.d4` para delays escalonados (0.08s cada uno)

**Placeholders a completar**
- Cifras de sostenibilidad (`00%`, `00`) — reemplazar con datos reales
- Imágenes de proyectos (`.proj`) — reemplazar el fondo de rayas por fotos/renders
- Imagen de obra en sección sostenibilidad (`.sost .visual`)

---

## Despliegue

```bash
# Sin build step — Vercel sirve el directorio raíz directamente
git add . && git commit -m "mensaje" && git push   # dispara auto-deploy
```

El dominio `hinko.co` apunta via `A @ 76.76.21.21` a Vercel.
El software de gestión vive en `app.hinko.co` (repo hinko-ingenieria, proyecto Vercel separado).
