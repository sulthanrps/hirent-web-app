import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard'; 
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react'; // 1. Wajib import useState

export default function Index({ auth, products }) {
    
    const [searchQuery, setSearchQuery] = useState('');

    const formattedProducts = products.map(p => ({
        ...p,
        category: { name: p.category },
        image: p.image || '/assets/mountain_icon.png'
    }));

    const filteredProducts = formattedProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout user={auth.user}>
            <Head title="Manage Products" />

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === HEADER & ACTIONS === */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#0e0e2c]">My Products</h1>
                        <p className="text-sm text-[#8C8CA1] mt-1">
                            Manage your rental catalog and inventory 
                            <span className="font-bold text-[#0e0e2c]"> ({filteredProducts.length} items)</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64">
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0e0e2c] focus:border-[#0e0e2c] outline-none transition-shadow"
                            />
                            
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0e0e2c]"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        
                        <Link 
                            href={route('owner.products.create')} 
                            className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#3E5626] hover:bg-[#2d401b] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                        >
                            <i className="fa-solid fa-plus"></i> Add Product
                        </Link>
                    </div>
                </div>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-[30px]">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="relative group">
                                <Link href={route('owner.products.edit', product.id)} className="block transition-transform duration-300 hover:-translate-y-1">
                                    
                                    <ProductCard product={product} isOwner={true} />

                                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#AB2A02] opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                                        <i className="fa-solid fa-pen text-sm"></i>
                                    </div>

                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 py-20 px-4 text-center shadow-sm">
                        
                        {formattedProducts.length === 0 ? (
                            <>
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                    <i className="fa-solid fa-box-open text-3xl"></i>
                                </div>
                                <h2 className="text-xl font-bold text-[#0e0e2c] mb-2">Belum ada produk</h2>
                                <p className="text-[#8C8CA1] text-sm max-w-sm mb-6">
                                    Katalog penyewaanmu masih kosong. Mulai tambahkan perlengkapan pertamamu agar member bisa menyewanya!
                                </p>
                                <Link 
                                    href={route('owner.products.create')} 
                                    className="bg-[#0e0e2c] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <i className="fa-solid fa-plus mr-2"></i> Tambah Produk Sekarang
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                    <i className="fa-solid fa-magnifying-glass-minus text-3xl"></i>
                                </div>
                                <h2 className="text-xl font-bold text-[#0e0e2c] mb-2">Produk tidak ditemukan</h2>
                                <p className="text-[#8C8CA1] text-sm max-w-sm mb-6">
                                    Kami tidak menemukan produk yang cocok dengan kata kunci "{searchQuery}".
                                </p>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="border border-[#0e0e2c] text-[#0e0e2c] hover:bg-gray-50 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    Hapus Pencarian
                                </button>
                            </>
                        )}

                    </div>
                )}

            </div>
        </MainLayout>
    );
}