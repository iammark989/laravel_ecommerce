<?php

namespace App\Models;

use App\Models\GoodsReceiptItem;
use App\Models\PurchaseOrder;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class GoodsReceipt extends Model
{
     use HasFactory, Notifiable;

     protected $fillable = [
        'gr_number',
        'purchase_order_id',
        'warehouse_id',
        'received_date',
        'reference_no',
        'remarks',
        'status',
        'created_by',
    ];

    public function user(){
        return $this->belongsTo(User::class,'created_by','id');
    }

    public function purchaseorder(){
        return $this->belongsTo(PurchaseOrder::class,'purchase_order_id','id');
    }

     public function warehouse(){
        return $this->belongsTo(Warehouse::class,'warehouse_id','id');
    }

    public function goodsreceiptitems(){
        return $this->hasMany(GoodsReceiptItem::class,'goods_receipt_id','id');
    }
}
