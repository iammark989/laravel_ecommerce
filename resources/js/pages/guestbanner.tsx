import { Link } from "@inertiajs/react";
import { ShoppingBag, UserCircle2 } from "lucide-react";

export default function GuestAccountBanner() {
    return (
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 shadow-lg overflow-hidden">

            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left Content */}

                <div className="flex items-start gap-4">

                    <div className="hidden sm:flex bg-white/20 p-3 rounded-xl">
                        <UserCircle2
                            size={42}
                            className="text-white"
                        />
                    </div>

                    <div>

                        <div className="flex items-center gap-2 text-sky-100 mb-2">

                            <ShoppingBag size={18} />

                            <span className="text-sm font-medium">
                                MarkShoppingSpree
                            </span>

                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Welcome, Shopper!
                        </h2>

                        <p className="mt-2 text-sky-100 max-w-2xl">
                            Sign in to track your orders, save shipping
                            addresses, manage your cart, and enjoy a
                            faster checkout experience.
                        </p>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row gap-3">

                    <Link
                        href="/login"
                        className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-xl text-center hover:bg-sky-50 transition"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/register"
                        className="border border-white text-white font-semibold px-6 py-3 rounded-xl text-center hover:bg-white/10 transition"
                    >
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
}