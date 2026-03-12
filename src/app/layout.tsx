import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThreePreloader from "@/components/three/ThreePreloader";
import { CustomCursor } from "@/components/three";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subhajit Banerjee - Portfolio",
  description: "A cinematic developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          <ThreePreloader />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
