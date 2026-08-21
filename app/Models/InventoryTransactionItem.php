<?php

namespace App\Models;

use App\Models\InventoryTransaction;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

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
    
    public function inventorytransaction(){
        return $this->belongsTo(InventoryTransaction::class,'inventory_transaction_id','id');
    }

    public function productvariant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id','id');
    }

}
