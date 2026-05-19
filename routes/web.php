<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/products', function () {
        return Inertia::render('Product/Index'); // Nanti kita buat halamannya
    })->name('member.products');

    Route::get('/owner/dashboard', function () {
        return Inertia::render('Owner/Dashboard'); // Nanti kita buat halamannya
    })->name('owner.dashboard');

    Route::get('/cart', function () {
        return Inertia::render('Cart/Cart'); // Sesuai nama file Cart.jsx kamu
    })->name('member.cart');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
