<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $owner = User::create([
            'name' => 'Owner Hirent',
            'username' => 'owner_hirent',
            'email' => 'owner@hirent.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'phone_number' => '081234567890',
        ]);

        $member = User::create([
            'name' => 'Member Hirent',
            'username' => 'member_hirent',
            'email' => 'member@hirent.com',
            'password' => Hash::make('password123'),
            'role' => 'member',
            'phone_number' => '089876543210',
        ]);

        $kategoriTenda = Category::create(['name' => 'Tenda']);
        $kategoriSepatu = Category::create(['name' => 'Sepatu Gunung']);
        $kategoriCarrier = Category::create(['name' => 'Tas Carrier']);

        $produk1 = Product::create([
            'user_id' => $owner->id,
            'category_id' => $kategoriTenda->id,
            'name' => 'Tenda Consina Magnum 4',
            'description' => 'Tenda kapasitas 4 orang, double layer, aman dari badai dan hujan deras.',
            'price' => 50000, // Rp 50.000 / hari
            'stock' => 5,
        ]);

        $produk2 = Product::create([
            'user_id' => $owner->id,
            'category_id' => $kategoriCarrier->id,
            'name' => 'Carrier Eiger 60L',
            'description' => 'Tas carrier super nyaman untuk pendakian 3-4 hari. Backsystem empuk.',
            'price' => 35000, 
            'stock' => 3,
        ]);

        Transaction::create([
            'user_id' => 2, 
            'product_id' => 1, 
            'quantity' => 1,
            'total_price' => 75000,
            'payment_method' => 'gopay',
            'payment_status' => 'settlement',
            'rent_date' => now(),
            'return_date' => now()->addDays(3),
        ]);

        Transaction::create([
            'user_id' => 2,
            'product_id' => 2,
            'quantity' => 2,
            'total_price' => 120000,
            'payment_method' => 'bank_transfer',
            'payment_status' => 'pending',
            'rent_date' => now()->addDays(5),
            'return_date' => now()->addDays(7),
        ]);

        Review::create([
            'user_id' => $member->id,
            'product_id' => $produk1->id,
            'rating' => 5,
            'comment' => 'Barangnya masih sangat bagus dan terawat, tendanya sama sekali tidak bocor!',
        ]);
    }
}
