<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Categorie extends Model
{
     use HasFactory, Notifiable;

     protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
    ];

    public function products(){
        return $this->hasMany(Product::class,'category_id','id');
    }

    protected function name(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}
}
