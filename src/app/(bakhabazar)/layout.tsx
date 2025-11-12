import type { Metadata } from "next";
import "../globals.css";

import {
    Bebas_Neue,
    Oswald,
    DM_Sans,
    Nunito_Sans,
} from "next/font/google"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Csrf from "@/components/backend/CSRF";
import { AuthProvider } from "@/context/use-auth";
import { AppSidebar } from "@/components/layout/app-sidebar";



const bebasNeue = Bebas_Neue({
    variable: "--font-bebas-neue",
    subsets: ["latin"],
    weight: "400",
})

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
})

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
})

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    subsets: ["latin"],
})

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
                <AuthProvider>

                    <SidebarProvider
                        className="h-screen w-full overflow-hidden lg:p-2"
                        defaultOpen={false}
                    >
                        <Csrf />

                        <AppSidebar className=" py-5" />

                        {children}

                    </SidebarProvider>

                </AuthProvider>
            </body>
        </html>
    );
}
