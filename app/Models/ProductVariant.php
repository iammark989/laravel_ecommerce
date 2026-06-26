<?php

namespace App\Models;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\VariantInventorie;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProductVariant extends Model
{

 use HasFactory, Notifiable;

     protected $fillable = [
        'product_id',
        'sku',
        'barcode',
        'cost_price',
        'selling_price',
        'variant_name',
        'is_active',

    ];


    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }

     public function productinventories(){
        return $this->hasMany(VariantInventorie::class,'product_variant_id','id');
    }

    public function productimages(){
        return $this->hasMany(ProductImage::class,'product_variant_id','id');
    }

}
