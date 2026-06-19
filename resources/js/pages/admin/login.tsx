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

    // Example:
    // router.post('/admin/login', form)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
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
  );
};

export default AdminLoginPage;