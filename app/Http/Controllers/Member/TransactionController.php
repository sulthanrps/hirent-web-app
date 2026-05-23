<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Tampilkan halaman checkout dengan item yang dipilih dari cart.
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'cart_item_ids'   => 'required|array|min:1',
            'cart_item_ids.*' => 'required|integer|exists:cart_items,id',
        ]);

        $cart = Cart::where('user_id', Auth::id())->firstOrFail();

        // Ambil hanya item yang dipilih, pastikan milik cart user ini
        $items = $cart->items()
            ->with('product.category')
            ->whereIn('id', $validated['cart_item_ids'])
            ->get();

        if ($items->isEmpty()) {
            return back()->with('error', 'Tidak ada item yang dipilih.');
        }

        $itemsData = $items->map(function ($item) {
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
                    'id'    => $item->product->id,
                    'name'  => $item->product->name,
                    'price' => $item->product->price,
                    'image' => $item->product->image
                                ? asset('storage/' . $item->product->image)
                                : null,
                ],
            ];
        });

        return Inertia::render('Cart/Checkout', [
            'items'      => $itemsData,
            'totalPrice' => $itemsData->sum('subtotal'),
        ]);
    }

    /**
     * Simpan transaksi baru setelah checkout.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart_item_ids'    => 'required|array|min:1',
            'cart_item_ids.*'  => 'required|integer|exists:cart_items,id',
            'payment_method'   => 'required|string|in:transfer,cod',
        ]);

        $cart = Cart::where('user_id', Auth::id())->firstOrFail();

        $items = $cart->items()
            ->with('product')
            ->whereIn('id', $validated['cart_item_ids'])
            ->get();

        if ($items->isEmpty()) {
            return back()->with('error', 'Tidak ada item yang dipilih.');
        }

        // Validasi stok semua item sebelum proses
        foreach ($items as $item) {
            if ($item->product->stock < $item->quantity) {
                return back()->with('error', "Stok produk \"{$item->product->name}\" tidak mencukupi.");
            }
        }

        DB::transaction(function () use ($items, $validated) {
            $adminFee = 5000;
            $itemsPrice = $items->sum(function ($item) {
                $rentDate = \Carbon\Carbon::parse($item->rent_date);
                $returnDate = \Carbon\Carbon::parse($item->return_date);
                $duration = max(1, $rentDate->diffInDays($returnDate));
                return $item->quantity * $item->product->price * $duration;
            });
            $totalPrice = $itemsPrice + $adminFee;

            // 1. Buat header transaksi (Hanya simpan status & harga)
            $transaction = Transaction::create([
                'user_id'        => Auth::id(),
                'total_price'    => $totalPrice,
                'status'         => 'pending',
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'pending',
            ]);

            // 2. Buat detail transaksi & kurangi stok (Tanggal disimpan di sini!)
            foreach ($items as $item) {
                $rentDate = \Carbon\Carbon::parse($item->rent_date);
                $returnDate = \Carbon\Carbon::parse($item->return_date);
                $duration = max(1, $rentDate->diffInDays($returnDate));
                $subtotal = $item->quantity * $item->product->price * $duration;

                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id'     => $item->product->id,
                    'quantity'       => $item->quantity,
                    'subtotal'       => $subtotal,
                    'rent_date'      => $item->rent_date,
                    'return_date'    => $item->return_date,
                ]);

                // Kurangi stok produk
                $item->product->decrement('stock', $item->quantity);

                // Hapus item dari cart setelah checkout
                $item->delete();
            }
        });

        return redirect()->route('profile.transactions')
            ->with('success', 'Transaksi berhasil dibuat. Menunggu konfirmasi owner.');
    }

    /**
     * Tampilkan riwayat transaksi member yang sedang login.
     */
    public function index()
    {
        $transactions = Transaction::with(['items.product'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($transaction) {
                return [
                    'id'             => $transaction->id,
                    'total_price'    => $transaction->total_price,
                    'status'         => $transaction->status,
                    'payment_method' => $transaction->payment_method,
                    'payment_status' => $transaction->payment_status,
                    'created_at'     => $transaction->created_at->format('d M Y'),
                    'items'          => $transaction->items->map(fn($item) => [
                        'id'          => $item->id,
                        'quantity'    => $item->quantity,
                        'subtotal'    => $item->subtotal,
                        'rent_date'   => \Carbon\Carbon::parse($item->rent_date)->format('d M Y'),
                        'return_date' => \Carbon\Carbon::parse($item->return_date)->format('d M Y'),
                        'product'     => [
                            'name'  => $item->product->name,
                            'image' => $item->product->image
                                        ? asset('storage/' . $item->product->image)
                                        : null,
                        ],
                    ]),
                ];
            });

        return Inertia::render('Profile/Transactions', [
            'transactions' => $transactions,
        ]);
    }
}