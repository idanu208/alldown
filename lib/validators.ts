import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export const courseSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(3),
  description: z.string().min(10),
  isPublished: z.boolean().default(false)
});

export const progressSchema = z.object({
  lessonId: z.string().min(1),
  completed: z.boolean()
});

export const submissionSchema = z.object({
  assignmentId: z.string().min(1),
  answerText: z.string().min(10),
  answerUrl: z.string().url().optional().or(z.literal(""))
});
