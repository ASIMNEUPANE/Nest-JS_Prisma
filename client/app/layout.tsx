import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>
        <h2>Nav bar</h2>
        {children}
        <h2>footer</h2>
        </body>
    </html>
  );
}
