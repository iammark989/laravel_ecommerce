import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2, PackageSearch } from "lucide-react";
import { useState } from "react";
import PurchaseOrderModal from "@/components/modals/PurchaseOrderModal";
import axios from "axios";
import Swal from "sweetalert2";
import SummaryLine from "@/components/ui/SummaryLine";

export default function GoodsReceiptPage() {
    const { gr_number } = usePage().props as any;
    const { errors, } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any | null>(null)
    const [ openModal,setOpenModal ] = useState(false);
    const [ purchaseOrders, setPurchaseOrders ] = useState([]);
    const [ purchaseOrdersDetails, setPurchaseOrdersDetails ] = useState<any[]>([]);
    
    const handleSelectPurchaseOrder = async (id: number) => {
    const selectedPO = await axios.get(`/api/purchase-orders/${id}/details`);
    setPurchaseOrdersDetails(selectedPO.data.items);
    setSelectedPurchaseOrder(selectedPO.data.header);
    

};

    const today = () => {
    return new Date().toISOString().split("T")[0];
    };
    const [ grData, setGrData ] = useState({
        'warehouse' : "",
        'received_date': today(),
        'remarks': "",
        'received_qty' : "",
    });

        // Purchase list for modal
        const loadPurchaseOrders = async () => {
        const response = await axios.get(
            "/api/search/purchase-orders",
        );
        setPurchaseOrders(response.data);
        };

    

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

};

const formatCurrency = (value: number | string | null | undefined) => {
    if (value == null || value === "") return "";

    return Number(value).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

    
    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Goods receipt
                        </h1>

                        <p className="text-gray-500">
                            Goods receipt to post delivered items base on purchase orders.
                        </p>

                    </div>

                    <Link
                        href="/admin/goods-receipts"
                        className="border rounded-xl px-5 py-3 flex items-center gap-2 bg-white hover:bg-gray-300"
                    >
                        <ArrowLeft size={18} />

                        Back

                    </Link>

                </div>

                    {/** Copy From Purchase Order */}
                {selectedPurchaseOrder  ?
                
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                        <div className="flex flex-col lg:flex-row justify-between gap-4">

                            <div>

                                <p className="text-sm text-green-700 font-medium">
                                    Purchase Order Selected
                                </p>

                                <h2 className="text-xl font-bold">
                                    {selectedPurchaseOrder.po_number}
                                </h2>

                                <p className="text-gray-600 mt-1">
                                    {selectedPurchaseOrder.supplier}
                                </p>

                            </div>

                            <button
                                type="button"
                                className="
                                    bg-white
                                    border
                                    rounded-xl
                                    px-5
                                    py-3
                                    hover:bg-gray-100
                                "
                                onClick={() => {
                                    setSelectedPurchaseOrder(null);
                                    setPurchaseOrdersDetails([]);
                                }}
                            >
                                Change Purchase Order
                            </button>

                        </div>

                    </div>

                : 
                 <div className="bg-white rounded-2xl shadow-sm border p-6">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        <div>

                            <h2 className="text-lg font-semibold text-slate-800">
                                Purchase Order
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Select a submitted or partially received Purchase Order to copy its items.
                            </p>

                        </div>

                        <button
                            type="button"
                            className="
                                inline-flex items-center justify-center
                                gap-2
                                px-5 py-3
                                rounded-xl
                                bg-sky-600
                                text-white
                                font-medium
                                hover:bg-sky-700
                                transition
                                w-full
                                sm:w-auto
                            "
                            onClick={async () => {
                                        await loadPurchaseOrders();
                                        setOpenModal(true);
                                    }}
                        >
                            <PackageSearch size={20} />

                            Select Purchase Order
                        </button>

                    </div>

                </div>
                
                }

                {/** MODAL */}
                 <PurchaseOrderModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onSelect={handleSelectPurchaseOrder}
                    purchaseOrders={purchaseOrders}
                />


                 {/* Reference */}

                <div className="border-t mt-6 pt-4" />
                <div className="bg-white rounded-2xl shadow-sm p-6 ">

                    <h2 className="font-semibold text-lg mb-5">
                        Purchase Order Information
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Reference Number
                            </label>

                                <input
                               value={selectedPurchaseOrder?.reference_no ?? ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                         <div>

                            <label className="block mb-2">
                                Supplier's Quotation No.
                            </label>

                            <input
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                                value={selectedPurchaseOrder?.suppliers_quotation_no ?? ""}
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Order date
                            </label>

                            <input
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                                value={selectedPurchaseOrder?.order_date ?? ""}
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Expected Delivery Date
                            </label>

                                <input
                               value={selectedPurchaseOrder?.expected_delivery ?? ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Payment Terms
                            </label>

                                <input
                               value={selectedPurchaseOrder?.payment_terms ?? ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Warehouse
                            </label>

                                <input
                               value={selectedPurchaseOrder?.warehouse ?? ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                    </div>
                    <div>

                            <label className="block mb-2">
                                Note
                            </label>

                                <textarea
                               value={selectedPurchaseOrder?.po_remarks ?? ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                        <div>

                          <SummaryLine
                                label="Subtotal"
                                value={
                                    selectedPurchaseOrder
                                    ? formatCurrency(selectedPurchaseOrder.subtotal)
                                    : ""}
                            />

                            <SummaryLine
                                label="Discount"
                                value={
                                    selectedPurchaseOrder
                                    ? formatCurrency(selectedPurchaseOrder.discount)
                                    : ""}
                            />

                            <SummaryLine
                                label="Tax"
                                value={
                                    selectedPurchaseOrder
                                    ? formatCurrency(selectedPurchaseOrder.tax)
                                    : ""}
                            />

                            <SummaryLine
                                label="Grand Total"
                                value={
                                    selectedPurchaseOrder
                                    ? formatCurrency(selectedPurchaseOrder.grand_total)
                                    : ""}
                            />

                        </div>

                </div>
          
             
                {/* Goods Receipt Information */}
                <div className="border-t mt-6 pt-4" />
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    

                    <h2 className="font-semibold text-lg mb-5">
                        Goods Receipt Information
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Goods Receipt No. 
                            </label>

                                <input
                                value={gr_number}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Warehouse 
                            </label>


                           <input
                               value={
                                    selectedPurchaseOrder
                                    ? selectedPurchaseOrder.warehouse
                                    : ""}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Delivery Date <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="date"
                                value={grData.received_date}
                                onChange={(e) => setGrData({...grData, received_date: e.target.value})}
                                className="w-full border rounded-xl px-4 py-3"
                                required
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
                            value={grData.remarks}
                            onChange={(e) => setGrData({...grData, remarks: e.target.value})}
                            maxLength={500}
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
                                        Product
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
                                        Delivered Qty
                                    </th>
                                </tr>

                            </thead>
                            
                            <tbody>

                                  {purchaseOrdersDetails.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <PackageSearch className="w-10 h-10 text-gray-300" />

                                                    <p className="text-gray-500 font-medium">
                                                        No Purchase Order Selected
                                                    </p>

                                                    <p className="text-sm text-gray-400">
                                                        Select a Purchase Order to display its items.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                {purchaseOrdersDetails.map((item, index) => (

                                        <tr key={index}  className={`border-b ${
                                                errors[`transactionItems.${index}.quantity`]
                                                    ? "bg-red-50"
                                                    : ""
                                            }`}>

                                            <td className="p-3 text-right">
                                                {item.sku}
                                            </td>

                                            <td className="p-3 text-right">
                                                {item.product_name}
                                            </td>

                                            <td className="p-3 text-right">
                                                {item.variant_name}
                                            </td>

                                             <td className="p-3 text-right">
                                                {formatCurrency(item.quantity)}
                                            </td>

                                             <td className="p-3 text-right">
                                               {item.uom.toUpperCase()}
                                            </td>

                                            <td className="p-3 text-right">
                                                {formatCurrency(item.cost_price)}
                                            </td>

                                            <td className="p-3 text-right">
                                               {formatCurrency(item.amount)}
                                            </td>            
                                           

                                            <td className="p-3 text-right">
                                               {item.remaining_qty || "-"}
                                            </td>

                                            <td className="p-3 text-right">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    maxLength={12}
                                                    
                                                    value={item.received_qty}
                                                    onChange={(e) => {

                                                        const updated = [...purchaseOrdersDetails];

                                                        updated[index].received_qty = e.target.value;

                                                        setPurchaseOrdersDetails(updated);

                                                    }}
                                                    className="w-28
                                                            border
                                                            rounded-lg
                                                            px-3
                                                            py-2
                                                            text-right
                                                            focus:ring-2
                                                            focus:ring-sky-500"
                                                />
                                                {errors[`transactionItems.${index}.received_qty`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        Quantity must be greater than 0.
                                                    </p>
                                                )}
                                            </td>
                                            

                                        </tr>

                                    ))}  
                                 

                            </tbody>
                          
                        </table>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row justify-end gap-3">

                    <Link
                        href="/admin/goods-receipts"
                        className="border rounded-xl px-6 py-3 bg-white hover:bg-gray-300"
                    >
                        Cancel
                    </Link>

                    

                    <button
                        type='submit'
                        className={`
                            bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2
                            ${!selectedPurchaseOrder ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}
                            `}
                        disabled={!selectedPurchaseOrder}
                    >

                        <Send size={18} />

                        Post Goods Receipt

                    </button>

                </div>
                       </form>             
            </section>

        </AdminMainLayout>

    );

}