<?php

use App\Http\Controllers\Owner\ProductController as OwnerProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Owner\CategoryController as OwnerCategoryController;
use App\Http\Controllers\Member\CartController;
use App\Http\Controllers\Member\TransactionController as MemberTransactionController;
use App\Http\Controllers\Owner\TransactionController as OwnerTransactionController;
use App\Http\Controllers\Member\ReviewController;

// =============================================
// PUBLIC ROUTES
// =============================================
Route::get('/', function () {
    if (Auth::check()) {
        if (Auth::user()->role === 'owner') {
            return redirect()->route('owner.dashboard');
        }
        
        return redirect()->route('member.products');
    }

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// =============================================
// AUTH ROUTES (butuh login)
// =============================================
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('verified')->name('dashboard');

    Route::get('/product-catalogue', [\App\Http\Controllers\Member\ProductController::class, 'index'])
    ->middleware('verified')
    ->name('product.index');

    // --- Profile ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // =============================================
    // MEMBER ROUTES
    // =============================================
    Route::middleware('member')->group(function () {

        Route::get('/products', [\App\Http\Controllers\Member\ProductController::class, 'index'])->name('member.products');

        Route::get('/products/{product}', [\App\Http\Controllers\Member\ProductController::class, 'show'])->name('member.products.show');

        Route::get('/products/{id}', function ($id) {
            return Inertia::render('Product/Detail', [
                'productId' => $id
            ]);
        })->name('member.products.detail');

        Route::get('/cart', [CartController::class, 'index'])->name('member.cart');
        Route::post('/cart', [CartController::class, 'store'])->name('member.cart.store');
        Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('member.cart.update');
        Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('member.cart.destroy');

        Route::get('/checkout', [MemberTransactionController::class, 'checkout'])->name('member.checkout');
        Route::post('/checkout', [MemberTransactionController::class, 'store'])->name('member.checkout.store');

        Route::get('/profile/transactions', [MemberTransactionController::class, 'index'])->name('profile.transactions');

        Route::post('/reviews', [ReviewController::class, 'store'])->name('member.reviews.store');
        Route::patch('/reviews/{review}', [ReviewController::class, 'update'])->name('member.reviews.update');
        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('member.reviews.destroy');
    });

    // =============================================
    // OWNER ROUTES
    // =============================================
    Route::middleware('owner')->prefix('owner')->name('owner.')->group(function () {

        Route::get('/dashboard', [OwnerTransactionController::class, 'index'])->name('dashboard');

        Route::get('/rentals', [OwnerTransactionController::class, 'rentals'])->name('rentals');

        Route::patch('/transactions/{transaction}/status', [OwnerTransactionController::class, 'updateStatus'])->name('transactions.updateStatus');

        Route::resource('products', OwnerProductController::class);
        Route::resource('categories', OwnerCategoryController::class)->except(['show', 'create', 'edit']);
    });

});

require __DIR__ . '/auth.php';