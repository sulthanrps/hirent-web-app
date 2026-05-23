<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Tampilkan katalog produk untuk Member / Publik.
     */
    public function index(Request $request)
    {
        // Mulai query dengan memanggil relasi category
        $query = Product::with('category');

        // 1. Fitur Search (Opsional, jika member mencari lewat search bar)
        if ($request->has('search') && $request->search != '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // 2. Fitur Filter Kategori (Opsional)
        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        // Ambil data produk terbaru
        $products = $query->latest()->get()->map(function ($product) {
            return [
                'id'          => $product->id,
                'name'        => $product->name,
                'description' => $product->description,
                'price'       => $product->price,
                'stock'       => $product->stock,
                // Pastikan format gambarnya sama dengan komponen ProductCard
                'image'       => $product->image ? asset('storage/' . $product->image) : null,
                // Bungkus category name ke dalam array object agar dibaca oleh ProductCard.jsx
                'category'    => [
                    'name' => $product->category->name
                ]
            ];
        });

        // Ambil data kategori untuk ditampilkan di Sidebar Filter Member
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('Product/Index', [
            'products'   => $products,
            'categories' => $categories,
            'filters'    => $request->only(['search', 'category']), // Kirim kembali filter yang sedang aktif
        ]);
    }

    /**
     * Tampilkan halaman detail produk.
     */
    public function show(Product $product)
    {
        // Load relasi kategori agar nama kategorinya terbaca
        $product->load('category');

        // Ambil produk lain di kategori yang sama untuk bagian "Produk Lain" (Maksimal 4)
        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id) // Hindari menampilkan produk yang sedang dilihat
            ->inRandomOrder()
            ->take(4)
            ->get()
            ->map(function ($p) {
                return [
                    'id'       => $p->id,
                    'name'     => $p->name,
                    'price'    => $p->price,
                    'image'    => $p->image ? asset('storage/' . $p->image) : null,
                    'category' => ['name' => $p->category->name],
                ];
            });

        // Format data produk yang sedang dilihat
        $formattedProduct = [
            'id'          => $product->id,
            'name'        => $product->name,
            'description' => $product->description,
            'price'       => $product->price,
            'stock'       => $product->stock,
            'image'       => $product->image ? asset('storage/' . $product->image) : null,
            'category'    => ['name' => $product->category->name],
        ];

        return Inertia::render('Product/Detail', [
            'product'         => $formattedProduct,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}