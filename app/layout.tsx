import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { LightningCursor } from "@/components/effects/LightningCursor";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({}),
  metadataBase: new URL("https://raichevelectric.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0E0E0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${unbounded.variable}`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="flex min-h-screen flex-col pb-20 font-sans lg:pb-0">
        <LightningCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
