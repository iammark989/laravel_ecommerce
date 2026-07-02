<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use Illuminate\Http\Request;
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

    return ProductVariant::join(
            'variant_inventories',
            'product_variants.id',
            '=',
            'variant_inventories.product_variant_id'
        )
        ->select(
            'product_variants.id',
            'product_variants.sku',
            'product_variants.variant_name',
            'variant_inventories.quantity_on_hand'
        )
        ->where('sku', 'like', "%{$search}%")
        ->orWhere('variant_name', 'like', "%{$search}%")
        ->limit(10)
        ->get();
    }

        // GO TO PURCHASE ORDER PAGE
    public function goToPurchaseOrderPage(){
        return Inertia::render('admin/inventoryPurchaseOrder');
    }

}
