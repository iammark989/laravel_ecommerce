import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PurchaseOrderPage() {

    const [items, setItems] = useState([]);

    const [purchaseOrder, setPurchaseOrder] = useState({
        supplier_id: "",
        order_date: "",
        expected_delivery: "",
        payment_terms: "",
        quotation_no: "",
        reference_no: "",
        remarks: "",
    });

    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            New Purchase Order
                        </h1>

                        <p className="text-gray-500">
                            Create a purchase order for supplier purchasing.
                        </p>

                    </div>

                    <Link
                        href="/admin/purchase-orders"
                        className="border rounded-xl px-5 py-3 flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />

                        Back

                    </Link>

                </div>

                {/* Supplier Information */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-5">
                        Supplier Information
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Supplier *
                            </label>

                            <select className="w-full border rounded-xl px-4 py-3">

                                <option>Select Supplier</option>

                            </select>

                        </div>

                        <div>

                            <label className="block mb-2">
                                Purchase Order No.
                            </label>

                            <input
                                value="PO-20260702-00001"
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Status
                            </label>

                            <input
                                value="Draft"
                                readOnly
                                className="w-full bg-yellow-100 text-yellow-700 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Order Date
                            </label>

                            <input
                                type="date"
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Expected Delivery
                            </label>

                            <input
                                type="date"
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Payment Terms
                            </label>

                            <select className="w-full border rounded-xl px-4 py-3">

                                <option>Cash</option>

                                <option>COD</option>

                                <option>Net 15</option>

                                <option>Net 30</option>

                            </select>

                        </div>

                    </div>

                </div>

                {/* Reference */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-5">
                        Reference Information
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Supplier Quotation No.
                            </label>

                            <input
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Reference No.
                            </label>

                            <input
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                    </div>

                    <div className="mt-5">

                        <label className="block mb-2">
                            Remarks
                        </label>

                        <textarea
                            rows={3}
                            className="w-full border rounded-xl px-4 py-3"
                        />

                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Add Products
                    </h2>

                    <div className="relative">

                        <Search
                            className="absolute left-4 top-3.5 text-gray-400"
                            size={18}
                        />

                        <input
                            placeholder="Search SKU or Product Variant..."
                            className="w-full border rounded-xl pl-11 pr-4 py-3"
                        />

                    </div>

                </div>

                {/* Table */}

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="p-4 text-left">
                                        SKU
                                    </th>

                                    <th className="p-4 text-left">
                                        Product Variant
                                    </th>

                                    <th className="p-4">
                                        Qty
                                    </th>

                                    <th className="p-4">
                                        Cost Price
                                    </th>

                                    <th className="p-4">
                                        Amount
                                    </th>

                                    <th className="p-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td
                                        colSpan={6}
                                        className="text-center py-10 text-gray-400"
                                    >

                                        No products added.

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Summary */}

                <div className="grid lg:grid-cols-3 gap-5">

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Total Items
                        </p>

                        <h2 className="text-3xl font-bold">
                            0
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Total Quantity
                        </p>

                        <h2 className="text-3xl font-bold">
                            0
                        </h2>

                    </div>

                    <div className="bg-sky-600 text-white rounded-2xl shadow-sm p-6">

                        <p>
                            Grand Total
                        </p>

                        <h2 className="text-3xl font-bold">
                            ₱0.00
                        </h2>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row justify-end gap-3">

                    <button
                        className="border rounded-xl px-6 py-3"
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
                    >

                        <Save size={18} />

                        Save Draft

                    </button>

                    <button
                        className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
                    >

                        <Send size={18} />

                        Submit Purchase Order

                    </button>

                </div>

            </section>

        </AdminMainLayout>

    );

}