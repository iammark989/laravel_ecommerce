import { ShoppingCart, User, Menu, UserCog,LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          <div>
            <h1 className="text-2xl font-bold text-sky-500">
              MarkShoppingSpree
            </h1>
          </div>

          <div className="hidden md:flex gap-8">
            <a href="/" className="hover:text-sky-500">Home</a>
            <a href="/products" className="hover:text-sky-500">Products</a>
            <a href="/categories" className="hover:text-sky-500">Categories</a>
            <a href="#" className="hover:text-sky-500">About</a>
            <a href="#" className="hover:text-sky-500">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ShoppingCart size={22} />
            {/* Profile Dropdown */}
                            <div className="relative">

                                <button
                                    onClick={() => {
                                        setProfileOpen(!profileOpen);
                                        
                                    }}
                                    className="
                                        w-11
                                        h-11
                                        rounded-full
                                        bg-gray-100
                                        hover:bg-gray-200
                                        transition
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <User
                                        size={20}
                                        className="text-slate-700"
                                    />
                                </button>

                                {profileOpen && (
                                    <div
                                        className="
                                            absolute
                                            right-0
                                            mt-3
                                            w-52
                                            bg-white
                                            rounded-2xl
                                            shadow-lg
                                            border
                                            border-gray-100
                                            overflow-hidden
                                            z-50
                                        "
                                    >
                                        <Link
                                            href="/admin/profile"
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-4
                                                hover:bg-gray-50
                                            "
                                        >
                                            <User size={18} />
                                            User Profile
                                        </Link>
                                        
                                  
                                        <Link
                                            href="/admin/user-maintenance"
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-4
                                                hover:bg-gray-50
                                            "
                                        >
                                            <UserCog size={18} />
                                            User Maintenance
                                        </Link>
                                       

                                        <Link
                                            href="/logout-customer"
                                            method="post"
                                            as="button"
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-4
                                                text-red-600
                                                hover:bg-red-50
                                                border-t
                                            "
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </Link>
                                    </div>
                                )}

                            </div>
                         </div>            
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>

        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/categories">Categories</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <Link
                                href="/logout-customer"
                                method="post"
                                as="button"
                                className="flex items-center gap-2 text-red-600"
                            >
                                <LogOut size={18} />

                                <span className="underline">
                                    Logout
                                </span>
                            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}