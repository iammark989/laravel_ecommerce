<?php

namespace App\Models;

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
}
