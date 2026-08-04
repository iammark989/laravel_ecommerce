import { Search, X, PackageSearch } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../ui/StatusBadge";


interface PurchaseOrderModalProps {

    open: boolean;

    onClose: () => void;

    onSelect: (id: number) => void;

    purchaseOrders: PurchaseOrder[];

}

export default function PurchaseOrderModal({open,onClose,onSelect,purchaseOrders}:PurchaseOrderModalProps){
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  const sortedPurchaseOrders = [...purchaseOrders].sort((a, b) => {

    return b.id - a.id;

});




  const filteredPurchaseOrders = sortedPurchaseOrders.filter((po) => {
      const keyword = search.toLowerCase();
      return (
          po.po_number.toLowerCase().includes(keyword) ||
          po.supplier_name.toLowerCase().includes(keyword) ||
          po.status.toLowerCase().includes(keyword)
      );

    });

   if (!open) return null;
return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
        <div className="bg-white rounded-2xl w-full max-w-5xl p-6">
          
          <div className="flex items-center justify-between border-b pb-4">

              <div className="sticky top-0 bg-white z-10 pb-4">

                  <h2 className="text-2xl font-bold">
                      Select Purchase Order
                  </h2>

                  <p className="text-gray-500 mt-1">
                      Select a submitted or partially received purchase order.
                  </p>

              </div>

              <button
                  onClick={onClose}
                  className="rounded-lg p-2 hover:bg-gray-100"
              >
                  <X size={20}/>
              </button>

          </div>

          {/** Search */}
           

           <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"

                    />

                    <input
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder="Search PO Number or Supplier..."
                        className="w-full rounded-xl border pl-10 px-4 py-3"
                        autoFocus
                    />

                </div>

                <select
                    className="border rounded-xl px-4 py-3"
                    value={statusFilter}
                    onChange={(e)=>setStatusFilter(e.target.value)}
                >

                    <option value="">
                        All Available
                    </option>

                    <option value="submitted">
                        Submitted
                    </option>

                    <option value="partially_received">
                        Partially Received
                    </option>

                </select>

            </div>

           
           {/** SEARCH PURCHASE ORDER */}
          {filteredPurchaseOrders.length === 0 ?
          <div className="py-16 flex flex-col items-center">

              <PackageSearch
                  size={48}
                  className="text-gray-300"
              />

              <h3 className="font-semibold mt-4">

                  No Purchase Orders Found

              </h3>

              <p className="text-gray-500 mt-2">

                  There are no submitted purchase orders available.

              </p>

          </div>
          :
           <div className="space-y-4 mt-6 max-h-[420px] overflow-y-auto">

              {filteredPurchaseOrders.map((po)=>(
                  <div
                      key={po.id}
                      className="border rounded-2xl p-5 hover:border-sky-400 hover:shadow-md hover:bg-sky-50 transition"
                  >

                      <div className="flex flex-col lg:flex-row justify-between gap-4">

                          <div>

                              <h3 className="font-bold text-lg">
                                  {po.po_number}
                              </h3>

                              <p className="text-gray-600">
                                  {po.supplier_name}
                              </p>

                              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">

                                  <span>
                                      Order Date: {po.order_date}
                                  </span>

                                  <span>
                                      Warehouse: {po.warehouse}
                                  </span>

                              </div>

                          </div>

                          <div className="flex flex-col items-end gap-3">

                              <StatusBadge status={po.status}/>

                              <button
                                  onClick={() => {
                                          onSelect(po.id);
                                          onClose();
                                          }}
                                  className="
                                      cursor-pointer
                                      border
                                      rounded-2xl
                                      p-5
                                      hover:border-sky-500
                                      hover:bg-sky-50
                                      transition
                                  "
                              >

                                  Select

                              </button>

                          </div>

                      </div>

                  </div>
              ))}
              <p className="text-sm text-gray-500 mt-2">
              {filteredPurchaseOrders.length} Purchase Order(s) found
          </p>

          </div>
          
          }

              <div className="border-t mt-6 pt-5 flex justify-end">

            <button
                onClick={onClose}
                className="
                    border
                    rounded-xl
                    px-5
                    py-3
                    hover:bg-gray-100
                "
            >

                Close

            </button>

        </div>






        </div>

    </div>
);
   
  

}