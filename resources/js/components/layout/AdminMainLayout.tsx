import { useState } from "react";

import AdminNavbar from "@/components/sections/AdminNavBar";
import AdminSidebar from "@/components/sections/AdminSidebar";
import AdminFooter from "@/components/sections/AdminFooter";

interface LayoutProps {
    children: React.ReactNode;
}

export default function AdminMainLayout({
    children,
}: LayoutProps) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <AdminNavbar
                onMenuClick={() => setSidebarOpen(true)}
            />

            {/* Sidebar + Content */}
            <div className="flex">

                <AdminSidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="flex-1 flex flex-col lg:ml-72">

                    <main className="flex-1 p-4 md:p-6">

                        {children}

                    </main>

                    <AdminFooter />

                </div>

            </div>

        </div>

    );

}