import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jose Vincent — Photographer & Storyteller, New Zealand",
  description:
    "Portraits, events, communities and everyday moments documented with curiosity, patience and authenticity. Based in New Zealand.",
  keywords: [
    "portrait photographer New Zealand",
    "lifestyle photographer NZ",
    "community photographer",
    "documentary photographer",
    "events photographer New Zealand",
    "Jose Vincent photographer",
  ],
  openGraph: {
    title: "Jose Vincent — Photographer & Storyteller",
    description:
      "Capturing stories through people, places and moments. Documentary and lifestyle photography based in New Zealand.",
    type: "website",
    locale: "en_NZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Bodoni Moda (serif — headlines) + DM Sans (sans — UI) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
