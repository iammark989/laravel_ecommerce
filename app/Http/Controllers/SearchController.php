<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{


        // SEARCH PURCHASE ORDER
        public function purchaseOrders()
        {
               $purchaseOrders = PurchaseOrder::query()
    ->join('suppliers', 'suppliers.id', '=', 'purchase_orders.supplier_id')
    ->join('warehouses', 'warehouses.id', '=', 'purchase_orders.warehouse_id')
    ->select(
        'purchase_orders.id',
        'purchase_orders.po_number',
        'purchase_orders.order_date',
        'purchase_orders.status',
        'suppliers.name as supplier_name',
        'warehouses.name as warehouse'
    )
    ->whereIn('purchase_orders.status', [
        'submitted',
        'partially_received',
    ])
    ->orderByDesc('purchase_orders.order_date')
    ->orderByDesc('purchase_orders.id') // newest if same date
    ->get();

        return response()->json($purchaseOrders);
    }
        

}
