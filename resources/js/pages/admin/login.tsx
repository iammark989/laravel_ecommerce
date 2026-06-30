import React, { useState } from "react";
import {router} from "@inertiajs/react";

const AdminLoginPage: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errorMsg,setErrorMsg ] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post("/admin/loginattempt",form,{
    onError: (errors) => {
      setErrorMsg(errors.errormsg);
      
      //console.error(errors);
    },
    onSuccess: () => {
       setForm({
        username: "",
        password: "",
      });
    },

    });

    
    
  };

  return (

    <div className="min-h-screen flex bg-slate-100">

    {/* Left */}
    <div className="hidden lg:flex lg:w-1/2 relative">
      {/**
        <img
            src="/images/admin-login.jpg"
            className="absolute inset-0 h-full w-full object-cover"
        /> */}

        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
            <h1 className="text-5xl font-bold">
                Mark Shopping Spree
            </h1>

            <p className="mt-6 text-xl">
                Manage your inventory, products,
                and orders efficiently.
            </p>
        </div>
    </div>

    {/* Right */}
    <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          
                      {/* Login Form */}
             <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-500 mt-2">
            Please login to continue
          </p>
          {errorMsg && (
              <div className="text-red-500 text-sm mt-2">
                {errorMsg}
              </div>
            )}

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Login
          </button>
        </form>
        </div>

    </div>
<div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-blue-300 opacity-20 animate-bounce" />

          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-300 opacity-20 animate-pulse" />

          <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-sky-300 opacity-20 animate-ping" />
          </div>
</div>

 
  );
};

export default AdminLoginPage;