import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard'; 
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth }) {
    // DUMMY DATA untuk Owner (bisa ditambahkan properti stock nantinya)
    const dummyProducts = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        category: { name: 'TENDA & SHELTER' },
        name: 'Naturehike Cloud Up 2 Person Ultralight Tent',
        price: index === 0 || index === 5 ? 25000 : 35000, 
        image: '/assets/tenda.jpg',
        stock: 5 // Informasi tambahan yang berguna untuk view Owner
    }));

    const [products] = useState(dummyProducts);

    return (
        <MainLayout user={auth.user}>
            <Head title="Manage Products" />

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === HEADER & ACTIONS (Search & Add Button) === */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#0e0e2c]">My Products</h1>
                        <p className="text-sm text-[#8C8CA1] mt-1">Manage your rental catalog and inventory <span className="font-bold text-[#0e0e2c]">({products.length} items)</span></p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64">
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0e0e2c] focus:border-[#0e0e2c] outline-none transition-shadow"
                            />
                        </div>
                        
                        {/* Add New Product Button */}
                        <Link 
                            href={route('owner.products.create')} 
                            className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#3E5626] hover:bg-[#2d401b] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                        >
                            <i className="fa-solid fa-plus"></i> Add Product
                        </Link>
                    </div>
                </div>

                {/* === PRODUCT GRID === */}
                {/* Karena sidebar hilang, kita bisa melebarkan grid hingga 4 kolom di layar besar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-[30px]">
                    {products.map((product) => (
                        <div key={product.id} className="relative group">
                            {/* Bungkus kartu dengan Link mengarah ke route EDIT */}
                            <Link href={route('owner.products.edit', product.id)} className="block transition-transform duration-300 hover:-translate-y-1">
                                
                                <ProductCard product={product} isOwner={true} />

                                {/* Overlay Edit Icon (Muncul saat di-hover) */}
                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#AB2A02] opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                                    <i className="fa-solid fa-pen text-sm"></i>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

                {/* === PAGINATION BUTTONS === */}
                <ul className="flex justify-center items-center gap-2.5 mt-12 mb-5 flex-wrap">
                    <li>
                        <button className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    </li>
                    <li>
                        <button className="flex justify-center items-center min-w-9 h-9 px-2.5 bg-[#AB2A02] text-white border border-[#AB2A02] font-bold text-sm rounded">
                            1
                        </button>
                    </li>
                    <li>
                        <button className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                            2
                        </button>
                    </li>
                    <li>
                        <button className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                            3
                        </button>
                    </li>
                    <li>
                        <span className="flex justify-center items-center min-w-9 h-9 px-2.5 text-[#8C8CA1] font-bold text-sm cursor-default">
                            ...
                        </span>
                    </li>
                    <li>
                        <button className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </li>
                </ul>

            </div>
        </MainLayout>
    );
}