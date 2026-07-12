import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2, PackageSearch } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SummaryLine from "@/components/ui/SummaryLine";

export default function PurchaseOrderPage() {
    const { supplierList,ponumber } = usePage().props as any;
    const [items, setItems] = useState([]);

    const today = () => {
    return new Date().toISOString().split("T")[0];
    };
    const [purchaseOrder, setPurchaseOrder] = useState({
        supplier_id: "",
        order_date: today(),
        expected_delivery: "",
        payment_terms: "",
        status:"",
        suppliers_quotation_no: "",
        reference_no: "",
        remarks: "",
        discount:"",
    });

        // ADD / REMOVE ITEMS ON THE LIST
    const [transactionItems, setTransactionItems] = useState<any[]>([]);    
            // remove item on the list
        const removeItem = (index: number) => {
            setTransactionItems(transactionItems.filter((_, i) => i !== index));
        };   
        const addItem = (variant: any) => {  
                // put selected items and check duplicate on the list 
        const exists = transactionItems.some(
            (item: any) =>
                item.product_variant_id === variant.id
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
                product_variant_id: variant.id,
                sku: variant.sku,
                variant_name: variant.variant_name,
                quantity: 0,
                cost_price: variant.cost_price,
                amount: 0,
                remarks:"",
                uom_code:variant.code,
                uom_id:variant.uom_id,
                purchasing_qty:variant.purchasing_qty,
            },
        ]);
        setSearch("");
        setSearchResults([]);
    };
        const totalQuantity = transactionItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );
    const subtotalAmount = transactionItems.reduce(
        (total, item) => total + Number(item.amount || 0),
        0
    );

    const grandTotal = subtotalAmount - Number(purchaseOrder.discount);
    

    
    
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

const { errors } = usePage().props;
const [action, setAction] = useState<"draft" | "submitted">("draft");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

        const payload = {

            ...purchaseOrder,

            transactionItems,

            action,

        };

        router.post("/admin/purchase-order/save",payload,{
            onSuccess:() =>{
                console.log('success');
            },
            onError:(errors) =>{
                console.log(errors);
            },
        });

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
                        className="border rounded-xl px-5 py-3 flex items-center gap-2 bg-white hover:bg-gray-300"
                    >
                        <ArrowLeft size={18} />

                        Back

                    </Link>

                </div>

                {/* Supplier Information */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-5">
                        Supplier Information
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Supplier <span className="text-red-500">*</span>
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
                                Order Date <span className="text-red-500">*</span>
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
                                Expected Delivery {errors.expected_delivery && (  <span className="text-red-500 text-sm mt-2"> {errors.expected_delivery} 
                                         </span>  )}
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
                                Payment Terms <span className="text-red-500">*</span>
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
                                maxLength={25}
                                minLength={2}
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
                                maxLength={50}
                                minLength={2}
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
                            maxLength={500}
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
                                        UoM
                                    </th>

                                    <th className="p-4">
                                        Cost Price
                                    </th>

                                    <th className="p-4">
                                        Amount
                                    </th>

                                    <th className="p-4">
                                        Remarks
                                    </th>

                                    <th className="p-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>
                            
                            <tbody>

                                  {transactionItems.length === 0 ? <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <PackageSearch className="w-10 h-10 text-gray-300" />

                                            <p className="text-gray-500 font-medium">
                                                No products added yet
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Search and add product variants to begin this purchase order.
                                            </p>
                                        </div>
                                    </td>
                                </tr> : ''}

                                {transactionItems.map((item, index) => (

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
                                                    maxLength={12}
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const updated = [...transactionItems];

                                                        updated[index].quantity =
                                                            Number(e.target.value);
                    
                                                        setTransactionItems(updated);
                                                        const totalamount = [...transactionItems];
                                                        totalamount[index].amount =
                                                            Number(e.target.value) * item.cost_price;                                                     
                                                        setTransactionItems(totalamount);
                                                    }}
                                                    className="w-24 border rounded-lg px-3 py-2"
                                                />
                                            </td>

                                             <td className="p-3">
                                               {item.uom_code.toUpperCase()}
                                            </td>

                                            <td className="p-3">
                                                {item.cost_price}
                                            </td>

                                            <td className="p-3">
                                                {item.amount.toLocaleString()}
                                            </td>            
                                           

                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.remarks}
                                                    onChange={(e) => {
                                                        const updated = [...transactionItems];

                                                        updated[index].remarks =
                                                            e.target.value;

                                                        setTransactionItems(updated);
                                                    }}
                                                    className="border rounded-lg px-3 py-2"
                                                    maxLength={255}
                                                />
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

                {/* Summary */}

                <div className="flex justify-end mt-8">

                <div className="w-full md:w-[420px] bg-white rounded-2xl shadow-sm border p-6">

                    <h2 className="text-lg font-semibold mb-5">
                        Financial Summary
                    </h2>

                    <div className="space-y-4">

                        <SummaryLine
                            label="Total Items"
                           value={`${transactionItems.length}`}
                           
                        />

                        <SummaryLine
                            label="Total Quantity"
                           value={`${totalQuantity.toLocaleString()}`}                         
                        />

                        <SummaryLine
                                label="Subtotal"
                                value={`₱${subtotalAmount.toLocaleString()}`}
                        />

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">
                                Discount
                            </span>
                            <input
                                type="number"
                                className="w-28 border rounded-lg px-3 py-2 text-right"
                                placeholder="0.00"
                                maxLength={12}
                                value={purchaseOrder.discount}
                                onChange={(e) => setPurchaseOrder({...purchaseOrder, discount: e.target.value})}
                            />
                        </div>

                        <SummaryLine
                            label="Tax"
                                value="₱0.00"
                        />

                        <hr />

                        <div className="flex justify-between items-center">

                            <span className="text-lg font-semibold">
                                Grand Total
                            </span>

                            <span className="text-2xl font-bold text-sky-600">
                                ₱{grandTotal.toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row justify-end gap-3">

                    <Link
                        href="/admin/purchase-orders"
                        className="border rounded-xl px-6 py-3 bg-white hover:bg-gray-300"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        onClick={() => setAction("draft")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
                    >

                        <Save size={18} />

                        Save Draft

                    </button>

                    <button
                        type='submit'
                        onClick={() => setAction("submitted")}
                        className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
                    >

                        <Send size={18} />

                        Submit Purchase Order

                    </button>

                </div>
                       </form>             
            </section>

        </AdminMainLayout>

    );

}