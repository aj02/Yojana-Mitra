import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yojana Mitra — Find Indian government schemes you qualify for",
  description:
    "AI-matched welfare schemes for every Indian citizen. PMAY, PM-KISAN, Ayushman Bharat, Ladki Bahin and 900+ more — discovered in seconds from a short profile.",
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
      "Discover the central and state welfare schemes you may be eligible for in under a minute.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yojana Mitra",
    description: "Find the Indian government welfare schemes you qualify for.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}
