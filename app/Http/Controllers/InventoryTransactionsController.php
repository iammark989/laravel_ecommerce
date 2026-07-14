<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryTransactionsController extends Controller
{

    // GO TO INVENTORY TRANSACTIONS
    public function goToInventoryTransactionsPage(){
        return Inertia::render('admin/inventorytransactions');
    }

    // GO TO NEW INVENTORY TRANSACTIONS
    public function goToNewInventoryTransactions(){
          
        return Inertia::render('admin/inventorynewtransactions');
    }

        // SEARCH VARIANT AJAX
    public function searchVariant(Request $request)
    {
       $search = $request->search;

    return DB::table('product_variants as variant')
            ->leftJoin('uoms as uom','uom.id','=','variant.purchasing_uom_id')
            ->leftJoin('variant_inventories as inventory','inventory.product_variant_id','=','variant.id')
        ->select(
            'variant.id as id',
            'variant.sku as sku',
            'variant.variant_name as variant_name',
            'variant.cost_price as cost_price',
            'variant.purchasing_qty as purchasing_qty',
            'inventory.quantity_on_hand as quantity_on_hand',
            'uom.code as code',
            'uom.id as uom_id'
        )
        ->groupBy(
            'variant.id',
            'variant.sku',
            'variant.variant_name',
            'variant.cost_price',
            'variant.purchasing_qty',
            'inventory.quantity_on_hand',
            'uom.code',
             'uom.id'
        )
        ->where('sku', 'like', "%{$search}%")
        ->orWhere('variant_name', 'like', "%{$search}%")
        ->limit(10)
        ->get();
    }


    // GO TO PURCHASE LIST
    public function goToPurchaseOrderList(){
        $poDetails = DB::table('purchase_orders as po')
            ->leftJoin('suppliers as supplier', 'supplier.id', '=', 'po.supplier_id')
            ->leftJoin('users as user', 'user.id', '=', 'po.created_by')
            ->select(
                'po.id',
                'po.po_number',
                'po.order_date as po_date',
                'po.status',
                'po.grand_total',
                'supplier.name as supplier_name',
                'user.first_name',
                'user.last_name',
            )
            ->orderByDesc('po.created_at')
            ->paginate(15);
                            

        return Inertia::render('admin/inventoryPurchaseOrderList',[
                'poDetails' => $poDetails,
        ]);
    }


         //Generate the next supplier code.
    private function generatePOnumber(): string {
        $lastPO = PurchaseOrder::latest('id')->first();
        $today = date("Ymd");
        if (!$lastPO) {
            return 'PO-'.$today."-00001";
        }
        // Get last 5 digits
        $lastNumber = (int) substr($lastPO->po_number, -5);
        return "PO-{$today}-" . str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
    }

    // GO TO PURCHASE ORDER PAGE
    public function goToNewPurchaseOrder(){
        $supplierList = Supplier::orderBy('name','asc')->get();
        return Inertia::render('admin/inventoryPurchaseOrder',[
            'supplierList' => $supplierList,
            'ponumber' => $this->generatePOnumber(),
        ]);
    }

     // GO TO EDIT PURCHASE ORDER PAGE --- FOR DRAFT STATUS ONLY ---
    public function goToEditPurchaseOrder($id){
        $supplierList = Supplier::orderBy('name','asc')->get();
        $poDetails = PurchaseOrder::where('id','=',$id)->firstOrFail();
        $poItems = DB::table('purchase_order_items as poitems')
                    ->leftJoin('product_variants as variants','variants.id','=','poitems.product_variant_id')    
                    ->leftJoin('uoms as uom','uom.id','=','poitems.uom_id')     
                    ->select([
                    'variants.sku as sku',
                    'variants.variant_name as variant_name',
                    'variants.cost_price as cost_price',
                    'poitems.product_variant_id as product_variant_id',
                    'poitems.purchase_order_id as purchase_order_id',
                    'poitems.quantity as quantity',
                    'poitems.amount as amount',
                    'poitems.remarks as remarks',
                    'poitems.uom_id as uom_id',
                    'uom.code as uom_code',
                    ])
                    ->groupBy([
                    'variants.sku',
                    'variants.variant_name',
                    'variants.cost_price',
                    'poitems.product_variant_id',
                    'poitems.purchase_order_id',
                    'poitems.quantity',
                    'poitems.amount',
                    'poitems.remarks',
                    'poitems.uom_id',
                    'uom.code',
                    ])
                    ->where('poitems.purchase_order_id','=',$id)
                    ->get();
        return Inertia::render('admin/inventoryPurchaseOrderEdit',[
            'supplierList' => $supplierList,
            'poDetails' => $poDetails,
            'poItems' => $poItems,
        ]);
    }


    // SAVE PURCHASE ORDER
    public function savePurchaseOrder(Request $request){
        $incomingFields = $request->validate([
                'supplier_id' => 'required|exists:suppliers,id',
                //'warehouse_id' => '',
                'order_date' => 'required|date',
                'expected_delivery' => 'nullable|date|after_or_equal:order_date',
                'payment_terms' => 'required|in:cash,cod,net15,net30',
                //'status' => '',
                'suppliers_quotation_no' => 'nullable|max:25',
                'reference_no' => 'nullable|max:50',
                'remarks' => 'nullable|string|max:500',
                'discount' => 'numeric|min:0',

                'transactionItems' => 'required|array|min:1',
                'transactionItems.*.sku' => 'required|string|max:50',
                'transactionItems.*.product_variant_id' => 'required|exists:product_variants,id',
                'transactionItems.*.quantity' => 'required|numeric|gt:0',
                'transactionItems.*.cost_price' => 'required|numeric|min:0',
                'transactionItems.*.product_variant_id' => '',
                //'transactionItems.*.warehouse_id' => '',
                'transactionItems.*.uom_id' => 'nullable',
                'transactionItems.*.purchasing_qty' => 'nullable',
                'transactionItems.*.remarks' => 'nullable|string|max:255',
        ]);

            if ($request->action === 'draft') {
                $status = 'draft';
            }
            if ($request->action === 'submitted') {
                $status = 'submitted';
            }

            $subtotal = 0;
            foreach ($request->transactionItems as $item) {
                $subtotal +=
                    $item['quantity']
                    *
                    $item['cost_price'];
            }

            $discount = $request->discount;

            $tax = 0;

            $grandTotal = $subtotal - $discount + $tax;

            $warehouse = Warehouse::where('id','=','1')->firstOrFail();
            $user = auth()->user();

          DB::transaction(function () use ($request, $incomingFields, $warehouse, $user, $grandTotal, $subtotal,$status) { 
                    $purchaseOrder = PurchaseOrder::create([
                        'po_number' =>  $this->generatePOnumber(),
                        'supplier_id' => $incomingFields['supplier_id'],
                        'order_date' => $incomingFields['order_date'],
                        'expected_delivery' => $incomingFields['expected_delivery'],
                        'payment_terms' => $incomingFields['payment_terms'],
                        'suppliers_quotation_no' => $incomingFields['suppliers_quotation_no'],
                        'reference_no' => $incomingFields['reference_no'],
                        'remarks' => $incomingFields['remarks'],
                        'status' => $status,
                        'warehouse_id' => $warehouse->id,
                        'created_by' => $user->id,
                        'discount' => $incomingFields['discount'],
                        'subtotal' => $subtotal,
                        'grand_total' => $grandTotal,
                        'tax' => 0,
                    ]);
                    foreach ($incomingFields['transactionItems'] as $items) {
                        PurchaseOrderItem::create(
                            [
                                'purchase_order_id' => $purchaseOrder->id,
                                'product_variant_id' => $items['product_variant_id'],
                                'uom_id' => $items['uom_id'],
                                'quantity' => $items['quantity'],
                                'cost_price' => $items['cost_price'],
                                'amount' => $items['quantity'] * $items['cost_price'],
                                'conversion_qty' => $items['purchasing_qty'],
                                'remarks' => $items['remarks'],
                            ],

                        );
                        }
                
                });
    }

    

}
