<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Tampilkan semua produk milik owner yang sedang login.
     */
    public function index()
    {
        $products = Product::with('category')
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id'          => $product->id,
                    'name'        => $product->name,
                    'description' => $product->description,
                    'price'       => $product->price,
                    'stock'       => $product->stock,
                    'image'       => $product->image ? Storage::url($product->image) : null,
                    'category'    => $product->category->name,
                ];
            });

        return Inertia::render('Owner/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Tampilkan form tambah produk baru.
     */
    public function create()
    {
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('Owner/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Simpan produk baru ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|integer|min:0',
            'stock'       => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        Product::create([
            'user_id'     => Auth::id(),
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'price'       => $validated['price'],
            'stock'       => $validated['stock'],
            'category_id' => $validated['category_id'],
            'image'       => $imagePath,
        ]);

        return redirect()->route('owner.products.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Tampilkan form edit produk.
     */
    public function edit(Product $product)
    {
        // Pastikan owner hanya bisa edit produk miliknya sendiri
        $this->authorizeProduct($product);

        $categories = Category::select('id', 'name')->get();

        return Inertia::render('Owner/Products/Edit', [
            'product'    => [
                'id'          => $product->id,
                'name'        => $product->name,
                'description' => $product->description,
                'price'       => $product->price,
                'stock'       => $product->stock,
                'category_id' => $product->category_id,
                'image'       => $product->image ? Storage::url($product->image) : null,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Update produk di database.
     */
    public function update(Request $request, Product $product)
    {
        $this->authorizeProduct($product);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|integer|min:0',
            'stock'       => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = $product->image; // default: tetap pakai foto lama

        if ($request->hasFile('image')) {
            // Hapus foto lama jika ada
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product->update([
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'price'       => $validated['price'],
            'stock'       => $validated['stock'],
            'category_id' => $validated['category_id'],
            'image'       => $imagePath,
        ]);

        return redirect()->route('owner.products.index')
            ->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Hapus produk dari database.
     */
    public function destroy(Product $product)
    {
        $this->authorizeProduct($product);

        // Hapus foto jika ada
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('owner.products.index')
            ->with('success', 'Produk berhasil dihapus.');
    }

    /**
     * Pastikan produk milik owner yang sedang login.
     */
    private function authorizeProduct(Product $product): void
    {
        if ($product->user_id !== Auth::id()) {
            abort(403, 'Kamu tidak memiliki akses ke produk ini.');
        }
    }
}
