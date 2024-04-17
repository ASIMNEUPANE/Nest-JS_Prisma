import AdminNavbar from "@/components/AdmimNavbar";
import TanstackProvider from "@/providers/TanstackProvider";
import "../globals.css";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" >
        <body className="bg-green-300ay-700" >
          <TanstackProvider>
      <AdminNavbar />
      {children }
  {/* {<Footer/>} */}
    </TanstackProvider>
          </body>
      </html>
    );
  }