# Oldemar · Instrucción de Tiro

Sitio web con animaciones ligadas al scroll, formulario de inscripción y panel administrativo. Proyecto de BVA Business Solutions.

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173  (panel: /admin)
npm test         # Vitest + Testing Library
npm run build
```

## Estructura

```
src/
├── app/                 # Rutas (/ y /admin)
├── config/
│   ├── env.js           # VITE_API_URL → si está vacía, modo demo (localStorage)
│   └── content.js       # TODOS los textos, cursos, galería y contacto
├── services/httpClient.js   # fetch con timeout y errores centralizados
├── shared/              # Button, Field (inputs accesibles), Reveal, useReveal
├── styles/              # tokens.css (colores verde/negro, tipografía, espacios)
└── features/
    ├── landing/         # Hero (pin + scrub), About, Courses, Process (scroll horizontal), Gallery, Requirements, Enroll, Footer
    ├── registration/    # Formulario de 4 pasos, validación, servicio de datos
    └── admin/           # Lista, búsqueda, detalle con datos sensibles ocultos, cambio de estado
```

## Contenido pendiente

- Fotos y videos: copiarlos a `public/media/` y llenar `gallery` y `heroVideo` en `src/config/content.js`.
- Teléfono, correo, Instagram, años de experiencia y descripción de cursos reales.
- Confirmar los requisitos legales vigentes (permiso de portación, exámenes) con la autoridad competente.

## Contrato para el backend

Definir `VITE_API_URL` en `.env`. El frontend espera:

| Método | Ruta | Cuerpo / respuesta |
|---|---|---|
| POST | `/registrations` | `multipart/form-data` con todos los campos de `initialValues.js` + archivos `idDocument`, `permitDocument`. Devuelve el registro con `id`, `createdAt`, `status`. |
| GET | `/registrations` | Lista de registros. |
| GET | `/registrations/:id` | Un registro. |
| PATCH | `/registrations/:id` | `{ "status": "pendiente" \| "aprobado" \| "rechazado" }` |

Obligatorio en el backend:
- **Autenticación** en todas las rutas GET/PATCH y en `/admin`. Hoy el panel no tiene login (solo modo demo).
- Repetir la validación de `validation.js` en el servidor (edad, identificación, archivos ≤ 5 MB, PDF/JPG/PNG).
- Guardar los documentos en almacenamiento privado, nunca en una URL pública. Cifrar cédula, teléfono y notas médicas.
- Cumplir la Ley 8968 de protección de datos personales (Costa Rica).
