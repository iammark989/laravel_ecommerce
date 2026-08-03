import AdminMainLayout from "@/components/layout/AdminMainLayout";
import { Link,usePage,router } from "@inertiajs/react";
import { ArrowLeft, Save, Send, Search, Trash2, PackageSearch } from "lucide-react";
import { useState } from "react";
import PurchaseOrderModal from "@/components/modals/PurchaseOrderModal";
import axios from "axios";
import Swal from "sweetalert2";
import SummaryLine from "@/components/ui/SummaryLine";

export default function GoodsReceiptPage() {
    const { purchaseOrderItems } = usePage().props as any;
    const { errors, } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any | null>(null);
    const [ openModal,setOpenModal ] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
  const handleSelectPurchaseOrder = async (id: number) => {
    console.log(id);

    const response = await axios.get(`/api/purchase-orders/${id}/details`);

    console.log(response.data);
};

    const [ goodsReceipt, setGoodsReceipt ] = useState({
       
    });

        const loadPurchaseOrders = async () => {

        const response = await axios.get(
            "/api/search/purchase-orders",
        );

        setPurchaseOrders(response.data);

    };

    
    

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
                                    PO-20260801-00021
                                </h2>

                                <p className="text-gray-600 mt-1">
                                    ABC Foods Corporation
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
                                onClick={() => setSelectedPurchaseOrder(false)}
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

                
                 <PurchaseOrderModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onSelect={handleSelectPurchaseOrder}
                    purchaseOrders={purchaseOrders}
                />
          
             


                {/* Supplier Information */}
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
                               // value={generated goods receipt numb er}
                                readOnly
                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Warehouse <span className="text-red-500">*</span>
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