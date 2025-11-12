import type { Metadata } from "next";
import "../globals.css";

import {
    Bebas_Neue,
    Oswald,
    DM_Sans,
    Nunito_Sans,
} from "next/font/google"

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
