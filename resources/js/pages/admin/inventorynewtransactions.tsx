import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddTransactionPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchResults, setSearchResults] = useState([]);

    const [items, setItems] = useState<any[]>([]);


    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const addItem = (variant: any) => {

    const exists = items.some(
        (item: any) =>
            item.variant_id === variant.id
    );

    if (exists) {
        Swal.fire(
            "Already Added",
            "Variant already exists.",
            "warning"
        );

        return;
    }

    setItems([
        ...items,
        {
            variant_id: variant.id,
            sku: variant.sku,
            variant_name: variant.variant_name,
            quantity: 0,
            remarks: "",
            current_stock:
                variant.quantity_on_hand,
            new_stock:
                variant.quantity_on_hand,
        },
    ]);

    setSearch("");

    setSearchResults([]);
};


const searchVariants = async (value: string) => {
    setSearch(value);

    if (value.length < 2) {
        setSearchResults([]);
        return;
    }

    setLoading(true);

    try {
        const response = await axios.get(
            "/admin/variants/search",
            {
                params: {
                    search: value,
                },
            }
        );

        setSearchResults(response.data);
    } catch (error) {
        console.log(error);
    }

    setLoading(false);
};
    return (
        <AdminMainLayout>
            <div className="min-h-screen bg-slate-50 p-4 md:p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-3xl font-bold">
                            New Inventory Transaction
                        </h1>

                        <p className="text-gray-500">
                            Record multiple stock movements.
                        </p>
                    </div>

                    <Link
                        href="/admin/inventory-transactions"
                        className="border rounded-xl px-4 py-2 bg-white flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                </div>

                {/* Transaction Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Transaction Information
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div>
                            <label className="block mb-2 text-sm">
                                Transaction Type *
                            </label>

                            <select className="w-full border rounded-xl px-4 py-3">
                                <option>Stock In</option>
                                <option>Stock Out</option>
                                <option>Sale</option>
                                <option>Return</option>
                                <option>Damage</option>
                                <option>Adjustment</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm">
                                Reference No.
                            </label>

                            <input
                                type="text"
                                placeholder="GR-0001"
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm">
                                Reference Type
                            </label>

                            <input
                                type="text"
                                placeholder="Purchase Order"
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm">
                                Invoice No.
                            </label>

                            <input
                                type="text"
                                placeholder="INV-001"
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-sm">
                            Transaction Remarks
                        </label>

                        <textarea
                            rows={3}
                            className="w-full border rounded-xl px-4 py-3"
                            placeholder="Additional notes..."
                        />
                    </div>

                </div>

                {/* Items */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="font-semibold text-lg">
                            Transaction Items
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

                            <h2 className="font-semibold text-lg mb-4">
                                Search Product Variant
                            </h2>

                            <div className="relative">

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        searchVariants(e.target.value)
                                    }
                                    placeholder="Search SKU or Variant"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                            {searchResults.length > 0 && (

                                <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto">

                                    {searchResults.map((variant: any) => (

                                        <button
                                            key={variant.id}
                                            type="button"
                                            onClick={() => addItem(variant)}
                                            className="w-full text-left p-4 hover:bg-slate-100 border-b"
                                        >
                                            <div className="font-medium">
                                                {variant.sku}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {variant.variant_name}
                                            </div>
                                        </button>

                                    ))}

                                </div>

                            )}

                        </div>

                    {/* Desktop */}
                    <div className="hidden lg:block overflow-x-auto">
                        

                        <div className="overflow-x-auto">
                            

                            <table className="w-full">

                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3">SKU</th>
                                        <th className="text-left p-3">Variant</th>
                                        <th className="text-left p-3">Quantity</th>
                                        <th className="text-left p-3">Remarks</th>
                                        <th className="text-left p-3">Current</th>
                                        <th className="text-left p-3">New</th>
                                        <th className="text-left p-3"></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {items.map((item, index) => (

                                        <tr key={index} className="border-b">

                                            <td className="p-3">
                                                {item.sku}
                                            </td>

                                            <td className="p-3">
                                                {item.variant_name}
                                            </td>

                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const updated = [...items];

                                                        updated[index].quantity =
                                                            Number(e.target.value);

                                                        updated[index].new_stock =
                                                            transactionType === "stock_in"
                                                            ? updated[index].current_stock +
                                                            Number(e.target.value)
                                                            : updated[index].current_stock -
                                                            Number(e.target.value);

                                                        setItems(updated);
                                                    }}
                                                    className="w-24 border rounded-lg px-3 py-2"
                                                />
                                            </td>

                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.remarks}
                                                    onChange={(e) => {
                                                        const updated = [...items];

                                                        updated[index].remarks =
                                                            e.target.value;

                                                        setItems(updated);
                                                    }}
                                                    className="border rounded-lg px-3 py-2"
                                                />
                                            </td>

                                            <td className="p-3">
                                                {item.current_stock}
                                            </td>

                                            <td className="p-3 font-semibold text-sky-600">
                                                {item.new_stock}
                                            </td>

                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    className="text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden space-y-4">

                        {items.map((item, index) => (

                            <div
                                key={index}
                                className="border rounded-2xl p-4 space-y-3"
                            >

                                <input
                                    placeholder="SKU"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                                <input
                                    placeholder="Variant"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                                <input
                                    placeholder="Remarks"
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                                <div className="flex justify-between text-sm">

                                    <span>
                                        Current: 100
                                    </span>

                                    <span className="font-semibold text-sky-600">
                                        New: 150
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 text-sm"
                                >
                                    Remove Item
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">

                    <Link
                        href="/admin/inventory"
                        className="border rounded-xl px-6 py-3 text-center"
                    >
                        Cancel
                    </Link>

                    <button
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        Save Transaction
                    </button>

                </div>

            </div>
        </AdminMainLayout>
    );
}