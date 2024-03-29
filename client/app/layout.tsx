import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Blog Application",
  description: "Its a full stack app build on next js && nest js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-green-300ay-700" >
    <Navbar />
    {children }
{/* {<Footer/>} */}
        </body>
    </html>
  );
}
