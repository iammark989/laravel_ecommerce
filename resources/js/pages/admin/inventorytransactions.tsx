import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link } from "@inertiajs/react";
import { Plus, Search } from "lucide-react";

export default function InventoryTransactionPage() {
    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Inventory Transactions
                        </h1>

                        <p className="text-gray-500">
                            Monitor all stock movements.
                        </p>
                    </div>

                    <Link 
                        href="/admin/inventory-transactions/new-transaction"
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl">
                        <Plus size={18} />
                        New Transaction
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-gray-500">
                            Stock In Today
                        </p>

                        <h2 className="text-3xl font-bold text-green-600">
                            150
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-gray-500">
                            Stock Out Today
                        </p>

                        <h2 className="text-3xl font-bold text-red-600">
                            45
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-gray-500">
                            Transactions Today
                        </p>

                        <h2 className="text-3xl font-bold text-sky-600">
                            18
                        </h2>
                    </div>

                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-3.5 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search reference, variant..."
                            className="w-full border rounded-xl pl-10 pr-4 py-3"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">

                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left text-gray-500">
                                <th className="p-4">
                                    Reference
                                </th>

                                <th className="p-4">
                                    Variant
                                </th>

                                <th className="p-4">
                                    Type
                                </th>

                                <th className="p-4">
                                    Qty
                                </th>

                                <th className="p-4">
                                    Date
                                </th>

                                <th className="p-4">
                                    User
                                </th>

                                <th className="p-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4">
                                    GR-0001
                                </td>

                                <td className="p-4">
                                    Coca Cola 330ml
                                </td>

                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                        Stock In
                                    </span>
                                </td>

                                <td className="p-4 font-medium text-green-600">
                                    +100
                                </td>

                                <td className="p-4">
                                    Jun 30, 2026
                                </td>

                                <td className="p-4">
                                    Admin
                                </td>

                                <td className="p-4">
                                    View
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        </AdminMainLayout>
    );
}