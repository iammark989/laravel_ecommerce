import { Link } from "@inertiajs/react";
import {
    ShieldCheck,
    FileText,
    BookOpen,
    Code2,
} from "lucide-react";

export default function AdminFooter() {
    return (
        <footer className="bg-white border-t mt-auto">
            

            <div className="max-w-full px-6 py-5">

                <div className="flex flex-col lg:flex-row hidden md:flex justify-between gap-6">

                    {/* Left */}

                    <div>

                        <h3 className="font-semibold text-slate-800">
                            Mark Shopping Spree
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Inventory Management System
                        </p>

                        <p className="text-xs text-gray-400 mt-3">
                            Version 1.0.0
                        </p>

                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Mark Shopping Spree.
                            All rights reserved.
                        </p>

                    </div>

                    {/* Center */}

                    <div>

                        <h4 className="font-semibold text-sm mb-3">
                            Quick Links
                        </h4>

                        <div className="space-y-2">

                            <Link
                                href="/privacy-policy"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600"
                            >
                                <ShieldCheck size={16} />
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms-and-conditions"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600"
                            >
                                <FileText size={16} />
                                Terms & Conditions
                            </Link>

                            <Link
                                href="/documentation"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600"
                            >
                                <BookOpen size={16} />
                                Documentation
                            </Link>

                        </div>

                    </div>

                    {/* Right */}

                    <div>

                        <h4 className="font-semibold text-sm mb-3">
                            System Information
                        </h4>

                        <div className="space-y-1 text-sm text-gray-600">

                            <p>
                                Logged in as:
                                <span className="font-medium ml-1">
                                    Administrator
                                </span>
                            </p>

                            <p>
                                Last Login:
                                <span className="font-medium ml-1">
                                    Today 10:35 AM
                                </span>
                            </p>

                           <div className="border-t bg-slate-50 px-6 py-3 mt-5">

                            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">

                                <span>
                                    🟢 System Online
                                </span>
                                {/**
                                <span>
                                    Queue: Running
                                </span>

                                <span>
                                    Database: Connected
                                </span>

                                <span>
                                    Last Backup: Today 2:00 AM
                                </span>
                                        */}
                            </div>

                        </div>
                        </div>

                    </div>

                </div>

            </div>
          
            <div className="md:hidden flex justify-between items-center text-xs text-gray-500">

                    <span>
                        Administrator
                    </span>

                    <span>
                        © {new Date().getFullYear()}
                    </span>

                </div>

        </footer>
    );
}