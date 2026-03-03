import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelas Fullstack",
  description: "Platform belajar fullstack modern dari nol hingga deploy.",
  openGraph: {
    title: "Kelas Fullstack",
    description: "Belajar fullstack modern untuk karier developer.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
