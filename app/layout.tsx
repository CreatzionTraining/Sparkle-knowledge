import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NewsTicker from "@/components/NewsTicker";
import RegistrationPopup from "@/components/RegistrationPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sparkle Knowledge Yard | IELTS, TOEFL, PTE & Language Training in Chennai",
  description: "Join Chennai's top-rated institute for IELTS, PTE, TOEFL, OET, GRE, GMAT, and foreign language training (German, French, Spanish). Expert coaching with 95% success rate.",
  keywords: ["IELTS coaching Chennai", "TOEFL preparation", "PTE training", "German classes", "French language course", "Study abroad consultants", "Sparkle Knowledge Yard"],
  openGraph: {
    title: "Sparkle Knowledge Yard - Master Global Exams & Languages",
    description: "Your gateway to global success. Expert coaching for IELTS, OET, PTE, and Foreign Languages in Chennai.",
    url: "https://sparkleknowledgeyard.com",
    siteName: "Sparkle Knowledge Yard",
    images: [
      {
        url: "https://sparkleknowledgeyard.com/sparkle_logo.png",
        width: 1200,
        height: 630,
        alt: "Sparkle Knowledge Yard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/sparkle_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {children}
        <RegistrationPopup />
      </body>
    </html>
  );
}
