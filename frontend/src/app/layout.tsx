import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Garage App",
  description: "Garage App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <SessionProvider >
        <Header />
        {children}
        <Footer />
        </SessionProvider>
        </body>
    </html>
  );
}
