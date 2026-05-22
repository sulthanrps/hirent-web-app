<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Simpan review baru.
     * Hanya bisa review produk yang sudah berstatus 'dikembalikan'.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'required|string|max:1000',
        ]);

        // Cek apakah member sudah pernah menyewa produk ini dan sudah dikembalikan
        $hasSentBack = Transaction::where('user_id', Auth::id())
            ->where('status', 'dikembalikan')
            ->whereHas('items', fn($q) => $q->where('product_id', $validated['product_id']))
            ->exists();

        if (!$hasSentBack) {
            return back()->with('error', 'Kamu hanya bisa review produk yang sudah dikembalikan.');
        }

        // Cek apakah sudah pernah review produk ini sebelumnya
        $alreadyReviewed = Review::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->exists();

        if ($alreadyReviewed) {
            return back()->with('error', 'Kamu sudah pernah memberikan review untuk produk ini.');
        }

        Review::create([
            'user_id'    => Auth::id(),
            'product_id' => $validated['product_id'],
            'rating'     => $validated['rating'],
            'comment'    => $validated['comment'],
        ]);

        return back()->with('success', 'Review berhasil ditambahkan. Terima kasih!');
    }

    /**
     * Update review yang sudah ada.
     */
    public function update(Request $request, Review $review)
    {
        $this->authorizeReview($review);

        $validated = $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review->update($validated);

        return back()->with('success', 'Review berhasil diperbarui.');
    }

    /**
     * Hapus review.
     */
    public function destroy(Review $review)
    {
        $this->authorizeReview($review);

        $review->delete();

        return back()->with('success', 'Review berhasil dihapus.');
    }

    /**
     * Pastikan review milik user yang sedang login.
     */
    private function authorizeReview(Review $review): void
    {
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Kamu tidak memiliki akses ke review ini.');
        }
    }
}
