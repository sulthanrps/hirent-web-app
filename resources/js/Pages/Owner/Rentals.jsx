import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router } from '@inertiajs/react';

export default function Rentals({ auth, rentals }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRentals = rentals.filter(item => 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateStatus = (transactionId, newStatus) => {
        router.patch(route('owner.transactions.updateStatus', transactionId), {
            status: newStatus
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Status updated successfully!');
            }
        });
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending':
                return 'bg-[#FFF4E5] text-[#FF9800]'; 
            case 'disewakan':
                return 'bg-[#E8F5E9] text-[#4CAF50]'; 
            case 'dikembalikan':
                return 'bg-[#F3F4F6] text-[#8C8CA1]'; 
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Rental Requests" />

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === TOP CONTROLS === */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">
                        <i className="fa-solid fa-sort-amount-down"></i>
                        <span>Newest</span>
                    </div>

                    {/* Search Bar Terintegrasi */}
                    <div className="flex-1 max-w-md w-full relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search order ID or customer..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0e0e2c] focus:border-[#0e0e2c] outline-none transition-shadow"
                        />
                         {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0e0e2c]">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
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
                                {filteredRentals.length > 0 ? (
                                    filteredRentals.map((item) => (
                                        <tr key={item.raw_id} className="hover:bg-gray-50/50 transition-colors group">
                                            
                                            <td className="p-4 px-6 font-bold text-[#0e0e2c]">
                                                {item.id}
                                            </td>

                                            <td className="p-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#FADD9B] flex items-center justify-center text-[#AB2A02] font-bold text-sm shrink-0 uppercase">
                                                        {item.customer.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[#0e0e2c]">{item.customer}</span>
                                                        <span className="text-xs text-[#8C8CA1]">{item.email}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4 px-6 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="p-4 px-6 font-bold text-[#0e0e2c]">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </td>

                                            <td className="p-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0e0e2c] max-w-[200px] truncate" title={item.product}>
                                                        {item.product} <span className="text-gray-400 font-medium">(x{item.qty})</span>
                                                    </span>
                                                    <span className="text-xs text-[#8C8CA1]">{item.rentDate} - {item.returnDate}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    
                                                    {item.status === 'pending' ? (
                                                        <button 
                                                            onClick={() => handleUpdateStatus(item.raw_id, 'disewakan')}
                                                            className="bg-[#3E5626] hover:bg-[#2d401b] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm w-[80px]"
                                                        >
                                                            Accept
                                                        </button>
                                                    ) : item.status === 'disewakan' ? (
                                                        <button 
                                                            onClick={() => handleUpdateStatus(item.raw_id, 'dikembalikan')}
                                                            className="bg-[#0e0e2c] hover:bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm w-[80px]"
                                                        >
                                                            Return
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-gray-400 italic">No action needed</span>
                                                    )}
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">
                                            Belum ada data permintaan sewa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}