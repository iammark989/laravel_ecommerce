<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Supplier extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'supplier_code',
        'name',
        'contact_person',
        'address',
        'contact_number',
        'email',
        'tin_number',
        'is_active',
        'remarks',
    ];

    public function purchaseorders(){
        return $this->hasMany(PurchaseOrder::class,'supplier_id','id');
    }

    // format company name
      protected function name(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}
     // format contact person name
     protected function contactPerson(): Attribute
{
    return Attribute::make(
        set: fn ($value) => ucwords(strtolower($value)),
    );
}

// format contact number
protected function contactNumber(): Attribute
{
    return Attribute::make(
        set: function ($value) {

            // Remove everything except numbers
            $number = preg_replace('/\D/', '', $value);

            // Format: 0912-123-1234
            if (strlen($number) === 11) {
                return substr($number, 0, 4) . '-' .
                       substr($number, 4, 3) . '-' .
                       substr($number, 7, 4);
            }

            return $number;
        }
    );
}

    // format tin number
protected function tinNumber(): Attribute
{
    return Attribute::make(
        set: function ($value) {

            // Remove everything except numbers
            $number = preg_replace('/\D/', '', $value);

            // Format: 000-000-000-000
            if (strlen($number) === 12) {
                return substr($number, 0, 3) . '-' .
                       substr($number, 3, 3) . '-' .
                       substr($number, 6, 3) . '-' .
                       substr($number, 9, 3);
            }

            return $number;
        }
    );
}


}
