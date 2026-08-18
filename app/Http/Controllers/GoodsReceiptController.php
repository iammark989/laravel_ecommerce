<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\GoodsReceiptItem;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GoodsReceiptController extends Controller
{

      
    public function goToGoodsReceiptList(){
         $grDetails = DB::table('goods_receipts as gr')
            ->leftJoin('suppliers as supplier', 'supplier.id', '=', 'gr.supplier_id')
            ->leftJoin('purchase_orders as po', 'po.id', '=', 'gr.purchase_order_id')
            ->leftJoin('warehouses as wh','wh.id','=','gr.warehouse_id')
            ->select(
                'gr.id',
                'gr.gr_number',
                'po.po_number',
                'supplier.name as supplier_name',
                'gr.received_date',
                'gr.status',
                'wh.name as warehouse',
            )
            ->orderByDesc('gr.received_date')
            ->paginate(15);
   

        return Inertia::render('admin/inventoryGoodsReceiptList',[
            'grDetails' => $grDetails,
        ]);
     }



     // SAVE GOODS RECEIPT
    private function generateGRnumber(): string {
        $lastGR = GoodsReceipt::latest('id')->first();
        $today = date("Ymd");
        if (!$lastGR) {
            return 'GR-'.$today."-00001"; 
        }
        // Get last 5 digits
        $lastNumber = (int) substr($lastGR->gr_number, -5);
        return "GR-{$today}-" . str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
    }

    public function store(Request $request)
            {
                $incomingFields = $request->validate([
                    'purchase_order_id' => [
                        'required',
                        'exists:purchase_orders,id',
                    ],

                    'received_date' => [
                        'required',
                        'date',
                    ],

                    'remarks' => [
                        'nullable',
                        'string',
                        'max:500',
                    ],

                    'items' => [
                        'required',
                        'array',
                        'min:1',
                    ],

                    'items.*.purchase_order_item_id' => [
                        'required',
                        'exists:purchase_order_items,id',
                    ],

                    'items.*.received_qty' => [
                        'required',
                        'numeric',
                        'gt:0',
                    ],
                ]);

                DB::transaction(function () use ($incomingFields) {

                    // Lock Purchase Order
                    $purchaseOrder = PurchaseOrder::where(
                        'id',
                        $incomingFields['purchase_order_id']
                    )
                    ->lockForUpdate()
                    ->firstOrFail();


                    // Validate PO status
                    if (!in_array($purchaseOrder->status, [
                        'submitted',
                        'partially_received',
                    ])) {
                        throw ValidationException::withMessages([
                            'purchase_order_id' =>
                                'This purchase order cannot receive goods.',
                        ]);
                    }


                    // Create Goods Receipt
                    $goodsReceipt = GoodsReceipt::create([
                        'gr_number' => $this->generateGRnumber(),
                        'purchase_order_id' => $purchaseOrder->id,
                        'supplier_id' => $purchaseOrder->supplier_id,
                        'warehouse_id' => $purchaseOrder->warehouse_id,
                        'received_date' => $incomingFields['received_date'],
                        'remarks' => $incomingFields['remarks'] ?? null,
                        'status' => 'complete',
                        'created_by' => auth()->id(),
                    ]);


                    // Process items
                    foreach ($incomingFields['items'] as $incomingItem) {

                        $purchaseOrderItem = PurchaseOrderItem::where(
                            'id',
                            $incomingItem['purchase_order_item_id']
                        )
                        ->where(
                            'purchase_order_id',
                            $purchaseOrder->id
                        )
                        ->lockForUpdate()
                        ->firstOrFail();


                        $remainingQty =
                            $purchaseOrderItem->quantity -
                            $purchaseOrderItem->received_qty;


                        $receivedQty = $incomingItem['received_qty'];


                        if ($receivedQty > $remainingQty) {

                            throw ValidationException::withMessages([
                                'items' => [
                                    "Received quantity cannot exceed the remaining quantity for item {$purchaseOrderItem->id}."
                                ],
                            ]);

                        }


                        // Create GR item
                        GoodsReceiptItem::create([
                            'goods_receipt_id' => $goodsReceipt->id,
                            'purchase_order_item_id' => $purchaseOrderItem->id,
                            'product_variant_id' => $purchaseOrderItem->product_variant_id,
                            'received_qty' => $receivedQty,
                            'cost_price' => $purchaseOrderItem->cost_price,
                            'remarks' => $incomingItem['remarks'] ?? null,
                        ]);


                        // Update PO item
                        $purchaseOrderItem->increment(
                            'received_qty',
                            $receivedQty
                        );
                    }


                    // Determine PO status
                    $hasRemaining = $purchaseOrder->items()
                        ->whereColumn('received_qty', '<', 'quantity')
                        ->exists();


                    $purchaseOrder->update([
                        'status' => $hasRemaining
                            ? 'partially_received'
                            : 'completed',
                    ]);
                   
                });
            }


}
