import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function PurchaseOrderPage() {
    const { supplierList,ponumber } = usePage().props as any;
    const [items, setItems] = useState([]);

    const [purchaseOrder, setPurchaseOrder] = useState({
        supplier_id: "",
        order_date: "",
        expected_delivery: "",
        payment_terms: "",
        suppliers_quotation_no: "",
        reference_no: "",
        remarks: "",
    });

    const [transactionItems, setTransactionItems] = useState<any[]>([]);
    
    
            // remove item on the list
        const removeItem = (index: number) => {
            setTransactionItems(transactionItems.filter((_, i) => i !== index));
        };
    
        const addItem = (variant: any) => {
    
                // put selected items and check duplicate on the list 
        const exists = transactionItems.some(
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
    
        setTransactionItems([
            ...transactionItems,
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
    
const [loading, setLoading] = useState(false);    
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);
    // search items
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
                                Supplier <span></span>
                            </label>

                            <select 
                            className="w-full border rounded-xl px-4 py-3"
                            required
                            value={purchaseOrder.supplier_id}
                            onChange={(e) => setPurchaseOrder({...purchaseOrder, supplier_id: e.target.value})}
                            >

                                <option value="">Select Supplier</option>
                                {supplierList.map((supplier: any) => (
                                    <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                    </option>
                                        ))}
                            </select>

                        </div>

                        <div>

                            <label className="block mb-2">
                                Purchase Order No.
                            </label>

                            <input
                                value={ponumber}
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
                                value={purchaseOrder.order_date}
                                onChange={(e)=>setPurchaseOrder({...purchaseOrder,order_date:e.target.value})}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Expected Delivery
                            </label>

                            <input
                                type="date"
                                value={purchaseOrder.expected_delivery}
                                onChange={(e)=>setPurchaseOrder({...purchaseOrder,expected_delivery:e.target.value})}
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Payment Terms
                            </label>

                            <select 
                            className="w-full border rounded-xl px-4 py-3"
                            value={purchaseOrder.payment_terms}
                            onChange={(e) => setPurchaseOrder({...purchaseOrder,payment_terms:e.target.value})}
                            required
                            >
                                <option value="">Select Payment Terms</option>
                                <option value="cash">Cash</option>
                                <option value="cod">COD</option>
                                <option value="net15">Net 15</option>
                                <option value="net30">Net 30</option>

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
                                value={purchaseOrder.suppliers_quotation_no}
                                onChange={(e) => setPurchaseOrder({...purchaseOrder,suppliers_quotation_no:e.target.value})}
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Reference No.
                            </label>

                            <input
                                className="w-full border rounded-xl px-4 py-3"
                                value={purchaseOrder.reference_no}
                                onChange={(e)=>setPurchaseOrder({...purchaseOrder,reference_no:e.target.value})}
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
                            value={purchaseOrder.remarks}
                            onChange={(e)=>setPurchaseOrder({...purchaseOrder,remarks:e.target.value})}
                        />

                    </div>

                </div>

                {/* Search */}

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="font-semibold text-lg mb-4">
                            Add Products
                        </h2>

                        <div className="relative">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => searchVariants(e.target.value)}
                                placeholder="Search SKU or Variant"
                                className="w-full border rounded-xl px-4 py-3"
                            />

                            {searchResults.length > 0 && (

                                <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border rounded-xl shadow-xl max-h-72 overflow-y-auto">

                                    {searchResults.map((variant: any) => (

                                        <button
                                            key={variant.id}
                                            type="button"
                                            onClick={() => addItem(variant)}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b last:border-b-0"
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