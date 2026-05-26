import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, summary = {}, transactions = [], customerMetrics = {}, reviews = [] }) {
    
    const topProducts = useMemo(() => {
        const productCounts = {};
        transactions.forEach(trx => {
            if (trx.status !== 'pending') {
                trx.items.forEach(item => {
                    const name = item.product.name;
                    productCounts[name] = (productCounts[name] || 0) + item.quantity;
                });
            }
        });

        const sorted = Object.entries(productCounts)
            .map(([name, count], index) => ({ id: index + 1, name, rentCount: count }))
            .sort((a, b) => b.rentCount - a.rentCount)
            .slice(0, 5);

        const maxCount = sorted.length > 0 ? sorted[0].rentCount : 1;
        return sorted.map(p => ({ ...p, maxCount }));
    }, [transactions]);

    const displayReviews = reviews.length > 0 ? [...reviews, ...reviews] : [];

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

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0e0e2c]">Sales Overview</h1>
                        <p className="text-sm text-[#8C8CA1] mt-1">Your current sales summary and activity</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => window.open(route('owner.dashboard.exportPdf'), '_blank')}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white hover:bg-gray-50">
                            <i className="fa-solid fa-download"></i> Export
                        </button>
                        {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#0e0e2c] text-white rounded-lg text-sm font-semibold hover:bg-gray-800">
                            <i className="fa-solid fa-sliders"></i> Filter
                        </button> */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-[#0e0e2c] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold opacity-90">Total Income</h3>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                Rp {summary.total_revenue ? summary.total_revenue.toLocaleString('id-ID') : '0'}
                            </h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">All Time</span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-[#0e0e2c]">Active Rentals</h3>
                            </div>
                            <h2 className="text-3xl font-bold text-[#0e0e2c] mb-2">
                                {summary.total_disewakan || 0} Orders
                            </h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-[#8C8CA1]">Currently rented out</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-[#0e0e2c] text-lg">User Growth</h3>
                            {/* <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                                <button className="px-3 py-1 rounded-md text-gray-500 hover:text-black">A Week</button>
                                <button className="px-3 py-1 rounded-md bg-[#0e0e2c] text-white shadow">A Month</button>
                                <button className="px-3 py-1 rounded-md text-gray-500 hover:text-black">A Year</button>
                            </div> */}
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-5xl font-bold text-[#0e0e2c]">{customerMetrics.total?.toLocaleString('id-ID') || 0}</h2>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold mb-2 ${customerMetrics.growth_percentage >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {customerMetrics.growth_percentage >= 0 ? '↗' : '↙'} {customerMetrics.growth_percentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden relative">
                                <div className="bg-[#bbed3b] h-full rounded-full absolute top-0 left-0" style={{ width: `${Math.min(customerMetrics.growth_percentage || 5, 100)}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-[#8C8CA1] mt-3 font-medium">
                                <span>Total unique members</span>
                                <span className="text-black">+{customerMetrics.this_month || 0} this month</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-[#0e0e2c] text-lg">New Customers</h3>
                            <i className="fa-solid fa-ellipsis text-gray-400"></i>
                        </div>
                        
                        <div className="relative w-full max-w-[200px] mt-4">
                            <svg viewBox="0 0 100 50" className="w-full overflow-visible">
                                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#ECF1F4" strokeWidth="12" strokeLinecap="round" />
                                <path 
                                    d="M 10 50 A 40 40 0 0 1 90 50" 
                                    fill="none" stroke="#bbed3b" strokeWidth="12" strokeLinecap="round" 
                                    strokeDasharray="125" 
                                    strokeDashoffset={125 - (125 * (customerMetrics.this_month || 0) / (customerMetrics.total || 1))}
                                />
                            </svg>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <h2 className="text-4xl font-black text-[#0e0e2c]">{customerMetrics.this_month || 0}</h2>
                                <p className="text-xs text-[#8C8CA1] font-medium">in this month</p>
                            </div>
                        </div>

                        <div className="mt-8 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-600 flex items-center gap-2">
                            <span>Growth vs Last Month</span>
                            <span className={`px-2 py-0.5 rounded-full font-bold ${customerMetrics.growth_percentage >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {customerMetrics.growth_percentage >= 0 ? '↗' : '↙'} {customerMetrics.growth_percentage}%
                            </span>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-[#0e0e2c] text-xl">Top Rented Products</h3>
                                <p className="text-xs text-[#8C8CA1] mt-1">Leaderboard based on rental frequency</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 mt-4">
                            {topProducts.length > 0 ? (
                                topProducts.map((product, index) => {
                                    const percentage = (product.rentCount / product.maxCount) * 100;
                                    const barColor = index < 2 ? 'bg-[#3E5626]' : 'bg-[#ECF1F4]';
                                    const textColor = index < 2 ? 'text-white' : 'text-[#0e0e2c]';

                                    return (
                                        <div key={index} className="relative w-full h-12 flex items-center">
                                            <div 
                                                className={`absolute top-0 left-0 h-full rounded-r-xl rounded-l-md transition-all duration-1000 ${barColor}`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                            
                                            <div className="relative z-10 w-full flex justify-between items-center px-4">
                                                <div className={`flex items-center gap-4 ${textColor}`}>
                                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index < 2 ? 'bg-white text-[#3E5626]' : 'bg-white border border-gray-200'}`}>
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-semibold text-sm truncate max-w-[200px] sm:max-w-[300px]">{product.name}</span>
                                                </div>
                                                <div className="font-bold text-sm text-[#0e0e2c] hidden md:block">
                                                    {product.rentCount} <span className="text-xs font-normal text-gray-500">rented</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    Belum ada penyewaan.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6 z-10 bg-white pb-2">
                            <div>
                                <h3 className="font-bold text-[#0e0e2c] text-xl">Recent Reviews</h3>
                                <p className="text-xs text-[#8C8CA1] mt-1">What members say about your gears</p>
                            </div>
                        </div>

                        <div className="flex-grow overflow-hidden relative">
                            {displayReviews.length > 0 ? (
                                <>
                                    <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-10"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10"></div>

                                    <div className="animate-scroll-y flex flex-col gap-4 pt-2">
                                        {displayReviews.map((review, i) => (
                                            <div key={i} className="p-4 border border-[#ECF1F4] rounded-xl bg-[#FAFCFE]">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-[#FADD9B] flex items-center justify-center text-[#AB2A02] font-bold text-xs uppercase">
                                                            {review.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-[#0e0e2c] leading-none">{review.user}</h4>
                                                            <span className="text-[10px] text-[#8C8CA1] font-semibold truncate block max-w-[150px]">{review.product}</span>
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
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <i className="fa-regular fa-comment-dots text-3xl mb-2 text-gray-300"></i>
                                    <span className="text-sm">Belum ada ulasan</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}