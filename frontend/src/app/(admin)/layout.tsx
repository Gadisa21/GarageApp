"use client";
import AdminMenu from "@/components/adminMenu/AdminMenu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Admin Sidebar */}
    <AdminMenu />

    <div className="flex flex-col flex-grow overflow-hidden">
     

      {/* Dashboard Content */}
      <main className="p-6 flex-grow overflow-auto">{children}</main>

    
    </div>
  </div>
  );
}