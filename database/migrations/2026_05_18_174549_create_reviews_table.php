<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            
            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Member yang memberi review
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete(); // Produk yang di-review
            
            // Detail Review
            $table->tinyInteger('rating'); // Menggunakan tinyInteger untuk angka kecil (1-5) agar hemat penyimpanan
            $table->text('comment'); // Isi review
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
