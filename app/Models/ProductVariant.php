<?php

namespace App\Models;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\PurchaseOrderItem;
use App\Models\VariantInventorie;
use App\Models\VariantPrice;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
        'warehouse_id',
        'tax_type',
        'variant_name',
        'is_active',

    ];


    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }

    public function warehouse(){
        return $this->belongsTo(Warehouse::class,'warehouse_id','id');
    }

    public function variantprices(){
        return $this->hasMany(VariantPrice::class,'product_variant_id','id');
    }

     public function productinventories(){
        return $this->hasMany(VariantInventorie::class,'product_variant_id','id');
    }

    public function productimages(){
        return $this->hasMany(ProductImage::class,'product_variant_id','id');
    }

    public function purchaseorderitems(){
        return $this->hasMany(PurchaseOrderItem::class,'product_variant_id','id');
    }

protected function variant_name(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}

}
