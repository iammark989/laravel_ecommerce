<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class UserAddresse extends Model
{
     use HasFactory, Notifiable;

     protected $fillable = [
        'user_id',
        'address_line',
        'barangay',
        'city',
        'province',
        'postal_code',
        'is_default',

    ];

    public function users(){
        return $this->belongsTo(User::class,'role_id','id');
    }
}
