<?php

namespace App\Models;

use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class VariantInventory extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'product_variant_id',
        'quantity_on_hand',
        'reorder_level',
    ];

    public function productvariant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id','id');
    }
}
