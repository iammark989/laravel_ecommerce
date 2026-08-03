<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use Illuminate\Http\Request;

class PurchaseOrderController extends Controller
{
    public function purchaseOrdersDetails($purchaseOrder){
       $items = PurchaseOrderItem::query()
    ->join(
        'product_variants',
        'product_variants.id',
        '=',
        'purchase_order_items.product_variant_id'
    )
    ->join(
        'products',
        'products.id',
        '=',
        'product_variants.product_id'
    )
    ->join(
        'uoms',
        'uoms.id',
        '=',
        'purchase_order_items.uom_id'
    )
    ->join(
        'purchase_orders',
        'purchase_orders.id',
        '=',
        'purchase_order_items.purchase_order_id',
    )
    ->join(
        'suppliers',
        'suppliers.id',
        '=',
        'purchase_orders.supplier_id'
    )
    ->join(
        'warehouses',
        'warehouses.id',
        '=',
        'purchase_orders.warehouse_id',
    )
    ->select(
        'purchase_order_items.id',
        'products.name',
        'product_variants.variant_name', 
        'product_variants.sku',
        'purchase_order_items.quantity',
        'purchase_order_items.cost_price',
        'purchase_order_items.amount',
        'purchase_order_items.remarks',
        'uoms.code as uom',
        'purchase_orders.po_number',
        'purchase_orders.order_date',
        'purchase_orders.expected_delivery',     
        'purchase_orders.payment_terms',
        'purchase_orders.suppliers_quotation_no',
        'purchase_orders.reference_no',
        'purchase_orders.discount',
        'purchase_orders.tax',
        'purchase_orders.subtotal',
        'purchase_orders.grand_total',
        'purchase_orders.remarks',
        'suppliers.name',
        'warehouses.name',
    )
    ->where('purchase_order_items.purchase_order_id', $purchaseOrder)
    ->get();

     return response()->json($items);
    }
}
