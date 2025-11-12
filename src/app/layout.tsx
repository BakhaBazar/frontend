import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "BakhaBazar",
    description: "AI Generated Podcasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
