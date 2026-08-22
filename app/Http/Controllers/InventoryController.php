<?php

namespace App\Http\Controllers;

use App\Models\VariantInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
{
    $inventory = VariantInventory::query()
        ->join(
            'product_variants',
            'product_variants.id',
            '=',
            'variant_inventories.product_variant_id'
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
            'product_variants.base_uom_id'
        )
        ->select([
            'variant_inventories.id',
            'variant_inventories.product_variant_id',
            'products.name',
            'product_variants.variant_name',
            'product_variants.sku',
            'uoms.code as uom',
            'variant_inventories.quantity_on_hand',
            'variant_inventories.reorder_level',
        ])
        ->selectRaw("
            CASE
                WHEN variant_inventories.quantity_on_hand <= 0
                    THEN 'out_of_stock'
                WHEN variant_inventories.quantity_on_hand <= variant_inventories.reorder_level
                    THEN 'low_stock'
                ELSE 'in_stock'
            END as stock_status
        ")
        ->orderBy('products.name')
        ->get();

        $totalProducts = VariantInventory::count();

        $totalStock = VariantInventory::sum('quantity_on_hand');

        $lowStock = VariantInventory::whereColumn(
            'quantity_on_hand',
            '<=',
            'reorder_level'
        )
        ->where('quantity_on_hand', '>', 0)
        ->count();

        $outOfStock = VariantInventory::where(
            'quantity_on_hand',
            '<=',
            0
        )->count();

    return response()->json([
        'summary' => [
            'total_products' => $totalProducts,
            'total_stock' => $totalStock,
            'low_stock' => $lowStock,
            'out_of_stock' => $outOfStock,
        ],
        'items' => $inventory,
    ]);
    
    }

        public function inventoryStocks(){
        return Inertia::render('admin/inventoryStocks');
    }

}
