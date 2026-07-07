<?php

namespace App\Models;

use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Uom extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'code',
        'description',
        'is_active',
    ];

    public function baseuoms(){
        return $this->hasMany(ProductVariant::class,'base_uom_id','id');
    }

    public function sellinguoms(){
        return $this->hasMany(ProductVariant::class,'selling_uom_id','id');
    }

    public function purchasinguoms(){
        return $this->hasMany(ProductVariant::class,'purchasing_uom_id','id');
    }

    protected function code(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}

protected function description(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}
}
