import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edusion | Tutoring, Exam Prep & Exam Support Services",
  description:
    "Edusion is your trusted partner in academic success. We provide personalized tutoring, structured exam preparation, and full end-to-end support for students in the US, UK, Canada, and New Zealand.",

  robots: "index, follow",
  openGraph: {
    title: "Edusion | Academic Tutoring & Exam Support Services",
    description:
      "Get expert tutoring, targeted exam preparation, and end-to-end academic support. Edusion helps students in the US, UK, Canada, and New Zealand excel in their studies and exams.",
    url: "https://youredusiondomain.com",
    type: "website",
    locale: "en_US",
    siteName: "Edusion",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
