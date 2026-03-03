# Kelas Fullstack (Next.js LMS)

## Assumptions
1. Menjalankan Node.js 20+ dan PostgreSQL (lokal atau managed seperti Neon/Supabase).
2. Fokus MVP production-ready: fitur inti lengkap, UI bisa dikembangkan lanjut.
3. Bahasa UI Indonesia.
4. Upload asset saat ini lokal/public URL; S3/R2 dijelaskan pada catatan deployment.
5. Password reset disiapkan versi sederhana via endpoint placeholder (token flow bisa ditambah).
6. Optional Google OAuth aktif hanya jika env tersedia.
7. RBAC dipaksa di server route handler + middleware.
8. Blog masih sederhana (list static), mudah diperluas ke CMS.

## Rencana Implementasi Bertahap
1. Setup fondasi Next.js App Router + Tailwind + TypeScript.
2. Desain skema Prisma, migrasi, dan seed data LMS.
3. Implementasi Auth (Credentials + optional Google), RBAC, middleware, rate-limit login.
4. Implementasi public site (home, pricing, contact, blog) + SEO.
5. Implementasi dashboard Student/Instructor/Admin + halaman course/lesson.
6. Implementasi endpoint API utama: register, contact, progress, submission, admin courses.
7. Tambah test basic (Vitest) dan linting.
8. Siapkan deployment guidance Vercel + Neon/Supabase.

## Stack
- Next.js 14 App Router + TypeScript
- TailwindCSS + reusable UI components
- Prisma + PostgreSQL
- Auth.js/NextAuth (Credentials + optional Google)
- Zod + React Hook Form
- Markdown renderer: `next-mdx-remote`

## Arsitektur & Struktur Folder

```bash
app/
  api/
    auth/[...nextauth]/route.ts
    register/route.ts
    login/route.ts
    contact/route.ts
    progress/route.ts
    submissions/route.ts
    admin/courses/route.ts
  (public)/pricing/page.tsx
  (public)/contact/page.tsx
  (public)/blog/page.tsx
  (dashboard)/dashboard/*
  auth/login/page.tsx
  auth/register/page.tsx
  course/[slug]/page.tsx
  course/[slug]/lesson/[lessonId]/page.tsx
lib/
  db.ts auth/rbac/rate-limit/validators/utils
components/
  ui/ + markdown.tsx
prisma/
  schema.prisma
  seed.ts
tests/
  validators.test.ts
```

## Setup
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Environment Variables
Buat `.env`:
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="ganti-rahasia-aman"
GOOGLE_CLIENT_ID="" # optional
GOOGLE_CLIENT_SECRET="" # optional
```

## Build Production
```bash
npm run build
npm run start
```

## API Contract Ringkas
- `POST /api/register` (public) payload: `{name,email,password}`.
- `POST /api/login` (public) untuk rate-limit pre-check.
- `POST /api/contact` (public) payload: `{name,email,message}`.
- `POST /api/progress` (auth student) payload: `{lessonId,completed}`.
- `POST /api/submissions` (auth student) payload: `{assignmentId,answerText,answerUrl?}`.
- `POST /api/admin/courses` (ADMIN/INSTRUCTOR) payload: `{title,slug,description,isPublished}`.

Semua payload tervalidasi dengan Zod dan response JSON.

## Seed Data
- Admin: `admin@kelasfullstack.id / Password123!`
- Instruktur: `instruktur@kelasfullstack.id / Password123!`
- Siswa: `siswa@kelasfullstack.id / Password123!`
- 1 Course + 1 Cohort + 2 Module + beberapa lesson
- 1 Assignment + 1 Submission + 1 Announcement

## Deployment Guidance
### Vercel + Neon/Supabase
1. Push repo ke Git provider.
2. Import project ke Vercel.
3. Tambahkan env vars (`DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, optional Google OAuth).
4. Jalankan `prisma migrate deploy` pada build command/CI.
5. Generate client: `prisma generate`.

### Upload Asset
- Saat ini gunakan URL langsung (atau folder `public/uploads`).
- Untuk scale production, pindah ke S3/R2 + signed URL upload dari route handler.

## Acceptance Criteria Checklist
- [x] Public pages: Home, Pricing, Contact, Blog.
- [x] Auth credentials + optional Google, register/login/logout.
- [x] RBAC server-side + middleware proteksi.
- [x] LMS entities (Course/Cohort/Module/Lesson/Enrollment/Announcement).
- [x] Progress tracking + assignment/submission workflow.
- [x] Dashboard student/instructor/admin.
- [x] Prisma schema + seed data.
- [x] Test basic + linting commands tersedia.
- [x] SEO metadata + sitemap + robots.
