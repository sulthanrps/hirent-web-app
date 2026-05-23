import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard'; 
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, products = [], categories = [] }) {
    
    const [selectedCategory, setSelectedCategory] = useState('Semua Barang');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const handleBrandChange = (brandName) => {
        setSelectedBrands(prev => 
            prev.includes(brandName) 
                ? prev.filter(b => b !== brandName) 
                : [...prev, brandName]
        );
    };

    const handlePriceChange = (priceLabel) => {
        setSelectedPrices(prev => 
            prev.includes(priceLabel) 
                ? prev.filter(p => p !== priceLabel) 
                : [...prev, priceLabel]
        );
    };

    const filteredProducts = products.filter(product => {
        const matchCategory = selectedCategory === 'Semua Barang' || product.category.name === selectedCategory;

        // const matchBrand = selectedBrands.length === 0 || selectedBrands.some(brand => 
        //     product.name.toLowerCase().includes(brand.toLowerCase())
        // );

        const matchPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
            if (range === 'Di bawah Rp 20.000') return product.price < 20000;
            if (range === 'Rp 20.000 - Rp 50.000') return product.price >= 20000 && product.price <= 50000;
            if (range === 'Di atas Rp 50.000') return product.price > 50000;
            return false;
        });

        return matchCategory && matchPrice;
    });

    const [sortBy, setSortBy] = useState('Paling Populer');

    const getSortedProducts = (items) => {
        const itemsCopy = [...items];
        if (sortBy === 'Harga Terendah') {
            return itemsCopy.sort((a, b) => a.price - b.price);
        }
        if (sortBy === 'Harga Tertinggi') {
            return itemsCopy.sort((a, b) => b.price - a.price);
        }
        if (sortBy === 'Terbaru') {
            return itemsCopy.sort((a, b) => b.id - a.id);
        }
        return itemsCopy; // Default (Paling Populer)
    };

    const sortedProducts = getSortedProducts(filteredProducts);

    const categoryList = ['Semua Barang', ...categories.map(c => c.name)];
    const brandList = ['The North Face', 'Osprey', 'Eiger', 'Naturehike'];
    const priceList = ['Di bawah Rp 20.000', 'Rp 20.000 - Rp 50.000', 'Di atas Rp 50.000'];

    return (
        <MainLayout user={auth.user}>
            <Head title="Product Display" />

            <div className="flex flex-col lg:flex-row gap-[30px] min-h-screen w-full bg-white font-['Work_Sans'] text-[#0e0e2c]">
                
                <aside className="w-full lg:w-[250px] flex-shrink-0 bg-[#ecf1f4] p-[25px_30px] h-fit rounded-xl lg:rounded-none">
                    
                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Kategori</h3>
                        <div className="flex flex-col gap-3">
                            {categoryList.map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategory === item}
                                        onChange={() => handleCategoryChange(item)}
                                        className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" 
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Merek</h3>
                        <div className="flex flex-col gap-3">
                            {brandList.map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedBrands.includes(item)}
                                        onChange={() => handleBrandChange(item)}
                                        className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" 
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div> */}

                    <div className="mb-6">
                        <h3 className="text-sm font-bold mb-4 text-[#111]">Harga Sewa / Hari</h3>
                        <div className="flex flex-col gap-3">
                            {priceList.map((item, idx) => (
                                <label key={idx} className="flex items-center gap-2.5 text-xs text-[#444] cursor-pointer font-medium">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedPrices.includes(item)}
                                        onChange={() => handlePriceChange(item)}
                                        className="w-4 h-4 cursor-pointer accent-[#AB2A02] rounded" 
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    
                    <button 
                        onClick={() => {
                            setSelectedCategory('Semua Barang');
                            setSelectedBrands([]);
                            setSelectedPrices([]);
                        }}
                        className="w-full bg-[#0e0e2c] text-white py-3 border-none rounded-lg font-bold text-sm tracking-wider hover:bg-black transition-colors"
                    >
                        Reset Filter
                    </button>
                </aside>

                <section className="flex-1 min-w-0 mt-6 mb-[60px] lg:pr-10 px-4 lg:px-0">
                    
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-lg font-extrabold text-[#0e0e2c]">
                            Perlengkapan Tersedia <span className="text-xs font-normal text-[#8C8CA1] ml-1">({filteredProducts.length})</span>
                        </h1>
                        <div className="text-xs text-[#8C8CA1] flex items-center gap-2">
                            Urutkan: 
                            <div className="border border-[#ecf1f4] p-[8px_12px] rounded-lg bg-white">
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border-none font-bold text-xs text-[#0e0e2c] cursor-pointer outline-none bg-transparent pr-2"
                                >
                                    <option value="Paling Populer">Paling Populer</option>
                                    <option value="Harga Terendah">Harga Terendah</option>
                                    <option value="Harga Tertinggi">Harga Tertinggi</option>
                                    <option value="Terbaru">Terbaru</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[30px]">
                        {sortedProducts.slice(0, 6).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="bg-[#FADD9B] rounded-xl p-5 md:p-10 md:pr-0 flex flex-col md:flex-row items-center justify-between my-10 relative">
                        <img src="/assets/star.svg" alt="star" className="absolute -top-7 -left-7 w-[70px] h-[70px] hidden md:block" />
                        
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <h2 className="text-4xl font-extrabold mb-2 text-[#0e0e2c]">Best Deal !</h2>
                            <div className="text-xl font-black text-[#AB2A02] mb-4">Rp. 250.000 / hari</div>
                            <button className="bg-[#AB2A02] hover:bg-[#912c0c] text-white font-bold text-xs p-[10px_30px] rounded border-none w-full md:w-auto transition-colors">
                                SEWA
                            </button>
                        </div>

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

                        <div className="flex-[1.5] w-full md:w-auto flex justify-center md:justify-end">
                            <img src="/assets/bundle-img.png" alt="Bundle" className="w-full max-w-[280px] md:max-w-full rounded-lg object-contain mix-blend-multiply" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[30px]">
                        {sortedProducts.slice(6).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-10 text-gray-500 font-medium">
                                Yah, perlengkapan yang kamu cari belum tersedia.
                            </div>
                        )}
                    </div>

                    {filteredProducts.length > 0 && (
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
                    )}

                </section>
            </div>
        </MainLayout>
    );
}