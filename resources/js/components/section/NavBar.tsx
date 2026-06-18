import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
            <User size={22} />
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
          </div>
        )}

      </div>
    </nav>
  );
}