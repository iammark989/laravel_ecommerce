<?php

namespace App\Models;

use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PurchaseOrderItem extends Model
{
     use HasFactory, Notifiable;

            protected $fillable = [
                'purchase_order_id',
                'product_variant_id',
                'uom_id',
                'conversion_qty',
                'received_qty',
                'tax_type',
                'warehouse_id',
                'quantity',
                'cost_price',
                'amount',
                'remarks',
            ];

    public function purchaseorder(){
        return $this->belongsTo(PurchaseOrder::class,'purchase_order_id','id');
    }

    public function productvariant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id','id');
    }
}
