<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Tampilkan semua kategori.
     */
    public function index()
    {
        $categories = Category::withCount('products')->latest()->get();

        return Inertia::render('Owner/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Simpan kategori baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create(['name' => $request->name]);

        return redirect()->route('owner.categories.index')
            ->with('success', 'Kategori berhasil ditambahkan.');
    }

    /**
     * Update kategori.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update(['name' => $request->name]);

        return redirect()->route('owner.categories.index')
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Hapus kategori.
     * Tidak bisa dihapus jika masih ada produk yang menggunakannya
     * (sudah dihandle oleh restrictOnDelete di migration).
     */
    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return redirect()->route('owner.categories.index')
                ->with('error', 'Kategori tidak bisa dihapus karena masih digunakan oleh produk.');
        }

        $category->delete();

        return redirect()->route('owner.categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
