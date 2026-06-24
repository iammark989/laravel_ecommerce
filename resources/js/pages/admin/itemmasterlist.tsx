import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link,usePage } from "@inertiajs/react";

export default function ProductMasterlist() {
  const [search, setSearch] = useState("");

  const { products } = usePage().props as any;

  

  return (

    <AdminMainLayout><section>
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Item Masterlist
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all products available in the system
          </p>
        </div>

        <Link
          href="/admin/product/create"
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Product
        </Link>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl shadow-sm p-5 mt-6">

        <div className="grid lg:grid-cols-4 gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search Product..."
              className="w-full pl-10 border rounded-xl px-4 py-3"
            />

          </div>

          <select className="border rounded-xl px-4 py-3">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Footwear</option>
            <option>Canned Goods</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>All Brands</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Variants</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created By</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product: any) => (
              <tr
                key={product.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  <img
                    src={product.featured_image}
                    alt=""
                    className="w-14 h-14 rounded-lg"
                  />
                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category_id}
                </td>

                <td className="p-4">
                  {product.brand_id}
                </td>

                <td className="p-4">
                  {product.variants}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.status
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td className="p-4">
                  {product.createdBy}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 bg-red-100 text-red-600 rounded-lg">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden mt-6 space-y-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm p-4"
          >

            <div className="flex gap-4">

              <img
                src={product.image}
                alt=""
                className="w-20 h-20 rounded-lg"
              />

              <div className="flex-1">

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <p className="text-sm text-gray-500">
                  {product.brand}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                    product.status
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">

              <button className="bg-sky-500 text-white py-2 rounded-lg">
                Edit
              </button>

              <button className="bg-red-500 text-white py-2 rounded-lg">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
    </section></AdminMainLayout>
  );
}