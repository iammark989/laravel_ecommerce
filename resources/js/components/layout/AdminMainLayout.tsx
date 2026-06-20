import AdminNavbar from '@/components/sections/AdminNavBar';
import AdminFooter from '@/components/sections/AdminFooter';
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
import Swal from "sweetalert2";
interface LayoutProps {
    children: React.ReactNode;
}

export default function AdminMainLayout({ children }: LayoutProps) {
   // sweetalert
      const { flash } = usePage().props as any;  
     useEffect(() => {
      if (flash?.success) {
          Swal.fire({
              icon: "success",
              title: flash.success,
              timer: 2000,
              showConfirmButton: false,
          });
      }
  }, [flash?.success]);
    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <AdminNavbar />

            <main className="flex-1 pt-5">
                {children}
            </main>

            <AdminFooter />
        </div>
    );
}