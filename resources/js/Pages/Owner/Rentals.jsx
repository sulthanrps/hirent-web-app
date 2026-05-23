import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Rentals({ auth }) {
    const [rentals, setRentals] = useState([
        { id: 'TRX-99321', customer: 'Andi Saputra', email: 'andi.saputra@gmail.com', status: 'pending', price: 150000, product: 'Tenda Dome 4 Orang', qty: 1, rentDate: '24 May', returnDate: '26 May' },
        { id: 'TRX-99322', customer: 'Budi Prakoso', email: 'budipra@ub.ac.id', status: 'disewakan', price: 240000, product: 'Carrier Osprey 65L', qty: 2, rentDate: '20 May', returnDate: '25 May' },
        { id: 'TRX-99323', customer: 'Citra Lestari', email: 'citralestari@yahoo.com', status: 'pending', price: 75000, product: 'Sleeping Bag Polar', qty: 3, rentDate: '28 May', returnDate: '30 May' },
        { id: 'TRX-99324', customer: 'Dimas Anggara', email: 'dimas.ang@gmail.com', status: 'dikembalikan', price: 60000, product: 'Matras Foil', qty: 4, rentDate: '15 May', returnDate: '17 May' },
        { id: 'TRX-99325', customer: 'Eka Wijaya', email: 'ekawijaya99@gmail.com', status: 'pending', price: 45000, product: 'Kompor Portable', qty: 1, rentDate: '01 Jun', returnDate: '03 Jun' },
    ]);

    // Fungsi helper untuk warna badge status
    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending':
                return 'bg-[#FFF4E5] text-[#FF9800]'; // Kuning/Orange lembut
            case 'disewakan':
                return 'bg-[#E8F5E9] text-[#4CAF50]'; // Hijau terang
            case 'dikembalikan':
                return 'bg-[#F3F4F6] text-[#8C8CA1]'; // Abu-abu
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Rental Requests" />

            <div className="p-6 md:p-10 md:pt-2 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === TOP CONTROLS === */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    {/* Filter Kiri (Sort) */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">
                        <i className="fa-solid fa-sort-amount-down"></i>
                        <span>Newest</span>
                        <i className="fa-solid fa-chevron-down text-xs ml-2"></i>
                    </div>

                    {/* Search Bar (Tengah) */}
                    <div className="flex-1 max-w-md w-full relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            placeholder="Search order ID or customer..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0e0e2c] focus:border-[#0e0e2c] outline-none transition-shadow"
                        />
                    </div>

                    {/* Filter Kanan */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
                            <i className="fa-solid fa-sliders"></i> Filter
                        </button>
                    </div>
                </div>

                {/* === TABLE SECTION === */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-[#8C8CA1] text-xs uppercase tracking-wider font-semibold">
                                    <th className="p-4 px-6">Order ID</th>
                                    <th className="p-4 px-6">Customer Name</th>
                                    <th className="p-4 px-6 text-center">Status</th>
                                    <th className="p-4 px-6">Total Price</th>
                                    <th className="p-4 px-6">Rented Item</th>
                                    <th className="p-4 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {rentals.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                        
                                        {/* Order ID */}
                                        <td className="p-4 px-6 font-bold text-[#0e0e2c]">
                                            {item.id}
                                        </td>

                                        {/* Customer Name & Email */}
                                        <td className="p-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#FADD9B] flex items-center justify-center text-[#AB2A02] font-bold text-sm shrink-0">
                                                    {item.customer.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0e0e2c]">{item.customer}</span>
                                                    <span className="text-xs text-[#8C8CA1]">{item.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-4 px-6 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyle(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="p-4 px-6 font-bold text-[#0e0e2c]">
                                            Rp {item.price.toLocaleString('id-ID')}
                                        </td>

                                        {/* Item & Dates */}
                                        <td className="p-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#0e0e2c]">{item.product} <span className="text-gray-400 font-medium">(x{item.qty})</span></span>
                                                <span className="text-xs text-[#8C8CA1]">{item.rentDate} - {item.returnDate}</span>
                                            </div>
                                        </td>

                                        {/* Action Column */}
                                        <td className="p-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                
                                                {item.status === 'pending' ? (
                                                    <button className="bg-[#3E5626] hover:bg-[#2d401b] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm w-[80px]">
                                                        Accept
                                                    </button>
                                                ) : item.status === 'disewakan' ? (
                                                    <button className="bg-[#0e0e2c] hover:bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm w-[80px]">
                                                        Return
                                                    </button>
                                                ) : (
                                                    <span className="text-xs font-semibold text-gray-400 italic">No action needed</span>
                                                )}
                                                
                                                {/*
                                                <button className="text-gray-400 hover:text-[#0e0e2c] px-2 py-1 transition-colors">
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </button> */}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Static UI) */}
                    <div className="border-t border-gray-100 p-4 px-6 flex justify-between items-center text-sm text-[#8C8CA1]">
                        <span>Showing 1 to 5 of 24 entries</span>
                        <div className="flex gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&lt;</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#0e0e2c] bg-[#0e0e2c] text-white font-bold">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">2</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">3</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&gt;</button>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}