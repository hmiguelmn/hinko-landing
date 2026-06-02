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
--gold: #CD9A3A
--gold-soft: #E2C27E
--gold-deep: #846010
--sage: #5E7B58
--paper: #F6F4EF
--mist: #E5E1D8
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
| — | Hero (fullscreen, navy + chevron dorado) |
| `#servicios` | Grid 2×2 de servicios |
| `#sostenibilidad` | Stats + fondo sage |
| `#proyectos` | Portafolio 3 columnas (placeholders) |
| `#contacto` | Footer con datos de contacto y equipo |

**Equipo:** Nicolás Luengas (nicolas@hinko.co) · Henry Muñoz (henry@hinko.co) · Julián Castellanos (julian@hinko.co)

---

## Despliegue

```bash
# Sin build step — Vercel sirve el directorio raíz directamente
git add . && git commit -m "mensaje" && git push   # dispara auto-deploy
```

El dominio `hinko.co` apunta via `A @ 76.76.21.21` a Vercel.
El software de gestión vive en `app.hinko.co` (repo hinko-ingenieria, proyecto Vercel separado).
