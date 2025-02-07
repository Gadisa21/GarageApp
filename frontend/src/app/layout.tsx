import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SessionProvider} from "next-auth/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import Providers from "../components/Providers";

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
        <Providers>
        <Header />
        {children}
        <Footer />
        </Providers>

        </body>
    </html>
  );
}

