'use client';

import { usePathname } from 'next/navigation';
import RegistrationPopup from "@/components/RegistrationPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Don't show popup on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdminPage && <RegistrationPopup />}
    </>
  );
}
