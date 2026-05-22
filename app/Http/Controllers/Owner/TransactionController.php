<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Tampilkan dashboard owner beserta semua transaksi produk miliknya.
     */
    public function index()
    {
        // Ambil semua transaction_items yang produknya milik owner ini
        $transactionItems = TransactionItem::with(['transaction.user', 'product'])
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id()))
            ->latest()
            ->get();

        // Kelompokkan per transaksi untuk tampilan lebih rapi
        $transactions = $transactionItems
            ->groupBy('transaction_id')
            ->map(function ($items) {
                $transaction = $items->first()->transaction;
                return [
                    'id'             => $transaction->id,
                    'status'         => $transaction->status,
                    'payment_method' => $transaction->payment_method,
                    'payment_status' => $transaction->payment_status,
                    'total_price'    => $transaction->total_price,
                    'created_at'     => $transaction->created_at->format('d M Y'),
                    'member'         => [
                        'name'  => $transaction->user->name,
                        'email' => $transaction->user->email,
                    ],
                    'items' => $items->map(fn($item) => [
                        'id'          => $item->id,
                        'quantity'    => $item->quantity,
                        'subtotal'    => $item->subtotal,
                        'rent_date'   => $item->rent_date->format('d M Y'),
                        'return_date' => $item->return_date->format('d M Y'),
                        'product'     => [
                            'name'  => $item->product->name,
                            'image' => $item->product->image
                                        ? asset('storage/' . $item->product->image)
                                        : null,
                        ],
                    ]),
                ];
            })
            ->values();

        // Summary untuk dashboard
        $summary = [
            'total_pending'     => $transactionItems->where('transaction.status', 'pending')->count(),
            'total_disewakan'   => $transactionItems->where('transaction.status', 'disewakan')->count(),
            'total_dikembalikan'=> $transactionItems->where('transaction.status', 'dikembalikan')->count(),
            'total_revenue'     => TransactionItem::whereHas('product', fn($q) => $q->where('user_id', Auth::id()))
                                    ->whereHas('transaction', fn($q) => $q->where('status', 'dikembalikan'))
                                    ->sum('subtotal'),
        ];

        return Inertia::render('Owner/Dashboard', [
            'transactions' => $transactions,
            'summary'      => $summary,
        ]);
    }

    /**
     * Update status transaksi oleh owner.
     * Alur: pending → disewakan → dikembalikan
     */
    public function updateStatus(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'status' => 'required|in:disewakan,dikembalikan',
        ]);

        // Pastikan transaksi ini mengandung produk milik owner yang login
        $ownsProduct = $transaction->items()
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id()))
            ->exists();

        if (!$ownsProduct) {
            abort(403, 'Kamu tidak memiliki akses ke transaksi ini.');
        }

        // Validasi alur status (tidak bisa loncat atau mundur)
        $validTransitions = [
            'pending'    => 'disewakan',
            'disewakan'  => 'dikembalikan',
        ];

        if (
            !isset($validTransitions[$transaction->status]) ||
            $validTransitions[$transaction->status] !== $validated['status']
        ) {
            return back()->with('error', 'Perubahan status tidak valid.');
        }

        // Jika dikembalikan, kembalikan stok produk
        if ($validated['status'] === 'dikembalikan') {
            foreach ($transaction->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }
        }

        $transaction->update(['status' => $validated['status']]);

        return back()->with('success', 'Status transaksi berhasil diperbarui.');
    }
}
