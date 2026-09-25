import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLANK — A new frame of mind",
  description: "Meet BLANK 1O. Refined professional AR glasses. Join the waitlist for a new perspective on computing.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
