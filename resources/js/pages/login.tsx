import MainLayout from "@/components/layout/MainLayout";
import { Link,router } from "@inertiajs/react";
import { ShoppingBag, LogIn } from "lucide-react";
import { useState } from "react";

export default function CustomerSignInPage() {

const [ form, setForm ] = useState({
    email: "",
    password: "",
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  router.post('/login-customer',form,{

      onSuccess:()=>{
        
      },
      onError: (error) => {
       
      },

  });

}

  return (
    <MainLayout><section>
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-sky-500 to-sky-700 text-white p-12">

          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag size={42} />
            <h1 className="text-3xl font-bold">
              MarkShoppingSpree
            </h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Welcome Back!
          </h2>

          <p className="mt-6 text-sky-100">
            Sign in to access your account,
            track your orders, manage addresses,
            and continue shopping.
          </p>

          <div className="mt-10 space-y-4 text-sky-100">

            <div>
              ✓ Secure Checkout
            </div>

            <div>
              ✓ Order Tracking
            </div>

            <div>
              ✓ Saved Shipping Addresses
            </div>

            <div>
              ✓ Exclusive Promotions
            </div>

          </div>

        </div>

        {/* Right Panel */}

        <div className="flex items-center justify-center p-6 md:p-10">

          <div className="w-full max-w-md">

            <div className="text-center mb-8">

              <div className="inline-flex items-center justify-center bg-sky-100 p-4 rounded-2xl mb-4">

                <LogIn
                  size={28}
                  className="text-sky-600"
                />

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                Sign In
              </h2>

              <p className="text-gray-500 mt-2">
                Access your MarkShoppingSpree account
              </p>

            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Email */}

              <div>

                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                  maxLength={50}
                />

              </div>

              {/* Password */}

              <div>

                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="********"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  maxLength={16}
                  minLength={8}
                />

              </div>

              {/* Forgot Password */}

              <div className="flex justify-end">

                <Link
                  href="/forgot-password"
                  className="text-sm text-sky-600 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Sign In
              </button>

              {/* Divider */}

              <div className="flex items-center gap-3">

                <div className="flex-1 h-px bg-gray-200"></div>

                <span className="text-sm text-gray-400">
                  OR
                </span>

                <div className="flex-1 h-px bg-gray-200"></div>

              </div>

              {/* Register */}

              <div className="text-center text-sm text-gray-500">

                Don't have an account?

                <Link
                  href="/register"
                  className="ml-1 text-sky-600 font-semibold hover:underline"
                >
                  Create Account
                </Link>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

    </section></MainLayout>
  );
}