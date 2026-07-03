<?php

namespace App\Models;

use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PurchaseOrder extends Model
{

        use HasFactory, Notifiable;

            protected $fillable = [
                'supplier_id',
                'order_date',
                'expected_delivery',
                'payment_terms',
                'status',
                'suppliers_quotation_no',
                'reference_no',
                'total_amount',
                'remarks',
                'created_by',
            ];

    public function supplier(){
        return $this->belongsTo(Supplier::class,'supplier_id','id');
    }

    public function purchaseorderitems(){
        return $this->hasMany(PurchaseOrderItem::class,'purchase_order_id','id');
    }
    
}
