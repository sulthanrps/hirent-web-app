<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'rent_date',
        'return_date',
    ];

    protected $casts = [
        'rent_date'   => 'date',
        'return_date' => 'date',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}