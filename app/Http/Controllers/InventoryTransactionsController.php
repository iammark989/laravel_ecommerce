<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
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
            'product_variants.cost_price',
            'variant_inventories.quantity_on_hand'
        )
        ->where('sku', 'like', "%{$search}%")
        ->orWhere('variant_name', 'like', "%{$search}%")
        ->limit(10)
        ->get();
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
    public function goToPurchaseOrderPage(){
        $supplierList = Supplier::orderBy('name','asc')->get();
        return Inertia::render('admin/inventoryPurchaseOrder',[
            'supplierList' => $supplierList,
            'ponumber' => $this->generatePOnumber(),
        ]);
    }

}
