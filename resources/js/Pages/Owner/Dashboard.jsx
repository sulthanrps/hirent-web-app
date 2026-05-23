import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    // DUMMY DATA: Leaderboard Top 5 Produk
    const topProducts = [
        { id: 1, name: "Tenda Dome 4 Orang", rentCount: 124, maxCount: 150 },
        { id: 2, name: "Carrier Osprey 65L", rentCount: 98, maxCount: 150 },
        { id: 3, name: "Sleeping Bag Polar", rentCount: 75, maxCount: 150 },
        { id: 4, name: "Matras Foil", rentCount: 60, maxCount: 150 },
        { id: 5, name: "Kompor Portable", rentCount: 42, maxCount: 150 },
    ];

    const recentReviews = [
        { id: 1, user: "Andi S.", product: "Tenda Dome 4 Orang", rating: 5, comment: "Tendanya bersih banget dan ga bocor pas ujan deras di Ranu Kumbolo!" },
        { id: 2, user: "Budi P.", product: "Carrier Osprey 65L", rating: 4, comment: "Resleting aman semua, bantalan punggungnya masih empuk. Mantap." },
        { id: 3, user: "Citra L.", product: "Sleeping Bag Polar", rating: 5, comment: "Anget banget buat muncak ke Sindoro, wangi juga pas disewa." },
        { id: 4, user: "Dimas A.", product: "Kompor Portable", rating: 4, comment: "Apinya biru, cuman pemantiknya kadang nyangkut dikit." },
        { id: 5, user: "Andi S.", product: "Tenda Dome 4 Orang", rating: 5, comment: "Tendanya bersih banget dan ga bocor pas ujan deras di Ranu Kumbolo!" },
        { id: 6, user: "Budi P.", product: "Carrier Osprey 65L", rating: 4, comment: "Resleting aman semua, bantalan punggungnya masih empuk. Mantap." },
    ];

    return (
        <MainLayout user={auth.user}>
            <Head title="Owner Dashboard" />

            <style>{`
                @keyframes scrollY {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll-y {
                    animation: scrollY 15s linear infinite;
                }
                .animate-scroll-y:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="p-6 md:p-10 md:pt-2 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0e0e2c]">Sales Overview</h1>
                        <p className="text-sm text-[#8C8CA1] mt-1">Your current sales summary and activity</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white hover:bg-gray-50">
                            <i className="fa-solid fa-download"></i> Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#0e0e2c] text-white rounded-lg text-sm font-semibold hover:bg-gray-800">
                            <i className="fa-solid fa-sliders"></i> Filter
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-[#0e0e2c] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold opacity-90">Total Income</h3>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Rp 4.587.000</h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                                    ↗ +15%
                                </span>
                                <span className="opacity-70">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-[#0e0e2c]">Active Rentals</h3>
                                <i className="fa-solid fa-ellipsis text-gray-400"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#0e0e2c] mb-2">24 Orders</h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                                    ↙ -4%
                                </span>
                                <span className="text-[#8C8CA1]">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-[#0e0e2c] text-lg">User Growth</h3>
                            
                            <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                                <button className="px-3 py-1 rounded-md text-gray-500 hover:text-black">A Week</button>
                                <button className="px-3 py-1 rounded-md bg-[#0e0e2c] text-white shadow">A Month</button>
                                <button className="px-3 py-1 rounded-md text-gray-500 hover:text-black">A Year</button>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-5xl font-bold text-[#0e0e2c]">1,230</h2>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold mb-2">↗ +15%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden relative">
                                <div className="bg-[#bbed3b] h-full w-[65%] rounded-full absolute top-0 left-0"></div>
                            </div>
                            <div className="flex justify-between text-xs text-[#8C8CA1] mt-3 font-medium">
                                <span>Total growth checked</span>
                                <span className="text-black">+120 this month</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 pt-0 shadow-sm flex flex-col items-center justify-center">
                        <div className="w-full flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-[#0e0e2c] text-lg">New Customers</h3>
                            <i className="fa-solid fa-ellipsis text-gray-400"></i>
                        </div>
                        
                        <div className="relative w-full max-w-[200px] mt-4">
                            <svg viewBox="0 0 100 50" className="w-full overflow-visible">
                                
                                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#ECF1F4" strokeWidth="12" strokeLinecap="round" />
                                
                                <path d="M 10 50 A 40 40 0 0 1 70 15" fill="none" stroke="#bbed3b" strokeWidth="12" strokeLinecap="round" />
                            </svg>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <h2 className="text-4xl font-black text-[#0e0e2c]">120</h2>
                                <p className="text-xs text-[#8C8CA1] font-medium">in this month</p>
                            </div>
                        </div>

                        <div className="mt-8 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-600 flex items-center gap-2">
                            <span>Your new customer volume has increased</span>
                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold"> +15%</span>
                        </div>
                    </div>

                </div>

                {/* === BOTTOM GRID === */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEADERBOARD (Kiri - Span 7) */}
                    <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-[#0e0e2c] text-xl">Top Rented Products</h3>
                                <p className="text-xs text-[#8C8CA1] mt-1">Leaderboard based on rental frequency</p>
                            </div>
                            <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-600">
                                This Month <i className="fa-solid fa-chevron-down ml-1"></i>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 mt-4">
                            {topProducts.map((product, index) => {
                                // Hitung persentase untuk panjang bar
                                const percentage = (product.rentCount / product.maxCount) * 100;
                                // Tentukan warna berdasarkan ranking (Juara 1 & 2 pakai warna hijau khas)
                                const barColor = index < 2 ? 'bg-[#3E5626]' : 'bg-[#ECF1F4]';
                                const textColor = index < 2 ? 'text-white' : 'text-[#0e0e2c]';

                                return (
                                    <div key={product.id} className="relative w-full h-12 flex items-center">
                                        {/* Background Progress Bar */}
                                        <div 
                                            className={`absolute top-0 left-0 h-full rounded-r-xl rounded-l-md transition-all duration-1000 ${barColor}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                        
                                        {/* Konten Text di atas Bar */}
                                        <div className="relative z-10 w-full flex justify-between items-center px-4">
                                            
                                            {/* BAGIAN KIRI: Rank & Nama (Warna putih untuk juara 1 & 2) */}
                                            <div className={`flex items-center gap-4 ${textColor}`}>
                                                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index < 2 ? 'bg-white text-[#3E5626]' : 'bg-white border border-gray-200'}`}>
                                                    #{index + 1}
                                                </span>
                                                <span className="font-semibold text-sm">{product.name}</span>
                                            </div>

                                            {/* BAGIAN KANAN: Angka (Dibuat selalu gelap agar terbaca di background putih) */}
                                            <div className="font-bold text-sm text-[#0e0e2c]">
                                                {product.rentCount} <span className="text-xs font-normal text-gray-500">rented</span>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6 z-10 bg-white pb-2">
                            <div>
                                <h3 className="font-bold text-[#0e0e2c] text-xl">Recent Reviews</h3>
                                <p className="text-xs text-[#8C8CA1] mt-1">What members say about your gears</p>
                            </div>
                            <i className="fa-solid fa-ellipsis text-gray-400"></i>
                        </div>

                        <div className="flex-grow overflow-hidden relative">
                            
                            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10"></div>

                            <div className="animate-scroll-y flex flex-col gap-4 pt-2">
                                {recentReviews.map((review, i) => (
                                    <div key={i} className="p-4 border border-[#ECF1F4] rounded-xl bg-[#FAFCFE]">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#FADD9B] flex items-center justify-center text-[#AB2A02] font-bold text-xs">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-[#0e0e2c] leading-none">{review.user}</h4>
                                                    <span className="text-[10px] text-[#8C8CA1] font-semibold">{review.product}</span>
                                                </div>
                                            </div>
                                            <div className="flex text-[#FADD9B] text-xs">
                                                {[...Array(5)].map((star, idx) => (
                                                    <i key={idx} className={`fa-star ${idx < review.rating ? 'fa-solid' : 'fa-regular'}`}></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}