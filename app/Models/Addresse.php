<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Addresse extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
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
