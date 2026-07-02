import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Menu,
    Bell,
    UserCircle,
    ChevronDown,
    Settings,
    Users,
    LogOut,
} from "lucide-react";

interface Props {
    onMenuClick: () => void;
}

export default function AdminNavbar({
    onMenuClick,
}: Props) {
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <header className="sticky top-0 z-40 h-16 bg-white border-b shadow-sm">

            <div className="h-full px-6 flex items-center justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                    {/* Mobile Sidebar Button */}

                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Logo */}

                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />

                    <div>

                        <h1 className="font-bold text-lg text-slate-800">
                            Mark Shopping Spree
                        </h1>

                        <p className="text-xs text-gray-500">
                            Inventory Management System
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-4">

                    {/* Notification */}

                    <button
                        className="relative p-2 rounded-xl hover:bg-gray-100"
                    >
                        <Bell size={22} />

                        <span
                            className="
                                absolute
                                top-1
                                right-1
                                w-2.5
                                h-2.5
                                rounded-full
                                bg-red-500
                            "
                        />

                    </button>

                    {/* Profile */}

                    <div className="relative">

                        <button
                            onClick={() =>
                                setOpenProfile(!openProfile)
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-2
                                py-1
                                hover:bg-gray-100
                            "
                        >

                            <UserCircle
                                size={36}
                                className="text-slate-600"
                            />

                            <div className="hidden md:block text-left">

                                <p className="font-semibold text-sm">
                                    Mark Arvin
                                </p>

                                <p className="text-xs text-gray-500">
                                    Administrator
                                </p>

                            </div>

                            <ChevronDown size={18} />

                        </button>

                        {/* Dropdown */}

                        {openProfile && (

                            <div
                                className="
                                    absolute
                                    right-0
                                    mt-3
                                    w-60
                                    rounded-2xl
                                    border
                                    bg-white
                                    shadow-xl
                                    overflow-hidden
                                "
                            >

                                <div className="border-b p-4">

                                    <p className="font-semibold">
                                        Mark Arvin
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Administrator
                                    </p>

                                </div>

                                <Link
                                    href="/admin/profile"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        hover:bg-gray-100
                                    "
                                >
                                    <UserCircle size={18} />

                                    User Profile

                                </Link>

                                <Link
                                    href="/admin/users"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        hover:bg-gray-100
                                    "
                                >
                                    <Users size={18} />

                                    User Maintenance

                                </Link>

                                <Link
                                    href="/admin/settings/company"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        hover:bg-gray-100
                                    "
                                >
                                    <Settings size={18} />

                                    Company Settings

                                </Link>

                                <div className="border-t">

                                    <Link
                                        href="/admin/logout"
                                        method="post"
                                        as="button"
                                        className="
                                            w-full
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-3
                                            text-red-600
                                            hover:bg-red-50
                                        "
                                    >
                                        <LogOut size={18} />

                                        Logout

                                    </Link>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
}