<?php

namespace App\Models;

use App\Models\ProductVariant;
use App\Models\PurchaseOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Warehouse extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'warehouse_code',
        'name',
        'contact_person',
        'contact_number',
        'email',
        'address',
        'remarks',
        'is_active',
        'created_by',
        'updated_by',
    ];

    public function productvariants(){
        return $this->hasMany(ProductVariant::class,'warehouse_id','id');
    }

    public function warehouses(){
        return $this->hasMany(PurchaseOrder::class,'warehouse_id','id');
    }

    protected function name(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}


}
