import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Plus, Search, Edit, Eye,Trash2 } from "lucide-react";
import { useState } from "react";
import { Link,usePage,router } from "@inertiajs/react";
import StatusBadge from "@/components/ui/StatusBadge";

export default function GoodsReceiptList() {
  const [search, setSearch] = useState("");

  const { grDetails } = usePage().props as any;
  
  

  return (

    <AdminMainLayout><section>
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Goods Receipt
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all Generated Goods Receipt in the system
          </p>
        </div>

        <Link
          href="/admin/goods-receipts/new"
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          New Goods Receipt
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
              placeholder="Search Goods receipt..."
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

                        <th className="p-4">GR no</th>
                        <th className="p-4">P.O. Number</th>
                        <th className="p-4">Supplier</th>
                        <th className="p-4">Warehouse</th>
                        <th className="p-4">Received Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>
                {grDetails.data.length > 0 ? (
                    grDetails.data.map((gr: any) => (
                        <tr
                            key={gr.id}
                            className="border-t hover:bg-slate-50"
                        >
                            <td className="p-4">{gr.gr_number}</td>
                            <td className="p-4 font-medium">{gr.po_number}</td>
                            <td className="p-4">{gr.supplier_name}</td>
                            <td className="p-4">{gr.warehouse}</td>
                            <td className="p-4">{gr.received_date}</td>
                            <td className="p-4">
                                <StatusBadge status={gr.status} />
                            </td>
                            <td className="p-4"></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={7}
                            className="py-16 text-center text-gray-500"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-lg font-semibold">
                                    No Goods Receipts Found
                                </p>

                                <p className="text-sm text-gray-400">
                                    Create your first Goods Receipt to start receiving inventory.
                                </p>

                                <Link
                                    href="/admin/goods-receipts/new"
                                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
                                >
                                    <Plus size={18} />
                                    New Goods Receipt
                                </Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>

        </table>
                               

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden mt-6 space-y-4">

        {grDetails.data.map((gr: any) => (

          <div
            key={gr.id}
            className="bg-white rounded-2xl shadow-sm p-4"
          >

            <div className="flex gap-4">

                <div className="flex-1">

                <h3 className="font-semibold">
                  {gr.gr_number}
                </h3>

                <p className="text-sm text-gray-500">
                  {gr.po_number}
                </p>

                <p className="text-sm text-gray-500">
                  {gr.supplier_name}
                </p>

                <p className="text-sm text-gray-500">
                 {gr.warehouse}
                </p>

                <p className="text-sm text-gray-500">
                {gr.received_date}
                </p>

                <p className="text-sm text-gray-500">
                <StatusBadge status={gr.status} />
                </p>
 
              </div>

            </div>

            <div className="grid grid-cols-1 gap-2 mt-4">

             


            </div>

          </div>

        ))}

      </div>
       {/** PAGINATION */}
                                <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t">
            
                                    <p className="text-sm text-gray-500">
                                        Showing {grDetails.from} to {grDetails.to} of{" "}
                                        {grDetails.total} Goods Receipt
                                    </p>
            
                                    <div className="flex gap-2 mt-3 md:mt-0">
            
                                        {grDetails.links.map((link: any, index: number) => (
            
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