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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); 
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            
            // Data Produk
            $table->string('name');
            $table->text('description'); 
            $table->integer('price'); 
            $table->integer('stock'); 
            $table->string('image')->nullable(); // Hanya menyimpan path/nama file foto
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
