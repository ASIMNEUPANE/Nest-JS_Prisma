import AdminNavbar from "@/components/AdmimNavbar";
import TanstackProvider from "@/providers/TanstackProvider";
import "../globals.css";
import { AdminRoute, PrivateRoute } from "@/components/Routes";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" >
        <body className="bg-green-300ay-700" >
          <TanstackProvider>
          <AdminRoute role="ADMIN">
      <AdminNavbar />
      {children }
  {/* {<Footer/>} */}
    </AdminRoute>
    </TanstackProvider>
          </body>
      </html>
    );
  }