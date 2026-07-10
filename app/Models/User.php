<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Addresse;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Role;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'mobile',
        'username',
        'email',
        'password',
        'role_id',
        'is_active',
        'is_staff',
    ];

    public function roles(){
        return $this->belongsTo(Role::class,'role_id','id');
    }

    public function user_addresses(){
        return $this->hasMany(Addresse::class,'user_id','id');
    }

    public function products(){
        return $this->hasMany(Product::class,'created_by','id');
    }

     public function createdbyusers(){
        return $this->hasMany(PurchaseOrder::class,'created_by','id');
    }

    public function approvebyusers(){
        return $this->hasMany(PurchaseOrder::class,'approved_by','id');
    }

    public function updatedbyusers(){
        return $this->hasMany(PurchaseOrder::class,'updated_by','id');
    }

    protected function firstName(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => ucwords(strtolower($value)),
        );
    }
    protected function middleName(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => ucwords(strtolower($value)),
        );
    }
    protected function lastName(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => ucwords(strtolower($value)),
        );
    }

   

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
