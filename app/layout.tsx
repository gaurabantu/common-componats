import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Common Components Login",
  description: "A Next.js login page built from the common component library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
