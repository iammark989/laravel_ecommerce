<?php

namespace App\Models;

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

}
