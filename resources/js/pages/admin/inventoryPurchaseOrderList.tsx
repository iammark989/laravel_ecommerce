import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Plus, Search, Edit, Eye } from "lucide-react";
import { useState } from "react";
import { Link,usePage } from "@inertiajs/react";

export default function PuchaseOrderList() {
  const [search, setSearch] = useState("");

  const { poDetails } = usePage().props as any;

  

  return (

    <AdminMainLayout><section>
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Purchase Order List
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all Generated Purchase orders in the system
          </p>
        </div>

        <Link
          href="/admin/purchase-order/new"
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          New Purchase Order
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
              placeholder="Search Purchase order..."
              className="w-full pl-10 border rounded-xl px-4 py-3"
            />

          </div>

        </div>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="p-4">Supplier</th>
              <th className="p-4">P.O. Number</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created By</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {poDetails.map((po: any) => (
              <tr
                key={po.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  {po.supplier_name}
                </td>

                <td className="p-4 font-medium">
                  {po.po_number}
                </td>

                <td className="p-4">
                  {po.oder_date}
                </td>

                <td className="p-4">
                  {po.grand_total}
                </td>

                <td className="p-4">
                  {po.status}
                </td>

                <td className="p-4">

                 {po.created_by}

                </td>

                
                <td className="p-4">

                  <div className="flex gap-2">

                    <Link 
                    href={`/admin/product/${poDetails.id}/details`}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-100"
                                        >
                      <Eye size={18} />
                      Details
                    </Link>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden mt-6 space-y-4">

        {poDetails.map((po: any) => (

          <div
            key={po.id}
            className="bg-white rounded-2xl shadow-sm p-4"
          >

            <div className="flex gap-4">

                <div className="flex-1">

                <h3 className="font-semibold">
                  {po.supplier_name}
                </h3>

                <p className="text-sm text-gray-500">
                  {po.po_number}
                </p>

                <p className="text-sm text-gray-500">
                  {po.oder_date}
                </p>

                <p className="text-sm text-gray-500">
                  {po.total_amount}
                </p>

                <p className="text-sm text-gray-500">
                   {po.status}
                </p>

                <p className="text-sm text-gray-500">
                  {po.created_by}
                </p>
 
              </div>

            </div>

            <div className="grid grid-cols-1 gap-2 mt-4">

              <Link 
                href={`/admin/product/${poDetails.id}/details`}
              className="bg-sky-500 text-white py-2 rounded-lg text-center">
                View Details
              </Link>


            </div>

          </div>

        ))}

      </div>

    </div>
    </section></AdminMainLayout>
  );
}