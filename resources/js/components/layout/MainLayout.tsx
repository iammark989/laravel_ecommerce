import Navbar from '@/components/sections/NavBar'
import Footer from '@/components/sections/Footer'
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
//import Swal from "sweetalert2";
interface LayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  //sweetalert
    //  const { flash } = usePage().props as any;  
   //  useEffect(() => {
    //  if (flash?.success) {
    //      Swal.fire({
    //          icon: "success",
    //          title: flash.success,
//timer: 2000,
     //         showConfirmButton: false,
      //    });
    //  }
 // }, [flash?.success]);
    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <Navbar />

            <main className="flex-1 pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
}