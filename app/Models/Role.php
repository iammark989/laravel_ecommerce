<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Role extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'name',
    ];

    public function users(){
        return $this->hasMany(User::class,'role_id','id');
    }

}
