import MainLayout from "@/components/layout/MainLayout";
import { Link,router } from "@inertiajs/react";
import { ShoppingBag, UserPlus } from "lucide-react";
import { useState } from "react";

export default function CustomerSignupPage() {

  const [ form,setForm ] = useState({
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      mobile: "",
      email: "",
      password: "",
      address_line: "",
      barangay: "",
      city: "",
      province: "",
      postal_code: "",
      password_confirmation:"",
  }); 

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();

    router.post('/register-customer',form,{

      onSuccess: () => {
        setForm({
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            mobile: "",
            email: "",
            password: "",
            address_line: "",
            barangay: "",
            city: "",
            province: "",
            postal_code: "",
            password_confirmation:"",
            });
      },
      onError: (error) => {
        console.log(error);
      },

    });

  }

  return (
    <MainLayout><section>
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-sky-500 to-sky-700 text-white p-12">

          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag size={42} />
            <h1 className="text-3xl font-bold">
              MarkShoppingSpree
            </h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Your Next Favorite
            <br />
            Online Store
          </h2>

          <p className="mt-6 text-sky-100">
            Create an account and enjoy secure shopping,
            order tracking, promotions, and faster checkout.
          </p>

        </div>

        {/* Right Panel */}

        <div className="p-6 md:p-10">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-sky-100 p-3 rounded-xl">
              <UserPlus
                size={24}
                className="text-sky-600"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Create Account
              </h2>

              <p className="text-gray-500">
                Register as a customer
              </p>
            </div>

          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Personal Information */}

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    First Name *
                  </label>

                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({...form, first_name: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="Jun"
                    required
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Middle Name
                  </label>

                  <input
                    type="text"
                    value={form.middle_name}
                    onChange={(e) => setForm({...form, middle_name: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="Santos"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Last Name *
                  </label>

                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm({...form, last_name: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="Dela Cruz"
                    required
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Suffix
                  </label>

                  <select
                   className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                   name="suffix"
                   value={form.suffix}
                   onChange={(e) => setForm({...form, suffix: e.target.value})}
                   >
                    <option value=""> N/A </option>
                    <option value="Sr"> Sr </option>                         
                    <option value="Jr"> Jr </option>                       
                    <option value="III"> III </option>
                   </select>                                               
                </div>

              </div>
            </div>

            {/* Contact Information */}

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">
                Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Mobile Number *
                  </label>

                  <input
                    type="text"
                    value={form.mobile}
                    onChange={(e) => setForm({...form, mobile: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="09XXXXXXXXX"
                    required
                    maxLength={25}
                  />
                </div>

              </div>
            </div>

            {/* Address */}

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">
                Shipping Address
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Address Line *
                  </label>

                  <input
                    type="text"
                    value={form.address_line}
                    onChange={(e) => setForm({...form, address_line: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="House No., Street, Subdivision"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Barangay *
                    </label>

                    <input
                      type="text"
                      value={form.barangay}
                      onChange={(e) => setForm({...form, barangay: e.target.value})}
                      className="w-full border rounded-xl px-4 py-3"
                      placeholder="Barangay"
                      required
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      City *
                    </label>

                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({...form, city: e.target.value})}
                      className="w-full border rounded-xl px-4 py-3"
                      placeholder="City"
                      required
                      maxLength={50}
                    />
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Province *
                    </label>

                    <input
                      type="text"
                      value={form.province}
                      onChange={(e) => setForm({...form, province: e.target.value})}
                      className="w-full border rounded-xl px-4 py-3"
                      placeholder="Province"
                      required
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Postal Code *
                    </label>

                    <input
                      type="text"
                      value={form.postal_code}
                      onChange={(e) => setForm({...form, postal_code: e.target.value})}
                      className="w-full border rounded-xl px-4 py-3"
                      placeholder="3000"
                      required
                      maxLength={25}
                    />
                  </div>

                </div>

              </div>
            </div>

            {/* Password */}

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">
                Security
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Password *
                  </label>

                  <input
                    type="password"
                    value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="********"
                    required
                    minLength={8}
                    maxLength={16}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Confirm Password *
                  </label>

                  <input
                    type="password"
                    value={form.password_confirmation}
                      onChange={(e) => setForm({...form, password_confirmation: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="********"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-gray-500">

              Already have an account?

              <Link
                href="/login"
                className="ml-1 text-sky-600 font-semibold hover:underline"
              >
                Sign In
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
    </section></MainLayout>
  );
}