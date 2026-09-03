<?php

namespace App\Models;

use App\Models\InventoryTransactionItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class InventoryTransaction extends Model
{
    use HasFactory, Notifiable;

     protected $fillable = [
        'transaction_type',
        'reason',
        'status',
        'reference_type',
        'invoice_no',
        'reference_number',
        'remarks',
        'created_by',
        'posted_at',
    ];

    protected $casts = [
        'posted_at' => 'datetime',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(
            InventoryTransactionItem::class
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }
}
