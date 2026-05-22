import React, { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Checkout({ auth, items, totalPrice }) {
    const adminFee = 5000; 
    const totalPayment = totalPrice + adminFee;

    // Siapkan useForm untuk mengirim data ke Controller store
    const { data, setData, post, processing } = useForm({
        cart_item_ids: items ? items.map(item => item.id) : [],
        payment_method: 'transfer' // Default value
    });

    // Fungsi submit ke backend
    const handleSubmit = () => {
        post(route('member.checkout.store'));
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Checkout" />

            <div className="w-full">
                {/* Breadcrumb */}
                <div className="text-xs text-gray-400 mb-2">
                    <Link href={route('member.products')} className="hover:text-[#AB2A02]">Dashboard</Link>
                    {" "} &gt; {" "}
                    <Link href={route('member.cart')} className="hover:text-[#AB2A02]">Keranjang</Link>
                    {" "} &gt; Checkout
                </div>

                <h1 className="text-2xl font-bold mb-8 text-[#0e0e2c]">Checkout Pesanan</h1>

                <div className="grid grid-cols-12 gap-8 items-start">
                    
                    {/* KOLOM KIRI: FORM DATA */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        
                        {/* 1. Informasi Kontak */}
                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-address-card text-[#AB2A02]"></i> Informasi Pemesan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Nama Lengkap</label>
                                    <p className="text-sm font-semibold border-b border-gray-100 pb-2">{auth.user.name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Email</label>
                                    <p className="text-sm font-semibold border-b border-gray-100 pb-2">{auth.user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Metode Pembayaran */}
                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-credit-card text-[#AB2A02]"></i> Metode Pembayaran
                            </h3>
                            <div className="space-y-3">
                                {/* Opsi Transfer Bank */}
                                <div 
                                    onClick={() => setData('payment_method', 'transfer')} 
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${data.payment_method === 'transfer' ? 'border-[#AB2A02] bg-[#FDF0EE]' : 'border-gray-100 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-building-columns text-gray-500"></i>
                                        <span className="text-sm font-semibold">Transfer Bank (Manual)</span>
                                    </div>
                                    <i className={`fa-solid fa-circle-check ${data.payment_method === 'transfer' ? 'text-[#AB2A02]' : 'text-gray-200'}`}></i>
                                </div>

                                {/* Opsi COD */}
                                <div 
                                    onClick={() => setData('payment_method', 'cod')} 
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${data.payment_method === 'cod' ? 'border-[#AB2A02] bg-[#FDF0EE]' : 'border-gray-100 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-hand-holding-dollar text-gray-500"></i>
                                        <span className="text-sm font-semibold">Bayar di Tempat (COD)</span>
                                    </div>
                                    <i className={`fa-solid fa-circle-check ${data.payment_method === 'cod' ? 'text-[#AB2A02]' : 'text-gray-200'}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: RINGKASAN */}
                    <div className="col-span-12 lg:col-span-4 sticky top-24">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="font-bold text-base mb-4 text-[#0e0e2c]">Ringkasan Pesanan</h2>
                                
                                {/* List Items Dinamis */}
                                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                                    {items && items.map((item) => {
                                        // Hitung durasi hari untuk ditampilkan
                                        const start = new Date(item.rent_date);
                                        const end = new Date(item.return_date);
                                        const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

                                        return (
                                            <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                                <img src={item.product.image || "/assets/tenda.jpg"} className="w-12 h-12 object-cover rounded bg-gray-50" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xs font-bold truncate text-[#0e0e2c]">{item.product.name}</h4>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">
                                                        {item.quantity} Unit x {durationDays > 0 ? durationDays : 1} Hari
                                                    </p>
                                                    <p className="text-[9px] text-gray-400 mt-0.5 bg-gray-100 w-fit px-1.5 py-0.5 rounded">
                                                        {item.rent_date} s/d {item.return_date}
                                                    </p>
                                                    <p className="text-xs font-bold text-[#AB2A02] mt-1">
                                                        Rp {item.subtotal.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <hr className="border-gray-100 mb-4" />

                                {/* Kalkulasi Biaya Keseluruhan */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Subtotal Sewa</span>
                                        <span className="font-semibold text-[#0e0e2c]">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Biaya Admin</span>
                                        <span className="font-semibold text-[#0e0e2c]">Rp {adminFee.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-dashed border-gray-200">
                                        <span className="font-bold text-sm text-[#0e0e2c]">Total Tagihan</span>
                                        <span className="font-bold text-lg text-[#AB2A02]">Rp {totalPayment.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSubmit}
                                    disabled={processing || items.length === 0}
                                    className={`w-full text-center py-3 rounded font-bold text-xs tracking-wider uppercase transition-colors shadow-md ${
                                        processing || items.length === 0
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                        : 'bg-[#AB2A02] text-white hover:bg-[#852102] shadow-orange-100'
                                    }`}
                                >
                                    {processing ? 'Memproses...' : 'Konfirmasi & Bayar'}
                                </button>
                                
                                <p className="text-[10px] text-gray-400 text-center mt-4 italic">
                                    *Pastikan data pesanan dan jadwal sudah benar sebelum melakukan pembayaran.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}