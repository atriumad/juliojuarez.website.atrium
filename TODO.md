# TODO: pendientes para desplegar juliojuarez.vercel.app

Estado: SEO, accesibilidad y analítica listos en código (commits `5d86599`, `55ddc3c`). Nada de esto está en GitHub ni en Vercel todavía.
Leyenda: **[Tú]** lo haces tú · **[Cliente]** depende de Julio · **[Claude]** lo puedo hacer yo en el código.

## 1. Bloqueantes (sin esto no publicar)

- [ ] **[Tú]** `git push` a `atriumad/juliojuarez.website.atrium` y conectar el repo en Vercel (URL final `juliojuarez.vercel.app`).
- [ ] **[Cliente]** Definir el correo de Julio donde llegan las consultas (`INQUIRY_TO_EMAIL`).
- [ ] **[Tú]** Cuenta de Resend con un **dominio propio verificado** (SPF + DKIM). Con `vercel.app` no se puede enviar. Sin dominio, `INQUIRY_FROM_EMAIL` no funciona.
- [ ] **[Tú]** Variables en Vercel (Production **y** Preview): `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`. Si falta alguna, el formulario da error en producción a propósito.
- [ ] **[Cliente]** Aprobar la cita de `philosophy.quote` (se publica a nombre de Julio).
- [ ] **[Cliente]** Fotos reales: retrato (`public/julio-juarez-portrait.jpeg` es placeholder) y platos (`dish-*.jpeg` son de muestra). Al cambiarlas, quitar el texto "Sample plates shown for direction…" (`dishes.footnote`).
- [ ] **[Cliente]** Aprobar los cambios de copy míos: title, meta description, y dos frases con "private chef dining" (About y Contact).

## 2. Analítica (el sitio no mide nada hasta hacer esto)

- [ ] **[Tú]** Crear propiedad GA4 y poner el ID en Vercel: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`.
- [ ] **[Tú]** Activar **Analytics** y **Speed Insights** en el proyecto de Vercel (si no, no recogen datos).
- [ ] **[Tú]** En GA4, marcar `generate_lead` como **evento clave** (conversión).
- [ ] **[Tú]** Search Console: añadir la propiedad (método "etiqueta HTML"), guardar el token en `NEXT_PUBLIC_GSC_VERIFICATION`, y enviar `/sitemap.xml`.
- [ ] **[Cliente]** Decidir si se acepta el costo de rendimiento de GA4 (en laboratorio: móvil 85-91 → 71-83). Alternativa: no poner el ID y usar solo Vercel Analytics + Search Console.
- [ ] **[Cliente]** Si habrá público europeo o de California: política de privacidad y aviso de cookies.

## 3. Contenido y datos del negocio

- [ ] **[Cliente]** Teléfono y email públicos (`contact.details`). Al llenarlos aparecen en la página y en el JSON-LD solos.
- [ ] **[Cliente]** URL real de Instagram (`footer.instagram`) y, si existe, otras redes. Alimenta `sameAs` del schema.
- [ ] **[Cliente]** Material para una sección de FAQ (precios, capacidad, zonas, alergias). No inventar respuestas. Con eso subo el contenido (hoy ~330 palabras) y añado schema `FAQPage`.
- [ ] **[Tú]** Crear el **Google Business Profile** como negocio de área de servicio en Kansas City (es lo que más mueve el SEO local).
- [ ] **[Cliente]** Decidir el diseño final del monograma "JJ" (`src/lib/monogram.tsx`; es el favicon y apple-touch-icon).

## 4. Código pendiente

- [ ] **[Claude]** Límite de envíos por IP en el formulario (el honeypot ya existe; falta rate limit para no agotar la cuota de Resend).
- [ ] **[Claude]** Revisión de seguridad de `src/actions/inquiry.ts` (validación, inyección en cabeceras del email, filtrado de errores).
- [ ] **[Claude]** Reducir JS (~82 KiB sin usar; `motion` completo) para bajar el LCP móvil (hoy ~3.0 s; "bueno" es ≤2.5 s).

## 5. Verificación tras el primer deploy

- [ ] Enviar una consulta real y confirmar que llega el correo.
- [ ] `/robots.txt` y `/sitemap.xml` con el dominio correcto; canonical y og:url sin `.example` ni `localhost`.
- [ ] Preview de Open Graph al compartir el enlace (WhatsApp / iMessage / LinkedIn).
- [ ] En Vercel: Analytics y Speed Insights muestran visitas; en GA4 (Tiempo real) aparecen `page_view`, `section_view` y `cta_click`.
- [ ] Repetir `/seo audit` con el sitio público (ahora sí con datos reales de Search Console y CrUX).
- [ ] Reiniciar el dev server local para que tome `next.config.ts`.

## 6. Cuando exista dominio propio

- [ ] Poner el dominio en `NEXT_PUBLIC_SITE_URL` (Vercel) y redirigir `juliojuarez.vercel.app` al nuevo.
- [ ] Volver a enviar el sitemap en Search Console con la propiedad nueva.
- [ ] Actualizar el remitente de Resend si cambia el dominio.
