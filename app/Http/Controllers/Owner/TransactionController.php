<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Tampilkan dashboard owner beserta semua transaksi produk miliknya.
     */
    public function index()
    {
        $transactionItems = TransactionItem::with(['transaction.user', 'product'])
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id())) // Langsung panggil Auth::id()
            ->latest()
            ->get();

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
                            'image' => $item->product->image ? asset('storage/' . $item->product->image) : null,
                        ],
                    ]),
                ];
            })
            ->values();

        $summary = [
            'total_pending'      => $transactionItems->where('transaction.status', 'pending')->count(),
            'total_disewakan'    => $transactionItems->where('transaction.status', 'disewakan')->count(),
            'total_dikembalikan' => $transactionItems->where('transaction.status', 'dikembalikan')->count(),
            'total_revenue'      => TransactionItem::whereHas('product', fn($q) => $q->where('user_id', Auth::id())) // Langsung panggil Auth::id()
                                        ->whereHas('transaction', fn($q) => $q->where('status', 'dikembalikan'))
                                        ->sum('subtotal'),
        ];

        $ownerTransactions = Transaction::whereHas('items.product', fn($q) => $q->where('user_id', Auth::id()))->get();
        
        $userFirstRentals = $ownerTransactions->groupBy('user_id')->map(function ($userTrxs) {
            return $userTrxs->min('created_at');
        });

        $totalCustomers = $userFirstRentals->count();
        $newCustomersThisMonth = $userFirstRentals->filter(fn($date) => $date >= now()->startOfMonth())->count();
        $newCustomersLastMonth = $userFirstRentals->filter(fn($date) => $date >= now()->subMonth()->startOfMonth() && $date <= now()->subMonth()->endOfMonth())->count();

        $growthPercentage = $newCustomersLastMonth > 0
            ? round((($newCustomersThisMonth - $newCustomersLastMonth) / $newCustomersLastMonth) * 100)
            : ($newCustomersThisMonth > 0 ? 100 : 0);

        $customerMetrics = [
            'total' => $totalCustomers,
            'this_month' => $newCustomersThisMonth,
            'growth_percentage' => $growthPercentage,
        ];

        $reviews = Review::with(['user', 'product'])
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id())) // Langsung panggil Auth::id()
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($review) {
                return [
                    'id'      => $review->id,
                    'user'    => $review->user->name,
                    'product' => $review->product->name,
                    'rating'  => $review->rating,
                    'comment' => $review->comment,
                ];
            });

        return Inertia::render('Owner/Dashboard', [
            'transactions'    => $transactions,
            'summary'         => $summary,
            'customerMetrics' => $customerMetrics,
            'reviews'         => $reviews,
        ]);
    }

    public function updateStatus(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'status' => 'required|in:disewakan,dikembalikan',
        ]);

        $ownsProduct = $transaction->items()
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id()))
            ->exists();

        if (!$ownsProduct) {
            abort(403, 'Kamu tidak memiliki akses ke transaksi ini.');
        }

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

        if ($validated['status'] === 'dikembalikan') {
            foreach ($transaction->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }
        }

        $transaction->update(['status' => $validated['status']]);

        return back()->with('success', 'Status transaksi berhasil diperbarui.');
    }

    /**
     * Tampilkan halaman khusus Rental Requests.
     */
    public function rentals()
    {
        $transactionItems = TransactionItem::with(['transaction.user', 'product'])
            ->whereHas('product', fn($q) => $q->where('user_id', Auth::id()))
            ->latest()
            ->get();

        $transactions = $transactionItems
            ->groupBy('transaction_id')
            ->map(function ($items) {
                $transaction = $items->first()->transaction;
                
                $firstItem = $items->first();
                
                return [
                    'id'             => 'TRX-' . str_pad($transaction->id, 5, '0', STR_PAD_LEFT), 
                    'raw_id'         => $transaction->id,
                    'status'         => $transaction->status,
                    'price'          => $transaction->total_price,
                    'customer'       => $transaction->user->name,
                    'email'          => $transaction->user->email,
                    'rentDate'       => $firstItem->rent_date->format('d M'),
                    'returnDate'     => $firstItem->return_date->format('d M'),
                    
                    
                    'product'        => $items->map(fn($i) => $i->product->name)->join(', '),
                    'qty'            => $items->sum('quantity'),
                ];
            })
            ->values();

        return Inertia::render('Owner/Rentals', [
            'rentals' => $transactions,
        ]);
    }

    /**
     * Ekspor laporan keuangan 1 bulan terakhir ke format PDF.
     */
    public function exportPdf()
    {
        $ownerId = Auth::id();
        $oneMonthAgo = Carbon::now()->subMonth();

        
        $reportItems = TransactionItem::with(['transaction.user', 'product'])
            ->whereHas('product', fn($q) => $q->where('user_id', $ownerId))
            ->whereHas('transaction', fn($q) => $q->where('status', 'dikembalikan'))
            ->where('created_at', '>=', $oneMonthAgo)
            ->latest()
            ->get();

        $totalRevenue = $reportItems->sum('subtotal');
        $totalOrders = $reportItems->groupBy('transaction_id')->count();

        $data = [
            'ownerName'    => Auth::user()->name,
            'reportDate'   => Carbon::now()->format('d M Y'),
            'startDate'    => $oneMonthAgo->format('d M Y'),
            'endDate'      => Carbon::now()->format('d M Y'),
            'items'        => $reportItems,
            'totalRevenue' => $totalRevenue,
            'totalOrders'  => $totalOrders,
        ];

        $pdf = Pdf::loadView('exports.financial_report', $data);

        return $pdf->download('Laporan_Keuangan_HiRent_' . Carbon::now()->format('Y-m') . '.pdf');
    }
}
