import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Checkout({ auth }) {
    const [paymentMethod, setPaymentMethod] = useState('transfer');

    // =========================================================================
    // PERLU DIUBAH: Data ini nanti harus diambil dari props Inertia (misal: props.cart atau props.checkoutItems)
    // =========================================================================
    const orderItems = [
        {
            id: 1,
            name: "Naturehike Cloud Up 2 Person",
            pricePerDay: 25000, 
            quantity: 1,
            duration: 3,
            image: "/assets/tenda.jpg"
        },
        {
            id: 2,
            name: "Matras Camping Aluminium",
            pricePerDay: 5000, 
            quantity: 2,
            duration: 2,
            image: "/assets/tenda.jpg" // Anggap saja ini gambar matras
        }
    ];

    // =========================================================================
    // PERLU DIUBAH: Jika biaya admin bersifat dinamis dari database/setting owner
    // =========================================================================
    const adminFee = 5000; 

    // State Manajemen Tanggal Sewa yang dinamis per Item menggunakan Object ID sebagai Key
    // Struktur data state: { [itemId]: 'YYYY-MM-DD' }
    const [rentalDates, setRentalDates] = useState({});

    // Fungsi otomatisasi hitung Tanggal Selesai per Item
    const handleDateChange = (itemId, startDateString, durationDays) => {
        const updatedDates = { ...rentalDates };
        
        if (startDateString) {
            const startObj = new Date(startDateString);
            // Salin tanggal mulai untuk kalkulasi tanggal selesai
            const endObj = new Date(startObj);
            endObj.setDate(endObj.getDate() + durationDays);

            // Format YYYY-MM-DD
            const endDateString = endObj.toISOString().split('T')[0];

            updatedDates[itemId] = {
                start: startDateString,
                end: endDateString
            };
        } else {
            // Jika tanggal mulai dihapus oleh user
            delete updatedDates[itemId];
        }

        setRentalDates(updatedDates);
    };

    // LOGIKA DINAMIS: Menghitung Subtotal berdasarkan rumus asli (Harga * Qty * Durasi) untuk semua item
    const subtotal = orderItems.reduce((acc, item) => {
        return acc + (item.pricePerDay * item.quantity * item.duration);
    }, 0);

    const totalPayment = subtotal + adminFee;

    // Validasi apakah SEMUA item sudah diisi tanggal mulainya
    const isAllDatesFilled = orderItems.every(item => rentalDates[item.id]?.start);

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
                    
                    {/* KOLOM KIRI: FORM DATA (8 Kolom) */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        
                        {/* 1. Informasi Kontak */}
                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-address-card text-[#AB2A02]"></i> Informasi Kontak
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
                                    <p className="text-sm font-semibold border-b border-gray-100 pb-2">{auth.user.name}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nomor WhatsApp</label>
                                    {/* =========================================================================
                                        PERLU DIUBAH: Hubungkan input ini ke form state (misal useForm dari Inertia) untuk pengiriman data ke DB
                                       ========================================================================= */}
                                    <input type="text" placeholder="0812xxxx" className="w-full text-sm font-semibold border-0 border-b border-gray-200 focus:ring-0 focus:border-[#AB2A02] px-0 pb-2 bg-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Detail Sewa Mandiri Per Item (Dinamis Mengikuti Jumlah Barang) */}
                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
                            <h3 className="font-bold text-sm flex items-center gap-2 border-b border-gray-100 pb-3">
                                <i className="fa-solid fa-calendar-days text-[#AB2A02]"></i> Pengaturan Jadwal Sewa Alat
                            </h3>
                            
                            {orderItems.map((item) => (
                                <div key={item.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-xs font-bold text-[#0e0e2c] truncate max-w-[70%]">{item.name}</h4>
                                        <span className="text-[10px] font-extrabold bg-[#FDF0EE] text-[#AB2A02] px-2 py-0.5 rounded-full uppercase">
                                            Paket: {item.duration} Hari
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Tanggal Mulai</label>
                                            <input 
                                                type="date" 
                                                value={rentalDates[item.id]?.start || ''}
                                                onChange={(e) => handleDateChange(item.id, e.target.value, item.duration)}
                                                className="bg-transparent border-0 font-bold text-xs p-0 focus:ring-0 w-full cursor-pointer text-[#0e0e2c]" 
                                            />
                                        </div>
                                        <div className="p-2.5 bg-gray-100/70 rounded-lg border border-gray-200 opacity-85 select-none">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Tanggal Selesai (Otomatis)</label>
                                            <input 
                                                type="date" 
                                                value={rentalDates[item.id]?.end || ''}
                                                readOnly
                                                className="bg-transparent border-0 font-bold text-xs p-0 focus:ring-0 w-full text-gray-500 cursor-not-allowed" 
                                                placeholder="Pilih tanggal mulai"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3. Metode Pembayaran */}
                        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-credit-card text-[#AB2A02]"></i> Metode Pembayaran
                            </h3>
                            <div className="space-y-3">
                                {/* Opsi Transfer Bank */}
                                <div 
                                    onClick={() => setPaymentMethod('transfer')} 
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#AB2A02] bg-[#FDF0EE]' : 'border-gray-100 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-building-columns text-gray-500"></i>
                                        <span className="text-sm font-semibold">Transfer Bank (Manual)</span>
                                    </div>
                                    <i className={`fa-solid fa-circle-check ${paymentMethod === 'transfer' ? 'text-[#AB2A02]' : 'text-gray-200'}`}></i>
                                </div>

                                {/* Opsi COD */}
                                <div 
                                    onClick={() => setPaymentMethod('cod')} 
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#AB2A02] bg-[#FDF0EE]' : 'border-gray-100 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-hand-holding-dollar text-gray-500"></i>
                                        <span className="text-sm font-semibold">Bayar di Tempat (COD)</span>
                                    </div>
                                    <i className={`fa-solid fa-circle-check ${paymentMethod === 'cod' ? 'text-[#AB2A02]' : 'text-gray-200'}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: RINGKASAN (4 Kolom) */}
                    <div className="col-span-12 lg:col-span-4 sticky top-24">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="font-bold text-base mb-4 text-[#0e0e2c]">Ringkasan Pesanan</h2>
                                
                                {/* Mini List Items Dinamis */}
                                <div className="space-y-4 mb-6 max-h-[240px] overflow-y-auto pr-1">
                                    {orderItems.map((item) => (
                                        <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                            <img src={item.image} className="w-12 h-12 object-cover rounded bg-gray-50" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-bold truncate text-[#0e0e2c]">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400">{item.quantity} Unit x {item.duration} Hari</p>
                                                <p className="text-xs font-bold text-[#AB2A02] mt-1">
                                                    Rp {(item.pricePerDay * item.quantity * item.duration).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-gray-100 mb-4" />

                                {/* Kalkulasi Biaya Keseluruhan */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Subtotal Sewa</span>
                                        <span className="font-semibold text-[#0e0e2c]">Rp {subtotal.toLocaleString('id-ID')}</span>
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

                                {/* =========================================================================
                                    PERLU DIUBAH: Tambahkan handler onClick eksekusi POST Inertia form untuk submit data ke controller
                                   ========================================================================= */}
                                <button 
                                    disabled={!isAllDatesFilled}
                                    className={`w-full text-center py-3 rounded font-bold text-xs tracking-wider uppercase transition-colors shadow-md ${
                                        !isAllDatesFilled 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                        : 'bg-[#AB2A02] text-white hover:bg-[#852102] shadow-orange-100'
                                    }`}
                                >
                                    Konfirmasi & Bayar
                                </button>
                                
                                <p className="text-[10px] text-gray-400 text-center mt-4 italic">
                                    {!isAllDatesFilled 
                                        ? "*Silakan lengkapi semua tanggal mulai sewa alat terlebih dahulu." 
                                        : "*Pastikan data sudah benar sebelum melakukan pembayaran."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}