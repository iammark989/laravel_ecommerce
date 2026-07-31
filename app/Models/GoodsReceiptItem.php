<?php

namespace App\Models;

use App\Models\GoodsReceipt;
use App\Models\ProductVariant;
use App\Models\PurchaseOrderItem;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class GoodsReceiptItem extends Model
{
     use HasFactory, Notifiable;

     protected $fillable = [
        'goods_receipt_id',
        'purchase_order_item_id',
        'product_variant_id',
        'received_qty',
        'cost_price',
        'remarks',
    ];

    public function goodsreceipt(){
        return $this->belongsTo(GoodsReceipt::class,'goods_receipt_id','id');
    }

    public function purchaseorderitem(){
        return this->belongsTo(PurchaseOrderItem::class,'purchase_order_item_id','id');
    }

    public function productvariant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id','id');
    }
}
