<?php

namespace App\Models;

use App\Models\ProductVariant;
use App\Models\User;
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


}
