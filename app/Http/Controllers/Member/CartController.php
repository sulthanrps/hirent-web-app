<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Ambil atau buat cart untuk user yang sedang login.
     */
    private function getOrCreateCart(): Cart
    {
        return Cart::firstOrCreate(['user_id' => Auth::id()]);
    }

    /**
     * Tampilkan isi keranjang.
     */
    public function index()
    {
        $cart = $this->getOrCreateCart();

        $items = $cart->items()->with('product.category')->get()->map(function ($item) {
            $rentDate = \Carbon\Carbon::parse($item->rent_date);
            $returnDate = \Carbon\Carbon::parse($item->return_date);
            $duration = max(1, $rentDate->diffInDays($returnDate));
            $subtotal = $item->quantity * $item->product->price * $duration;

            return [
                'id'          => $item->id,
                'quantity'    => $item->quantity,
                'rent_date'   => \Carbon\Carbon::parse($item->rent_date)->format('Y-m-d'),
                'return_date' => \Carbon\Carbon::parse($item->return_date)->format('Y-m-d'),
                'subtotal'    => $subtotal,
                'product'     => [
                    'id'       => $item->product->id,
                    'name'     => $item->product->name,
                    'price'    => $item->product->price,
                    'stock'    => $item->product->stock,
                    'image'    => $item->product->image
                                    ? asset('storage/' . $item->product->image)
                                    : null,
                    'category' => $item->product->category->name,
                ],
            ];
        });

        return Inertia::render('Cart/Cart', [
            'items'      => $items,
            'totalPrice' => $items->sum('subtotal'),
        ]);
    }

    /**
     * Tambah produk ke keranjang.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id'  => 'required|exists:products,id',
            'quantity'    => 'required|integer|min:1',
            'rent_date'   => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after:rent_date',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Cek stok mencukupi
        if ($product->stock < $validated['quantity']) {
            return back()->with('error', 'Stok produk tidak mencukupi.');
        }

        $cart = $this->getOrCreateCart();

        // Jika produk dengan tanggal sewa yang sama sudah ada di keranjang, update quantity-nya
        $existingItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('rent_date', $validated['rent_date'])
            ->where('return_date', $validated['return_date'])
            ->first();

        if ($existingItem) {
            $newQuantity = $existingItem->quantity + $validated['quantity'];

            if ($product->stock < $newQuantity) {
                return back()->with('error', 'Stok produk tidak mencukupi.');
            }

            $existingItem->update([
                'quantity'    => $newQuantity,
                'rent_date'   => $validated['rent_date'],
                'return_date' => $validated['return_date'],
            ]);
        } else {
            $cart->items()->create([
                'product_id'  => $product->id,
                'quantity'    => $validated['quantity'],
                'rent_date'   => $validated['rent_date'],
                'return_date' => $validated['return_date'],
            ]);
        }

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang.');
    }

    /**
     * Update quantity item di keranjang.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $this->authorizeCartItem($cartItem);

        $validated = $request->validate([
            'quantity'    => 'required|integer|min:1',
            'rent_date'   => 'required|date',
            'return_date' => 'required|date|after:rent_date',
        ]);

        // Cek stok mencukupi
        if ($cartItem->product->stock < $validated['quantity']) {
            return back()->with('error', 'Stok produk tidak mencukupi.');
        }

        $cartItem->update($validated);

        return back()->with('success', 'Keranjang berhasil diperbarui.');
    }

    /**
     * Hapus item dari keranjang.
     */
    public function destroy(CartItem $cartItem)
    {
        $this->authorizeCartItem($cartItem);

        $cartItem->delete();

        return back()->with('success', 'Produk berhasil dihapus dari keranjang.');
    }

    /**
     * Pastikan cart item milik user yang sedang login.
     */
    private function authorizeCartItem(CartItem $cartItem): void
    {
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403, 'Kamu tidak memiliki akses ke item ini.');
        }
    }
}
