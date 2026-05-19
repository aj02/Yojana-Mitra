import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Yojana Mitra — Find Indian government schemes you qualify for",
  description:
    "A short profile reveals the central and state welfare schemes — pensions, scholarships, housing, health cover, cash transfers — you may be eligible for. Built for citizens, social workers, and panchayats.",
  applicationName: "Yojana Mitra",
  keywords: [
    "Indian government schemes",
    "Sarkari Yojana",
    "PMAY",
    "PM-KISAN",
    "Ayushman Bharat",
    "welfare schemes",
    "state schemes India",
  ],
  openGraph: {
    title: "Yojana Mitra — Find Indian government schemes you qualify for",
    description:
      "Discover the central and state welfare schemes you may be eligible for, in under a minute.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yojana Mitra",
    description:
      "Find the Indian government welfare schemes you qualify for.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
