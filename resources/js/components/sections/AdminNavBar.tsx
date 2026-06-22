import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  Menu,
  X,
  ChevronDown,
  Package,
  Upload,
  FileSpreadsheet,
  User,
  LogOut,
  UserCog,
} from "lucide-react";

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(false);

  const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">
              Inventory System
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                  {/* Items Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setItemsOpen(!itemsOpen)}
                      className="
                        flex items-center gap-1
                        px-4 py-2
                        rounded-lg
                        hover:bg-gray-100
                      "
                    >
                      Items
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          itemsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                              {itemsOpen && (
                                <div
                                  className="
                                    absolute
                                    right-0
                                    mt-2
                                    w-64
                                    bg-white
                                    border
                                    rounded-xl
                                    shadow-lg
                                    z-50
                                  "
                                >
                                  <Link
                                    href="/items"
                                    className="
                                      flex items-center gap-3
                                      px-4 py-3
                                      hover:bg-gray-50
                                    "
                                  >
                                    <Package size={18} />
                                    Item Masterlist
                                  </Link>

                                  <Link
                                    href="/items/search-item"
                                    className="
                                      flex items-center gap-3
                                      px-4 py-3
                                      hover:bg-gray-50
                                    "
                                  >
                                    <Package size={18} />
                                    Search Item
                                  </Link>

                                  <Link
                                    href="/items/upload-pricelist"
                                    className="
                                      flex items-center gap-3
                                      px-4 py-3
                                      hover:bg-gray-50
                                    "
                                  >
                                    <FileSpreadsheet size={18} />
                                    Upload Item Pricelist
                                  </Link>

                                  <Link
                                    href="/items/upload"
                                    className="
                                      flex items-center gap-3
                                      px-4 py-3
                                      hover:bg-gray-50
                                    "
                                  >
                                    <Upload size={18} />
                                    Upload
                                  </Link>
                                </div>
                              )}
                            </div>

                  <Link
                    href="/sales"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Sales
                  </Link>

                  <Link
                    href="/reports"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Reports
                  </Link>

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
                                            href="/admin/logout"
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

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                className="px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                Dashboard
              </Link>

              {/* Mobile Items */}
              <button
                onClick={() => setItemsOpen(!itemsOpen)}
                className="
                  flex items-center justify-between
                  px-4 py-3
                  rounded-lg
                  hover:bg-gray-100
                "
              >
                Items
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    itemsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {itemsOpen && (
                <div className="ml-4 flex flex-col border-l">
                  <Link
                    href="/items"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Item Masterlist
                  </Link>

                  <Link
                    href="/items/search-item"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Search Item
                  </Link>

                  <Link
                    href="/items/upload-pricelist"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Upload Item Pricelist
                  </Link>

                  <Link
                    href="/items/upload"
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Upload
                  </Link>
                </div>
              )}

              <Link
                href="/sales"
                className="px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                Sales
              </Link>

              <Link
                href="/reports"
                className="px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                Reports
              </Link>

              {/* Mobile Divider */}
                        <div className="border-t border-gray-200 pt-4 flex flex-col gap-4">
                           
                            <Link
                                href="/admin/profile"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 hover:text-[#D4AF37]"
                            >
                                <User size={18} />

                                User Profile
                            </Link>

                           
                             <Link
                                href="/admin/user-maintenance"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 hover:text-[#D4AF37]"
                            >
                                <UserCog size={18} />

                                User Maintenance
                            </Link>
                          </div>
                       
                                 

               <Link
                                href="/admin/logout"
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
          </div>
        )}
      </div>
    </nav>
  );
}