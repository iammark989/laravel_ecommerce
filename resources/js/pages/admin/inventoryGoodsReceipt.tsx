import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2, PackageSearch } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SummaryLine from "@/components/ui/SummaryLine";

export default function GoodsReceiptPage() {
    const { purchaseOrderItems } = usePage().props as any;
    const { errors } = usePage().props;
    const [loading, setLoading] = useState(false);    

    const [ goodsReceipt, setGoodsReceipt ] = useState({
       
    });
    

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

};

    
    return (

        <AdminMainLayout>

            <section className="space-y-6">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            New Goods receipt
                        </h1>

                        <p className="text-gray-500">
                            Add goods from purchase order.
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

                {/* Supplier Information */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-5">
                        Purchase Order Information
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Goods Receipt No. <span className="text-red-500">*</span>
                            </label>

                                <input
                               // value={generated goods receipt numb er}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Warehouse
                            </label>


                          <select 
                            className="w-full border rounded-xl px-4 py-3"
                            required
                            //value={}
                            //onChange={}
                            >

                                <option value="" >Select Warehouse</option>
                               
                            </select>

                        </div>

                        <div>

                            <label className="block mb-2">
                                Delivery Date <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="date"
                                //value={}
                                //onChange={}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>
                        
                         <div className="mt-5">

                        <label className="block mb-2">
                            Remarks
                        </label>

                        <textarea
                            rows={3}
                            className="w-full border rounded-xl px-4 py-3"
                            //value={}
                            //onChange={}
                            maxLength={500}
                        />

                    </div>

                </div>
                </div>

                {/* Reference */}

                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <h2 className="font-semibold text-lg mb-5">
                        Purchase Order Information
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2">
                                Purchase Order No.
                            </label>

                                <input
                               // value={}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Reference No.
                            </label>

                            <input
                               // value={}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                    </div>

                </div>

              
                {/* Purchase Order Items */}

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
                                        Purchase Order Qty
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
                                        Received Quantity
                                    </th>

                                    <th className="p-4">
                                        Remarks
                                    </th>

                                </tr>

                            </thead>
                            
                            <tbody>

                                  {purchaseOrderItems.length === 0 ? <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <PackageSearch className="w-10 h-10 text-gray-300" />

                                            <p className="text-gray-500 font-medium">
                                                Copy list of items from purchase order
                                            </p>

                                            
                                        </div>
                                    </td>
                                </tr> : ''}

                                {purchaseOrderItems.map((item, index) => (

                                        <tr key={index}  className={`border-b ${
                                                errors[`transactionItems.${index}.quantity`]
                                                    ? "bg-red-50"
                                                    : ""
                                            }`}>

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
                                                    value={item.received_qty}
                                                    //onChange={}
                                                    className="border rounded-lg px-3 py-2"
                                                />
                                            </td>      
                                           

                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.remarks}
                                                    //onChange={(e) => {}
                                                    className="border rounded-lg px-3 py-2"
                                                    maxLength={255}
                                                />
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
                           value={`${purchaseOrderItems.length}`}
                           
                        />

                        <SummaryLine
                            label="Total Quantity"
                           value={`${purchaseOrderItems.toLocaleString()}`}                         
                        />

                        <SummaryLine
                                label="Subtotal"
                                value={`₱${purchaseOrderItems.toLocaleString()}`}
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
                                value={purchaseOrderItems.discount}
                                //onChange={}
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
                                ₱{purchaseOrderItems.toLocaleString()}
                            </span>

                        </div>

                    </div>

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
                        className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2"
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