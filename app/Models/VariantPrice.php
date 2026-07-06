<?php

namespace App\Models;

use App\Models\PriceList;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class VariantPrice extends Model
{

 use HasFactory, Notifiable;

     protected $fillable = [
        'product_variant_id',
        'price_list_id',
        'price',
    ];
    
        public function pricelist(){
        return $this->belongsTo(PriceList::class,'price_list_id','id');
    }
    
    public function productvariant(){
        return $this->belongsTo(ProductVariant::class,'product_variant_id','id');
    }
    

}
