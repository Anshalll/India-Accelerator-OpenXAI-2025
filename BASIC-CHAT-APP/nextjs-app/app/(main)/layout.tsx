

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    

  return (
    <html lang="en">
      <body

      >
        <Navbar />
        <div className="flex h-[calc(100vh-80px)] w-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
