import bcrypt from "bcryptjs";
import { PrismaClient, Role, CohortStatus, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const [admin, instructor, student] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@kelasfullstack.id" },
      update: {},
      create: { name: "Admin", email: "admin@kelasfullstack.id", role: Role.ADMIN, passwordHash }
    }),
    prisma.user.upsert({
      where: { email: "instruktur@kelasfullstack.id" },
      update: {},
      create: { name: "Instruktur", email: "instruktur@kelasfullstack.id", role: Role.INSTRUCTOR, passwordHash }
    }),
    prisma.user.upsert({
      where: { email: "siswa@kelasfullstack.id" },
      update: {},
      create: { name: "Siswa", email: "siswa@kelasfullstack.id", role: Role.STUDENT, passwordHash }
    })
  ]);

  const course = await prisma.course.upsert({
    where: { slug: "fullstack-javascript" },
    update: {},
    create: {
      title: "Kelas Fullstack JavaScript",
      slug: "fullstack-javascript",
      description: "Belajar Node.js, React, Next.js, dan deployment end-to-end.",
      isPublished: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    }
  });

  const cohort = await prisma.cohort.create({
    data: {
      courseId: course.id,
      name: "Cohort Januari 2026",
      startDate: new Date("2026-01-10"),
      endDate: new Date("2026-03-30"),
      status: CohortStatus.ONGOING,
      communityLink: "https://discord.gg/kelasfullstack",
      schedule: "Selasa & Kamis 19:30 WIB",
      instructorId: instructor.id
    }
  });

  await prisma.enrollment.upsert({
    where: { userId_cohortId: { userId: student.id, cohortId: cohort.id } },
    update: {},
    create: { userId: student.id, cohortId: cohort.id }
  });

  const moduleDasar = await prisma.module.create({
    data: { courseId: course.id, title: "Dasar-Dasar", order: 1 }
  });
  const moduleLanjutan = await prisma.module.create({
    data: { courseId: course.id, title: "Project Akhir", order: 2 }
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: moduleDasar.id,
      title: "Intro Fullstack Workflow",
      contentMarkdown: "# Intro\nMemahami alur kerja developer fullstack modern.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      order: 1,
      isFreePreview: true
    }
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: moduleDasar.id,
        title: "TypeScript untuk Backend",
        contentMarkdown: "Gunakan TypeScript strict mode.",
        order: 2,
        isFreePreview: false
      },
      {
        moduleId: moduleLanjutan.id,
        title: "Capstone: LMS App",
        contentMarkdown: "Bangun LMS production-ready.",
        order: 1,
        isFreePreview: false
      }
    ]
  });

  const assignment = await prisma.assignment.create({
    data: {
      lessonId: lesson1.id,
      title: "Ringkas Arsitektur Monorepo",
      instructionsMarkdown: "Tuliskan ringkasan arsitektur dan alasan pemilihan stack.",
      dueDate: new Date("2026-02-01")
    }
  });

  await prisma.submission.create({
    data: {
      assignmentId: assignment.id,
      userId: student.id,
      answerText: "Saya memilih Next.js App Router + Prisma untuk konsistensi fullstack.",
      answerUrl: "https://gist.github.com/example",
      status: SubmissionStatus.PENDING
    }
  });

  await prisma.announcement.create({
    data: {
      cohortId: cohort.id,
      title: "Welcome Cohort",
      content: "Selamat datang! Pastikan setup dev environment selesai minggu ini."
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
