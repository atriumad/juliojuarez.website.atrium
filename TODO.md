# Pendientes por definir: juliojuarez.vercel.app

Actualizado: 2026-09-29 · Último commit en `main`: `3bbc792`
Leyenda: **[Tú]** lo haces tú · **[Cliente]** depende de Julio · **[Claude]** lo puedo hacer yo en el código

## Resumen

| | Estado |
|---|---|
| Diseño y contenido visual | Listo: hero, About, Philosophy, galería, logos, favicon, OG, botón flotante móvil |
| SEO técnico y accesibilidad | Listo (Lighthouse móvil: SEO 100, Accesibilidad 100, Best Practices 96) |
| Analítica | Código listo; falta activar GA4, Vercel Analytics y Search Console |
| Formulario | **No puede enviar en producción** hasta configurar Resend y el email de Julio |
| Contenido que decide el cliente | Faltan datos de contacto, textos aprobados, retrato y permisos de fotos |

---

## 1. Decisiones abiertas (definir antes de publicar)

### Con el cliente (Julio)
- [ ] **[Cliente]** Email donde llegan las consultas (`INQUIRY_TO_EMAIL`).
- [ ] **[Cliente]** Teléfono, WhatsApp y/o Instagram públicos. Hoy la única vía de contacto es el formulario. Al llenar `contact.details` y `footer.instagram` aparecen solos en la página y en el schema.
- [ ] **[Cliente]** Aprobar la cita de Philosophy (`philosophy.quote`): se publica a su nombre.
- [ ] **[Cliente]** Retrato del About en alta resolución. El actual es 732×1024 px y se ve borroso. Lo ideal es el original de la chaqueta rosa, mínimo 1600×2000, sin comprimir. Al copiarlo sobre `public/images/chef/julio-juarez-portrait.jpg` no hay que tocar código.
- [ ] **[Cliente]** Permisos de las fotos: los invitados de `julio-juarez-hosting-table.jpg` y los colegas de las fotos de equipo salen identificables. Confirmar autorización de publicación y crédito o licencia del fotógrafo.
- [ ] **[Cliente]** Confirmar la selección de la galería y los textos alternativos de cada foto. Los escribí describiendo lo que se ve, incluyendo ingredientes inferidos (por ejemplo "herb-crusted rack of lamb", "red cabbage"). Las dos fotos sin usar son `charcuterie-board` y `table-spread-overview`.
- [ ] **[Cliente]** Aprobar mis cambios de copy: title, meta description, eyebrow "Private Chef · Kansas City" en el H1, texto de placeholders del formulario.
- [ ] **[Cliente]** Tiempo de respuesta real para mostrarlo bajo el botón del formulario (`contact.form.responseNote`, hoy `null` y oculto). Ejemplo: "within 48 hours".
- [ ] **[Cliente]** Material para FAQ y "cómo funciona": precios o rangos, capacidad, zonas, alergias, qué incluye. No se inventan respuestas. Con eso también subo el contenido (hoy ~330 palabras) y añado schema `FAQPage`.
- [ ] **[Cliente]** Prueba social con permiso: reseñas, prensa, logos (Ocean Prime, Cameron Mitchell).
- [ ] **[Cliente]** Si habrá público europeo o de California: política de privacidad y aviso de cookies. El formulario ya recoge email y teléfono.

### De diseño (conmigo)
- [ ] **[Tú]** ¿Firma con el monograma en Philosophy en lugar del texto "Julio Juarez" bajo la cita? Propuesto, no hecho. Decidido: el título del hero se queda como texto, no como logo.
- [ ] **[Tú]** Uso futuro de la versión dorada y la insignia circular del set de logos (hoy sin usar; guardadas en `src/assets/brand/`).
- [ ] **[Tú]** Qué hacer con las 2 fotos sin usar (2.9 MB en `public/`): usarlas en la galería o borrarlas.

---

## 2. Bloqueantes técnicos para que el formulario funcione

- [ ] **[Tú]** Confirmar que el repo `atriumad/juliojuarez.website.atrium` está conectado en Vercel (URL final `juliojuarez.vercel.app`). El código ya está en GitHub.
- [ ] **[Tú]** Cuenta de Resend con **un** dominio verificado como remitente (SPF + DKIM). Sirve el de la agencia, idealmente un subdominio (`mail.tudominio.com`): el destinatario (el correo de Julio) no necesita verificación ni ser del mismo dominio. Plan gratis: 3 dominios, 3,000 correos/mes, 100/día. Sin dominio solo funciona `onboarding@resend.dev`, y únicamente hacia el correo de tu propia cuenta (vale para probar, no para producción). Cuando Julio tenga dominio propio, basta cambiar `INQUIRY_FROM_EMAIL`.
- [ ] **[Tú]** Variables en Vercel (Production y Preview): `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`. Si falta alguna, el formulario da error en producción a propósito, para no perder consultas en silencio.
- [ ] **[Tú]** Enviar una consulta real y confirmar que llega el correo, con los campos nuevos (invitados y lugar).

## 3. Analítica (el sitio no mide nada hasta hacer esto)

- [ ] **[Tú]** Crear propiedad GA4 y poner `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` en Vercel.
- [ ] **[Tú]** Activar Analytics y Speed Insights en el proyecto de Vercel.
- [ ] **[Tú]** En GA4, marcar `generate_lead` como evento clave (conversión).
- [ ] **[Tú]** Search Console: añadir la propiedad (método "etiqueta HTML"), guardar el token en `NEXT_PUBLIC_GSC_VERIFICATION` y enviar `/sitemap.xml`.
- [ ] **[Cliente]** Decidir si acepta el costo de rendimiento de GA4 en laboratorio (móvil 85-91 → 71-83). Alternativa: no poner el ID y usar solo Vercel Analytics + Search Console.
- [ ] **[Tú]** Cuando haya datos, comparar `cta_click` de `location=floating` contra `location=hero` para medir el botón flotante. Otros eventos ya medidos: `gallery_open`, `section_view`, `generate_lead`.

## 4. SEO y presencia

- [ ] **[Tú]** Dominio propio. `juliojuarez.vercel.app` es un subdominio compartido sin autoridad: es el mayor límite para posicionar. Al tenerlo: poner `NEXT_PUBLIC_SITE_URL`, redirigir el dominio de Vercel, reenviar el sitemap en Search Console y actualizar el remitente de Resend.
- [ ] **[Tú]** Google Business Profile como negocio de área de servicio en Kansas City (lo que más mueve el SEO local).
- [ ] **[Cliente]** URL de Instagram y otras redes: alimentan `sameAs` del JSON-LD.
- [ ] **[Claude]** Con el contenido del FAQ: sección nueva, schema `FAQPage` y, si hace falta, páginas por ocasión (aniversario, cumpleaños, cena en casa).

## 5. Código pendiente

- [ ] **[Tú]** Regla de rate limit en Vercel Firewall (POST a `/`, por ejemplo 10 por hora por IP). El límite del código es solo de mejor esfuerzo: en serverless cada instancia cuenta por separado, así que no es una garantía por sí solo.
- [ ] **[Claude]** Reducir JS (~82 KiB sin usar; `motion` completo) para bajar el LCP móvil, que en una medición previa estaba cerca de 3.0 s con GA4 (el objetivo es ≤2.5 s).
- [ ] **[Tú]** Probar en un teléfono real: fluidez de la galería, botón flotante y lightbox. En emulación no se ve el problema real de fluidez.
- [ ] **[Claude]** Si la galería sigue entrecortada: pre-generar las versiones B/N de las fotos para quitar el `filter` CSS.
- [ ] **[Claude]** Opcional: tamaño de `public/` (16 MB); las originales de 1 MB se sirven optimizadas, pero pesan en el repo.

## 6. Verificación tras el primer deploy

- [ ] Enviar una consulta real y confirmar que llega el correo.
- [ ] `/robots.txt` y `/sitemap.xml` con el dominio correcto; canonical y `og:url` sin `localhost`.
- [ ] Preview de Open Graph al compartir el enlace (WhatsApp, iMessage, LinkedIn). WhatsApp y LinkedIn cachean la imagen: el primer enlace que compartas es el que se guarda.
- [ ] Favicon y apple-touch-icon en la pestaña y al añadir a pantalla de inicio.
- [ ] En Vercel: Analytics y Speed Insights muestran visitas; en GA4 (Tiempo real) aparecen `page_view`, `section_view` y `cta_click`.
- [ ] Repetir `/seo audit` con el sitio público (ahora con datos reales de Search Console y CrUX).

---

## Ya resuelto (referencia)

- Formulario endurecido: límite de 5 consultas por hora por cliente (mejor esfuerzo, en memoria), trampa de velocidad (menos de 2 s se trata como bot, igual que el honeypot), campos de una sola línea sin caracteres de control ni Unicode bidireccional (no pueden añadir líneas al asunto ni al cuerpo del correo), email limitado a 254 caracteres. Probado con 13 pruebas de lógica y en el navegador (5 envíos pasan, el sexto se bloquea).

- Fotos organizadas en `public/images/{hero,chef,kitchen,dishes}` con nombres descriptivos.
- Sección Dishes reemplazada por galería B/N con color al centro, lightbox y deriva con el scroll; orden: About → Philosophy → Galería → Contact.
- Logos: monograma en el nav, horizontal en el footer, favicon y apple icon; set completo en `src/assets/brand/`.
- Imagen OG y Twitter: logo horizontal centrado sobre fondo claro (JPEG estático, 36 KB).
- H1 con "Private Chef · Kansas City", `image` en el JSON-LD, caché de imágenes de 30 días con AVIF.
- Formulario con campos de invitados y lugar; fecha con ejemplo con año.
- Botón flotante "Book a Dinner" solo en móvil.
- Galería nativa en compositor con respaldo por JS y DOM reducido en móvil.
