import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Plus, Search, Edit, Eye,Trash2 } from "lucide-react";
import { useState } from "react";
import { Link,usePage,router } from "@inertiajs/react";
import StatusBadge from "@/components/ui/StatusBadge";

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

            {poDetails.data.map((po: any) => (
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
                  {po.po_date}
                </td>

                <td className="p-4">
                  {Number(po.grand_total).toLocaleString()}
                </td>

                <td className="p-4">
                  <StatusBadge status={po.status} />
                </td>

                <td className="p-4">

                 {po.first_name} {po.last_name}

                </td>

                
                <td className="p-4">

                  <div className="flex gap-2">

                    <Link 
                    href={`/admin/purchase-order/${po.id}/edit`}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-100"
                                        >
                      <Edit size={18} />
                      Edit
                    </Link>

                    <Link 
                    href={`/admin/purchase-order/${po.id}/details`}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-100"
                                        >
                      <Eye size={18} />
                      Details
                    </Link>

                    <Link 
                    href={`/admin/purchase-order/${po.id}/delete`}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-slate-100"
                                        >
                      <Trash2 size={18} />
                      Delete
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

        {poDetails.data.map((po: any) => (

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
                  {po.po_date}
                </p>

                <p className="text-sm text-gray-500">
                  {Number(po.grand_total).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  <StatusBadge status={po.status} />
                </p>

                <p className="text-sm text-gray-500">
                  {po.first_name} {po.last_name}
                </p>
 
              </div>

            </div>

            <div className="grid grid-cols-1 gap-2 mt-4">

              <Link 
                href={`/admin/purchase-order/${po.id}/edit`}
              className="bg-sky-500 text-white py-2 rounded-lg text-center">
                Edit
              </Link>

               <Link 
                href={`/admin/purchase-order/${po}/details`}
              className="bg-sky-500 text-white py-2 rounded-lg text-center">
                View Details
              </Link>

               <Link 
                href={`/admin/purchase-order/${po.id}/delete`}
              className="bg-sky-500 text-white py-2 rounded-lg text-center">
                Delete
              </Link>


            </div>

          </div>

        ))}

      </div>
       {/** PAGINATION */}
                                <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t">
            
                                    <p className="text-sm text-gray-500">
                                        Showing {poDetails.from} to {poDetails.to} of{" "}
                                        {poDetails.total} Purchase Orders
                                    </p>
            
                                    <div className="flex gap-2 mt-3 md:mt-0">
            
                                        {poDetails.links.map((link: any, index: number) => (
            
                                            <button
                                                key={index}
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.visit(link.url, {
                                                            preserveState: true,
                                                            replace: true,
                                                        });
                                                    }
                                                }}
                                                className={`px-3 py-2 rounded-lg border text-sm
                                                    ${
                                                        link.active
                                                            ? "bg-sky-600 text-white"
                                                            : "bg-white hover:bg-gray-100"
                                                    }
                                                    ${
                                                        !link.url
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }
                                                `}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
            
                                        ))}
            
                                    </div>
            
                                </div>

    </div>
    </section></AdminMainLayout>
  );
}