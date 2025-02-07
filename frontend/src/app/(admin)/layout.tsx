"use client";
import AdminMenu from "@/components/adminMenu/AdminMenu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="md:flex">
        <AdminMenu />
        <main className="flex-grow">{children}</main>
      </div>
  );
}