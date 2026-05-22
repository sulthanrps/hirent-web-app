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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            
            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Ini adalah Member (penyewa)
            $table->integer('total_price'); // Total harga (quantity * harga produk)
            $table->enum('status', ['pending', 'disewakan', 'dikembalikan'])->default('pending');
            $table->string('payment_method');
            $table->string('payment_status')->default('pending');
            $table->date('rent_date');
            $table->date('return_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
