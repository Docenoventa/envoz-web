# En Voz · Prototipo de mejoras

Versión de prueba de [envoz.mx](https://envoz.mx) con las mejoras del plan de diciembre de 2026.
Sirve para que el equipo y los desarrolladores vean cómo debe quedar el sitio. **No es el sitio oficial**: el código real vive en Bitbucket y corre en AWS.

## Qué incluye

| Mejora | Dónde verla |
| --- | --- |
| Página **Quiénes somos**, con secciones, principios editoriales y equipo | `quienes-somos.html` |
| Página de **Contacto** con formulario por motivo | `contacto.html` |
| Página **Anúnciate** para patrocinadores | `anunciate.html` |
| **Aviso de privacidad** (estructura; el texto final debe revisarlo un abogado) | `aviso-de-privacidad.html` |
| **Buscador** de notas (lupa del encabezado) | Todas las páginas |
| **Menú lateral** con secciones y páginas del medio | Botón ☰ |
| Recuadro de **la Mañanera en vivo** (canal oficial @ClaudiaSheinbaumP): reproduce la transmisión de lunes a viernes desde las 6:00 h con cuenta regresiva y de 7:25 a 10:30 h con el video en vivo y de 10:30 a 23:00 h con la repetición y, fuera de ese horario, muestra la próxima | Inicio de la portada |
| **Barra superior** con fecha y acceso a Quiénes somos, Contacto y Anúnciate, arriba de las secciones | Todas las páginas |
| Tres **espacios publicitarios** “Disponible para publicitar” (debajo de la mañanera, entre Agenda Pública y Estados / CDMX, y uno grande antes de Tendencias), enlazados a Anúnciate | Portada |
| Secciones nuevas de **Negocios** y **Deportes** (pestañas, bloque en portada y página propia). Mientras En Voz crea esas categorías, se arman con notas recientes filtradas por tema | `negocios.html`, `deportes.html` |
| Franja de **suscripción** a la edición diaria (WhatsApp, Telegram, correo) | Portada |
| Sección **Estados / CDMX** sin espacios vacíos | Portada |
| **Tendencias** con carrusel completo | Portada |
| Pie de página con **enlaces reales a redes** y a las páginas del medio | Todas las páginas |
| Textos alternativos, navegación con teclado y diseño para celular | Todo el sitio |

El botón **“Resaltar mejoras”** de la barra amarilla marca en rojo cada mejora (también con `?mejoras=1` en la dirección).

## Maqueta del back office: Redes por aprobar

`redes.html` muestra cómo funcionaría en el panel de En Voz la generación automática de la imagen para Instagram de cada nota publicada (diseño de En Voz: foto, logotipo, sección y título) y su aprobación antes de publicarse. Permite editar el título de la imagen, el crédito de la foto y el texto, y aprobar o descartar. Es una maqueta: no publica nada.

## Cómo funciona

- Sitio estático: HTML, CSS y JavaScript, sin instalación ni compilación.
- La portada intenta leer las notas en vivo desde la API pública de En Voz. Si el navegador no lo permite, usa la copia de `assets/data.js` (notas del 24 de noviembre de 2026).
- Al dar clic en una nota se abre en el sitio oficial.
- Los datos entre corchetes y resaltados en amarillo (correos, metas, apellidos) están pendientes de confirmar.

## Ver el prototipo

Publicado con GitHub Pages. Para verlo en tu computadora, abre `index.html` en el navegador.
