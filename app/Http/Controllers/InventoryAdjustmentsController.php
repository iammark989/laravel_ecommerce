<?php

namespace App\Http\Controllers;

use App\Models\InventoryAdjustment;
use App\Models\InventoryAdjustmentItem;
use App\Models\InventoryTransaction;
use App\Models\VariantInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryAdjustmentsController extends Controller
{

    public function inventoryadjustment(){
        return Inertia::render('admin/inventoryAdjustmentCreate');
    }

    public function index(Request $request)
    {
         $query = InventoryAdjustment::with([
            'warehouse',
            'user',
        ])->withCount('items');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('adjustment_number', 'like', "%{$search}%")
                    ->orWhere('reason', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('reason')) {
            $query->where('reason', $request->reason);
        }

        $adjustments = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return response()->json($adjustments);
    }

    public function show(InventoryAdjustment $inventoryAdjustment)
    {
        $inventoryAdjustment->load([
            'warehouse',
            'user',
            'items.productVariant.product',
            'items.productVariant.uom',
        ]);

        return response()->json([
            'adjustment' => $inventoryAdjustment,
        ]);
    }


    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => [
                'required',
                'exists:warehouses,id',
            ],

            'adjustment_date' => [
                'required',
                'date',
            ],

            'reason' => [
                'required',
                'string',
                'max:100',
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

            'items.*.product_variant_id' => [
                'required',
                'exists:product_variants,id',
            ],

            'items.*.adjustment_quantity' => [
                'required',
                'numeric',
                'not_in:0',
            ],

            'items.*.remarks' => [
                'nullable',
                'string',
                'max:500',
            ],
        ]);

        $user = auth()->user();

        DB::transaction(function () use ($validated,$user) {

            /*
            |--------------------------------------------------------------------------
            | Create Adjustment Header
            |--------------------------------------------------------------------------
            */

            $adjustment = InventoryAdjustment::create([
                'adjustment_number' => $this->generateAdjustmentNumber(),
                'warehouse_id' => $validated['warehouse_id'],
                'adjustment_date' => $validated['adjustment_date'],
                'reason' => $validated['reason'],
                'status' => 'posted',
                'remarks' => $validated['remarks'] ?? null,
                'created_by' => $user->id,
                'posted_at' => now(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | Create Inventory Transaction Header
            |--------------------------------------------------------------------------
            */

            $inventoryTransaction = InventoryTransaction::create([
                'transaction_type' => 'adjustment',
                'reason' => $validated['reason'],
                'status' => 'posted',
                'reference_type' => 'inventory_adjustment',
                'reference_number' => $adjustment->adjustment_number,
                'remarks' => $validated['remarks'] ?? null,
                'created_by' => auth()->id(),
                'posted_at' => now(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | Process Adjustment Items
            |--------------------------------------------------------------------------
            */

            foreach ($validated['items'] as $item) {

                $variantInventory = VariantInventory::where(
                    'product_variant_id',
                    $item['product_variant_id']
                )
                    ->lockForUpdate()
                    ->first();

                if (!$variantInventory) {
                    throw new \Exception(
                        "Inventory record not found for product variant ID {$item['product_variant_id']}."
                    );
                }

                $currentStock = $variantInventory->quantity_on_hand;

                $adjustmentQuantity = $item['adjustment_quantity'];

                $newStock = $currentStock + $adjustmentQuantity;

                /*
                |--------------------------------------------------------------------------
                | Prevent Negative Stock
                |--------------------------------------------------------------------------
                */

                if ($newStock < 0) {
                    throw new \Exception(
                        "Adjustment would result in negative stock for product variant ID {$item['product_variant_id']}."
                    );
                }

                /*
                |--------------------------------------------------------------------------
                | Create Adjustment Item
                |--------------------------------------------------------------------------
                */

                InventoryAdjustmentItem::create([
                    'inventory_adjustment_id' => $adjustment->id,
                    'product_variant_id' => $item['product_variant_id'],
                    'current_stock' => $currentStock,
                    'adjustment_quantity' => $adjustmentQuantity,
                    'new_stock' => $newStock,
                    'remarks' => $item['remarks'] ?? null,
                ]);

                /*
                |--------------------------------------------------------------------------
                | Update Inventory
                |--------------------------------------------------------------------------
                */

                $variantInventory->update([
                    'quantity_on_hand' => $newStock,
                ]);

                /*
                |--------------------------------------------------------------------------
                | Create Inventory Transaction Item
                |--------------------------------------------------------------------------
                */

                $inventoryTransaction->items()->create([
                    'product_variant_id' => $item['product_variant_id'],
                    'quantity' => $adjustmentQuantity,
                    'stock_before' => $currentStock,
                    'stock_after' => $newStock,
                    'remarks' => $item['remarks'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Activity Log
            |--------------------------------------------------------------------------
            */

            // We'll add the activity log here once we confirm
            // the current ActivityLog model structure.
        });

        return response()->json([
            'message' => 'Inventory adjustment posted successfully.',
        ], 201);
    }

    private function generateAdjustmentNumber(): string
    {
        $date = now()->format('Ymd');

        $lastAdjustment = InventoryAdjustment::whereDate(
            'created_at',
            now()->toDateString()
        )
            ->latest('id')
            ->first();

        $sequence = $lastAdjustment
            ? ((int) substr($lastAdjustment->adjustment_number, -5)) + 1
            : 1;

        return 'ADJ-' . $date . '-' . str_pad(
            $sequence,
            5,
            '0',
            STR_PAD_LEFT
        );
    }


    public function page()
    {
        return Inertia::render(
            'admin/inventoryAdjustment'
        );
    }

}