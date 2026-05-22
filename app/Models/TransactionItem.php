<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TransactionItem extends Model
{
    protected $fillable = [
        'transaction_id',
        'product_id',
        'quantity',
        'subtotal',
        'rent_date',
        'return_date',
    ];

    protected $casts = [
        'rent_date'   => 'date',
        'return_date' => 'date',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}