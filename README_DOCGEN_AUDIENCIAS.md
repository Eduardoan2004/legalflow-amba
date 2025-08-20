# LegalFlow AMBA — DocGen (DOCX/PDF) + Audiencias + ICS (Vercel)

## Qué incluye
- **Generación de documentos** (DOCX con `docx` y PDF con `pdf-lib`):
  - **Audiencia**, **Cédula** y **Edicto** → `/api/docs/generate-docx` y `/api/docs/generate-pdf` (POST con `{ kind, data }`).
- **Exportar .ICS** de audiencia → `/api/docs/audiencia-ics`.
- **Módulo de audiencias** en `/audiencias` para completar campos y descargar con un clic.
- Base con **OAuth (Google/GitHub)**, **RBAC**, **Portal de Cliente**, **Prisma+Postgres**, **S3**, **cron de recordatorios**.

## Deploy (express)
1. Subí este proyecto a **Vercel**.
2. Configurá variables (Settings → Env Vars):
   - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
   - (Opcional) `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`
   - `DATABASE_URL`
   - Seed: `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_CLIENT_EMAIL`, `SEED_CLIENT_PASSWORD`
   - SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - `TZ=America/Argentina/Buenos_Aires`
   - S3: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_REGION`, `AWS_S3_BUCKET`, (opcional) `AWS_S3_ENDPOINT`
3. Deploy. El build corre: `prisma generate && prisma migrate deploy`.
4. Inicialización: abrir `/api/seed` → `{ ok: true }`.
5. Ingresar a `/signin`. El módulo está en **/audiencias**.

## Uso de los endpoints de documentos
- **POST** `/api/docs/generate-docx`
  ```json
  { "kind": "audiencia|cedula|edicto", "data": {
    "expedienteNumero":"...","caratula":"...","fuero":"...","juzgado":"...",
    "audienciaTipo":"...","fecha":"YYYY-MM-DD","hora":"HH:MM","lugar":"...",
    "linkVirtual":"...","responsable":"...", "destinatario":"...", "domicilio":"...", "objeto":"..."
  } }
  ```
  → Devuelve un `.docx` descargable.

- **POST** `/api/docs/generate-pdf` → Igual payload, devuelve `.pdf`.

- **POST** `/api/docs/audiencia-ics` → Devuelve un `.ics` con 1h de duración.

> Los textos son **base** para celeridad operativa: adaptá párrafos a tu práctica, fuero y juzgado.
