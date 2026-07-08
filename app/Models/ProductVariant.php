<?php

namespace App\Models;

use App\Models\Product;
use App\Models\PurchaseOrderItem;
use App\Models\Uom;
use App\Models\VariantImage;
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
        'base_uom_id',
        'selling_uom_id',
        'selling_qty',
        'purchasing_uom_id',
        'purchasing_qty',
        'remarks',
        'created_by',
        'updated_by',
    ];

    public function prices()
    {
        return $this->hasMany(VariantPrice::class);
    }

    public function baseuom(){
        return $this->belongsTo(Uom::class,'base_uom_id','id');
    }

    public function sellinguom(){
        return $this->belongsTo(Uom::class,'selling_uom_id','id');
    }

    public function purchasinguom(){
        return $this->belongsTo(Uom::class,'purchasing_uom_id','id');
    }

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

    public function variantimages(){
        return $this->hasMany(VariantImage::class,'product_variant_id','id');
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
