<?php

namespace App\Models;

use App\Models\InventoryTransaction;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryTransactionItem extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'inventory_transaction_id',
        'product_variant_id',
        'quantity',
        'remarks',
        'stock_before',
        'stock_after',
    ];
    
     public function inventoryTransaction(): BelongsTo
    {
        return $this->belongsTo(
            InventoryTransaction::class
        );
    }

    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(
            ProductVariant::class
        );
    }

}
