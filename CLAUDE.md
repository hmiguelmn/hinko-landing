# HINKO Ingeniería — Landing Page

Sitio web institucional de HINKO Ingeniería. HTML/CSS estático, sin framework ni bundler.

**Deploy:** Vercel — auto-deploy en cada push a `main` · **Repo:** github.com/hmiguelmn/hinko-landing · **Dominio:** hinko.co

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 estático (home, 4 páginas de servicio, Nosotros, Contacto y Tratamiento de datos) |
| Estilos | CSS3 puro: variables en `brand.css`, componentes en `site.css` |
| JS | `site.js` compartido (nav, reveal, aviso de cookies, formularios, UTM, eventos GTM) |
| Fuentes | Google Fonts — Archivo · IBM Plex Sans · IBM Plex Mono |
| Deploy | Vercel Static (sin build step) |

---

## Estructura

```
hinko-landing/
  index.html                       # home (sección #lineas enlaza las páginas de servicio)
  mantenimiento-integral.html      # → hinko.co/mantenimiento-integral
  adecuaciones-remodelaciones.html # → hinko.co/adecuaciones-remodelaciones
  consultoria-interventoria.html   # → hinko.co/consultoria-interventoria
  cargadores-electricos.html       # → hinko.co/cargadores-electricos
  nosotros.html                    # → hinko.co/nosotros
  contacto.html                    # → hinko.co/contacto (formulario completo)
  tratamiento-de-datos.html        # → hinko.co/tratamiento-de-datos (política Ley 1581 + cookies)
  brand.css           # variables CSS del sistema de marca compartido
  site.css            # estilos de todas las páginas
  site.js             # comportamiento compartido
  vercel.json         # cleanUrls (sin .html en la URL)
  sitemap.xml · robots.txt
  .vercelignore       # evita que Vercel publique CLAUDE.md
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

## Diseño

Diseño **Brandkit V2** (hecho en Claude Design). Todas las páginas comparten `site.css` y `site.js`; el header, el footer y la barra móvil se repiten como HTML estático en cada página (no hay plantillas).

| Componente | Clases |
|---|---|
| Header fijo con desplegable de servicios, teléfono y botón "Agendar visita" | `header.nav`, `.dd/.ddm`, `.tel`, `#mobile-menu` |
| Hero navy con foto, grid técnica, chevron y barra de datos | `.hero`, `.hero.home`, `.hero-cols`, `.facts` |
| Formulario de visita (tarjeta blanca con borde dorado) | `.fcard#agendar`, `form.hk-form`, `.ff`, `.frow`, `.fok` |
| Problema + tarjeta de riesgo | `.prob`, `.plist`, `.risk` |
| Alcance | `.scope` (lista) o `.cgrid` + `.cc` (tarjetas) |
| Plan anual con 3 niveles | `.plan`, `.tier` |
| Para quién | `.aud` |
| Galería antes/durante/después | `.xhead`, `.xrow`, `.xcell` |
| Pasos | `.steps` |
| Banda navy "Por qué HINKO" | `.why`, `.pts`, `.seals` |
| FAQ | `.faqw`, `.faq details` |
| CTA, otros servicios, footer, barra móvil (Llamar · WhatsApp · Agendar) | `.ctab`, `.cross`, `.foot`, `.abar` |
| Botón flotante de WhatsApp (solo escritorio; en móvil está en `.abar`) | `.wa-float` |
| Casilla de autorización de datos en formularios | `.fchk` |
| Aviso de cookies (lo crea `site.js`) y enlaces legales del pie | `.ckbar`, `.foot .legal`, `.ck-open` |
| Página de política | `.doc` |

## Páginas

**Línea editorial:** páginas cortas y técnicas. La empresa debe verse seria y profesional, no necesitada de vender: sin secciones de "¿le suena familiar?", sin argumentos de venta repetidos ni varios llamados a la acción por página. Mostrar alcance, método, registro de obra y respaldo.

| Página | Secciones |
|---|---|
| `index.html` | Hero · `#servicios` (4 tarjetas `.hub`) · `#capacidades` (lista `.scope`) · `#trabajo` · `#respaldo` (sellos) · `#contacto` (formulario completo) |
| `nosotros.html` | Hero corto · `#historia` (perfil + cifras) · `#metodo` · `#respaldo`. Sin formulario: "Agendar visita" lleva a `/contacto#agendar` |
| `contacto.html` | Hero corto · `#contactar` (teléfono, WhatsApp, correo, QR + formulario completo) |
| `tratamiento-de-datos.html` | Hero corto · `#politica` (10 numerales; `#cookies` es el 09). Si cambia, actualizar la fecha de vigencia y `POLITICA` en `site.js` |
| Páginas de servicio | Hero + formulario + barra de datos · `#alcance` (+ plan en Mantenimiento) · `#metodo` (4 pasos + imagen/diagrama) · `#trabajo` (si hay fotos) · `#respaldo` (sellos) · `#faq` (4 preguntas, JSON-LD FAQPage) |

Cada página de servicio corresponde a una campaña Search de Google Ads.

**Datos del negocio usados en el sitio (vienen del Brandkit V2):** plan anual de mantenimiento con pago mensual (niveles básico, estándar, integral) · emergencias en máx. 48 h · garantía de 6 meses por escrito en el plan · visita de diagnóstico sin costo · +8 años en ingeniería civil · cobertura nacional · Tel/WhatsApp +57 318 349 3168.

**Regla de contenido:** no mostrar nombres ni cargos del equipo en el sitio (la empresa debe verse institucional). Correo público: nicolas@hinko.co.

**Datos legales (RUT):** HINKO INGENIERIA S.A.S. · NIT 902.064.506-1 · Calle 62 # 3F-25, Bogotá D.C. Correo para solicitudes sobre datos personales: santiago@hinko.co.

**Equipo (solo referencia interna):** Nicolás Luengas (nicolas@hinko.co) · Henry Muñoz (henry@hinko.co) · Julián Castellanos (julian@hinko.co)

## Formularios y medición

- Todos los formularios son `form.hk-form` y envían JSON a `https://app.hinko.co/api/landing-prospecto` (CRM, repo hinko-ingenieria). Campos requeridos por el CRM: nombre, empresa, telefono, email, ciudad.
- En páginas de servicio, `servicio` va oculto (`mantenimiento`, `remodelacion`, `consultoria`, `cargadores`); en la home es un select.
- El select con `data-extra` (tipo de propiedad, espacio, necesidad, dónde se instala) se envía como `solicitud_tipo` (la etiqueta) y `solicitud_valor` (la respuesta); el CRM lo guarda en `tipo_propiedad` de la oportunidad (en consultoría, la "Necesidad" pasa a ser el servicio). `mensaje` lleva solo lo que escribió el cliente y va a `mensaje_cliente`. La atribución viaja como campos propios (`gclid`, `gbraid`, `wbraid`, `utm_*`, `landing_url`, `atribucion_at`; migración 124). El formulario también envía `autoriza_datos` (true; el servidor responde 400 si falta, Ley 1581), `politica_version` (el CRM guarda con el contacto la fecha del servidor y la versión que aceptó) y `acepta_comercial` (true/false, define si el contacto queda suscrito a campañas de correo). Se guarda el último clic con atribución: 90 días en `localStorage` solo si el visitante aceptó las cookies; si las rechazó o no ha decidido, solo dura la sesión.
- **Datos personales (Ley 1581 de 2012):** todo formulario lleva dos casillas `.fchk` antes de `.err`: `autoriza_datos` (obligatoria, nunca premarcada) y `autoriza_comercial` (opcional, para información comercial y boletines). `site.js` las quita del JSON y agrega al final de `mensaje` la prueba: `[Autorizó el tratamiento de datos personales · Información comercial: sí|no · Política <versión> · <fecha>]`.
- **Cookies (Google Consent Mode v2):** cada página tiene en el `<head>`, antes de GTM, el script que fija el consentimiento por defecto en `denied` (o `granted` si el visitante ya aceptó). `site.js` muestra el aviso `.ckbar`, guarda la decisión 12 meses en `localStorage` (`hk_cookies`) y envía `gtag('consent','update',…)`. En GTM, las etiquetas que no son de Google deben configurarse para exigir consentimiento.
- **GCLID del formulario** (se resuelve al enviar, en `origenCampos()` de `site.js`): 1) el de la URL o el del último clic guardado (`hk_origen`, 90 días con cookies aceptadas); 2) si no hay, la cookie llamada exactamente `gclid` (la guarda la etiqueta de GTM; solo se lee con cookies aceptadas); 3) si tampoco, no se envía. La URL gana sobre la cookie.
- Eventos dataLayer: `formulario_enviado` y `generate_lead` (servicio, pagina) al enviar; `call`, `whatsapp`, `agendar_click` en clics (atributo `data-ev`); `cookie_consent` (decision) al responder el aviso de cookies.
- El CRM solo acepta envíos desde `hinko.co`: en previews de Vercel el formulario muestra error.

---

## Despliegue

```bash
# Sin build step — Vercel sirve el directorio raíz directamente
git add . && git commit -m "mensaje" && git push   # dispara auto-deploy
```

El dominio `hinko.co` apunta via `A @ 76.76.21.21` a Vercel.
El software de gestión vive en `app.hinko.co` (repo hinko-ingenieria, proyecto Vercel separado).
