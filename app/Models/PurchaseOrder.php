<?php

namespace App\Models;

use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PurchaseOrder extends Model
{

        use HasFactory, Notifiable;

            protected $fillable = [
                'po_number',
                'supplier_id',
                'warehouse_id',
                'order_date',
                'expected_delivery',
                'payment_terms',
                'status',
                'discount',
                'tax',
                'subtotal',
                'suppliers_quotation_no',
                'reference_no',
                'grand_total',
                'remarks',
                'created_by',
                'approved_by',
                'approved_at',
                'updated_by',
            ];

    public function supplier(){
        return $this->belongsTo(Supplier::class,'supplier_id','id');
    }

    public function purchaseorderitems(){
        return $this->hasMany(PurchaseOrderItem::class,'purchase_order_id','id');
    }

    public function warehouse(){
        return $this->belongsTo(Warehouse::class,'warehouse_id','id');
    }

    public function createdbyuser(){
        return $this->belongsTo(User::class,'created_by','id');
    }

    public function approvebyuser(){
        return $this->belongsTo(User::class,'approved_by','id');
    }

    public function updatedbyuser(){
        return $this->belongsTo(User::class,'updated_by','id');
    }
    
    
}
