<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class InventoryTransaction extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'transaction_type',
        'reason',
        'status',
        'reference_type',
        'invoice_no',
        'reference_number',
        'remarks',
        'created_by',
        'posted_at',
    ];

    public function inventorytransactionsitems(){
        return $this->hasMany(inventorytransactionsitems::class,'inventory_transaction_id','id');
    }
}
