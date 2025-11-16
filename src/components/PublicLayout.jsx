"use client";

import { usePathname } from "next/navigation";
import Header from "@/pages/Header/Header";
import Footer from "@/pages/Footer/Footer";

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Don't render Header/Footer for admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Render Header/Footer for public routes
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

