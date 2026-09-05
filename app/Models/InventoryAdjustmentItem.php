<?php

namespace App\Models;

use App\Models\InventoryAdjustment;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryAdjustmentItem extends Model
{
     protected $fillable = [
        'inventory_adjustment_id',
        'product_variant_id',
        'current_stock',
        'adjustment_quantity',
        'new_stock',
        'remarks',
    ];

    public function inventoryAdjustment(): BelongsTo
    {
        return $this->belongsTo(InventoryAdjustment::class);
    }

    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
