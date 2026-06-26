<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Categorie;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'slug',
        'short_description',
        'description',
        'featured_image',
        'created_by',
        'is_active',
    ];

        public function categorie(){
        return $this->belongsTo(Categorie::class,'category_id','id');
    }

        public function brand(){
        return $this->belongsTo(Brand::class,'category_id','id');
    }

    public function users(){
        return $this->belongsTo(User::class,'created_by','id');
    }

    public function productvariants(){
        return $this->hasMany(ProductVariant::class,'product_id','id');
    }

    public function productimages(){
        return $this->hasMany(ProductImage::class,'product_id','id');
    }
    

}
