<?php

namespace App\Models;

use App\Models\VariantPrice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class PriceList extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'code',
        'description',
        'is_active',
    ];

    public function variantprices(){
        return $this->hasMany(VariantPrice::class,'price_list_id','id');
    }    

}
