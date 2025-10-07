import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Crimson_Text, Creepster } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-medieval",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-story",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const creepster = Creepster({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Lost Tales of Arygoden",
  description: "A cinematic D&D adventure that tells the story of Railway infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${crimsonText.variable} ${creepster.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
