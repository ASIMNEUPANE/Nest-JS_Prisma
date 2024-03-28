
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <h2>blog layout</h2>
        {children}
      
   </>
        
  );
}
