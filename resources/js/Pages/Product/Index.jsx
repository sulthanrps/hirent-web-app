import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard'; 
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth }) {
    // Sesuaikan susunan data dummy agar cocok dengan skema variabel di ProductCard.jsx
    const dummyProducts = Array.from({ length: 9 }, (_, index) => ({
        id: index + 1,
        category: { name: 'TENDA & SHELTER' },
        name: 'Naturehike Cloud Up 2 Person Ultralight Tent',
        // Card 1 dan Card 6 disetel 25rb (di bawah 30rb) supaya badge PROMO otomatis aktif
        price: index === 0 || index === 5 ? 25000 : 35000, 
        image: '/assets/tenda.jpg',
    }));

    const [products] = useState(dummyProducts);

    return (
        <MainLayout user={auth.user}>
            <Head title="Product Display" />

            {/* Layout Utama: Sidebar Kiri & Konten Kanan */}
            <div className="flex flex-col lg:flex-row gap-[30px] min-h-screen w-full bg-white font-['Work_Sans'] text-[#0e0e2c]">
                
                {/* SIDEBAR FILTERS (KIRI) */}
                <aside className="w-full lg:w-[250px] flex-shrink-0 bg-[#ecf1f4] p-[25px_30px] h-fit rounded-xl lg:rounded-none">
                    {/* Filter Kategori */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Kategori</h3>
                        <div className="flex flex-col gap-3">
                            {['Semua Barang', 'Ransel & Carrier', 'Tenda & Shelter', 'Sepatu Gunung', 'Pakaian & Jaket', 'Alat Masak'].map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter Merek */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Merek</h3>
                        <div className="flex flex-col gap-3">
                            {['The North Face', 'Osprey', 'Eiger', 'Naturehike'].map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter Harga */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Harga Sewa / Hari</h3>
                        <div className="flex flex-col gap-3">
                            {['Di bawah Rp 20.000', 'Rp 20.000 - Rp 50.000', 'Di atas Rp 50.000'].map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button className="w-full bg-[#0e0e2c] text-white py-3 border-none rounded-lg font-bold text-sm tracking-wider hover:bg-black transition-colors">
                        Apply
                    </button>
                </aside>

                {/* CONTENT AREA (KANAN) */}
                <section className="flex-1 min-w-0 mt-6 mb-[60px] lg:pr-10 px-4 lg:px-0">
                    
                    {/* Content Header */}
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-lg font-extrabold text-[#0e0e2c]">
                            Perlengkapan Tersedia <span className="text-xs font-normal text-[#8C8CA1] ml-1">(124)</span>
                        </h1>
                        <div className="text-xs text-[#8C8CA1] flex items-center gap-2">
                            Urutkan: 
                            <div className="border border-[#ecf1f4] p-[8px_12px] rounded-lg bg-white">
                                <select className="border-none font-bold text-xs text-[#0e0e2c] cursor-pointer outline-none bg-transparent pr-2">
                                    <option>Paling Populer</option>
                                    <option>Harga Terendah</option>
                                    <option>Harga Tertinggi</option>
                                    <option>Terbaru</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT GRID - ROW ATAS (Card 1 sampai 6) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[30px]">
                        {products.slice(0, 6).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* BUNDLE BANNER PROMO */}
                    <div className="bg-[#FADD9B] rounded-xl p-5 md:p-10 md:pr-0 flex flex-col md:flex-row items-center justify-between my-10 relative">
                        {/* Star Ornament */}
                        <img src="/assets/star.svg" alt="star" className="absolute -top-7 -left-7 w-[70px] h-[70px] hidden md:block" />
                        
                        {/* Banner Left */}
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <h2 className="text-4xl font-extrabold mb-2 text-[#0e0e2c]">Best Deal !</h2>
                            <div className="text-xl font-black text-[#AB2A02] mb-4">Rp. 250.000 / hari</div>
                            <button className="bg-[#AB2A02] hover:bg-[#912c0c] text-white font-bold text-xs p-[10px_30px] rounded border-none w-full md:w-auto transition-colors">
                                SEWA
                            </button>
                        </div>

                        {/* Banner Middle */}
                        <div className="flex-1 px-0 md:px-5 mb-6 md:mb-0 text-center md:text-left">
                            <h3 className="text-xl font-bold mb-2 text-[#0e0e2c]">Paket Bundling</h3>
                            <ul className="text-sm md:text-base leading-loose font-medium text-[#0e0e2c]">
                                <li>1. Hiking Backpack</li>
                                <li>2. Mountain Shoes</li>
                                <li>3. Anti Slippery Sandals</li>
                                <li>4. Linen Comfy Trousers</li>
                                <li>5. Windproof Jacket</li>
                                <li>6. Tongkat, Senter, dll.</li>
                            </ul>
                        </div>

                        {/* Banner Right */}
                        <div className="flex-[1.5] w-full md:w-auto flex justify-center md:justify-end">
                            <img src="/assets/bundle-img.png" alt="Bundle" className="w-full max-w-[280px] md:max-w-full rounded-lg object-contain mix-blend-multiply" />
                        </div>
                    </div>

                    {/* PRODUCT GRID - ROW BAWAH (Card 7 sampai 9) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[30px]">
                        {products.slice(6, 9).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* PAGINATION BUTTONS */}
                    <ul className="flex justify-center items-center gap-2.5 mt-12 mb-5 flex-wrap">
                        <li>
                            <a href="#" className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                                <i className="fa-solid fa-angle-left"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex justify-center items-center min-w-9 h-9 px-2.5 bg-[#AB2A02] text-white border border-[#AB2A02] font-bold text-sm rounded">
                                1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                                2
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                                3
                            </a>
                        </li>
                        <li>
                            <span className="flex justify-center items-center min-w-9 h-9 px-2.5 text-[#8C8CA1] font-bold text-sm cursor-default">
                                ...
                            </span>
                        </li>
                        <li>
                            <a href="#" className="flex justify-center items-center min-w-9 h-9 px-2.5 border border-[#ecf1f4] bg-white text-[#0e0e2c] font-bold text-sm rounded hover:border-[#AB2A02] hover:text-[#AB2A02] transition-all">
                                <i className="fa-solid fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>

                </section>
            </div>
        </MainLayout>
    );
}