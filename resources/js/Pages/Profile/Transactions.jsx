import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

// Tambahkan 'transactions' di props
export default function Transactions({ auth, transactions }) {
    
    const previewImg = auth.user.profile_picture ? `/storage/${auth.user.profile_picture}` : '/assets/placeholder.svg';

    // Pastikan transactions berbentuk array
    const transactionList = transactions || [];

    // Sesuaikan status dengan enum di database ('pending', 'disewakan', 'dikembalikan')
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'dikembalikan':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'disewakan':
                return 'bg-[#FDF0EE] text-[#AB2A02] border-[#EAD5D1]';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Transaction History" />

            <div className="flex flex-col md:flex-row w-full overflow-hidden font-['Work_Sans']">
                
                {/* === LEFT SECTION (SIDEBAR) === */}
                <div className="w-full md:w-[30%] p-8 md:p-11 md:pt-8 rounded-2xl border border-gray-300/50 flex flex-col items-center gap-7 bg-[#ECF1F4]">
                    
                    <nav className="text-sm text-[#8C8CA1] self-start w-full mb-2">
                        <Link 
                            href={auth.user.role === 'owner' ? route('owner.dashboard') : route('member.products')} 
                            className="hover:underline hover:text-[#0e0e2c] transition-colors"
                        >
                            Dashboard
                        </Link>
                        <span className="mx-2">&gt;</span> 
                        <span className="font-semibold text-[#0e0e2c]">Riwayat Transaksi</span>
                    </nav>

                    <div className="flex flex-col items-center text-center relative mt-4">
                        <img 
                            src={previewImg} 
                            alt="Profile" 
                            className="w-[130px] h-[130px] rounded-full object-cover border-4 border-white shadow-sm"
                        />
                        <h3 className="text-xl font-bold mt-4 text-[#0e0e2c]">{auth.user.name}</h3>
                        <p className="text-sm font-medium text-[#8C8CA1]">Role: <span className="uppercase">{auth.user.role}</span></p>
                    </div>

                    <div className="w-full mt-4">
                        <ul className="flex flex-col gap-2 w-full">
                            <Link 
                                href={route('profile.edit')}
                                className="p-4 px-6 flex items-center font-bold gap-3 rounded-lg text-[#0e0e2c] hover:bg-black/10 transition-colors cursor-pointer w-full"
                            >
                                <i className="fa-solid fa-user"></i>
                                <span>Personal Information</span>
                            </Link>
                            
                            <li className="p-4 px-6 flex items-center font-bold gap-3 rounded-lg text-[#0e0e2c] hover:bg-black/10 transition-colors cursor-pointer">
                                <i className="fa-solid fa-credit-card"></i>
                                <span>Payment Method</span>
                            </li>
                            
                            {auth.user.role === 'member' && (
                                <li className="p-4 px-6 flex items-center font-black gap-3 rounded-lg bg-black text-white cursor-pointer">
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    <span>Transactions History</span>
                                </li>
                            )}

                            <li className="p-4 px-6 mt-4 flex items-center font-bold gap-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link href={route('logout')} method="post" as="button" className="w-full text-left">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* === RIGHT SECTION (LIST TRANSAKSI) === */}
                <div className="w-full md:w-[70%] p-8 md:p-11 bg-white">
                    <div className="w-full max-w-[750px] mx-auto space-y-6">
                        
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-[#0e0e2c]">Riwayat Penyewaan Alat</h2>
                            <p className="text-xs text-gray-400 mt-1">Pantau status validasi dan masa aktif peminjaman perlengkapan gunung Anda.</p>
                        </div>

                        {transactionList.length === 0 ? (
                            <div className="text-center p-12 border border-dashed border-gray-200 rounded-xl text-gray-400">
                                <i className="fa-solid fa-receipt text-3xl mb-3 block"></i>
                                <p className="text-sm">Belum ada catatan transaksi penyewaan.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Map data dari database */}
                                {transactionList.map((tx) => (
                                    <div key={tx.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                        
                                        {/* Header Card */}
                                        <div className="bg-gray-50 px-5 py-3 flex flex-wrap justify-between items-center gap-2 border-b border-gray-100">
                                            <div className="flex items-center gap-4 text-xs">
                                                <div>
                                                    <span className="text-gray-400 block text-[10px] font-bold uppercase">Tanggal Checkout</span>
                                                    <span className="font-semibold text-gray-700">{tx.created_at}</span>
                                                </div>
                                                <div className="w-px h-6 bg-gray-200"></div>
                                                <div>
                                                    <span className="text-gray-400 block text-[10px] font-bold uppercase">Nomor Invoice</span>
                                                    {/* Format ID jadi TRX-0001 dst */}
                                                    <span className="font-mono font-bold text-[#0e0e2c]">
                                                        TRX-{String(tx.id).padStart(4, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase ${getStatusStyle(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </div>

                                        {/* Detail Barang */}
                                        <div className="p-5 space-y-3">
                                            {tx.items.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                                    <div className="flex items-center gap-3">
                                                        <img 
                                                            src={item.product.image || "/assets/tenda.jpg"} 
                                                            alt={item.product.name} 
                                                            className="w-10 h-10 object-cover rounded bg-gray-100"
                                                        />
                                                        <div>
                                                            <span className="font-medium text-gray-800 block">{item.product.name}</span>
                                                            <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-1.5 py-0.5 rounded">
                                                                {item.rent_date} - {item.return_date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-bold text-gray-700 block">{item.quantity} Unit</span>
                                                        <span className="text-[10px] text-gray-400 font-semibold">Rp {item.subtotal.toLocaleString('id-ID')}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer Card */}
                                        <div className="bg-gray-50/50 px-5 py-3 flex justify-between items-center border-t border-gray-100 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-xs font-medium">Metode:</span>
                                                <span className="text-[10px] uppercase font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                                    {tx.payment_method === 'cod' ? 'Bayar di Tempat' : 'Transfer'}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-gray-500 text-[10px] font-medium mr-2">Total Pembayaran</span>
                                                <span className="font-extrabold text-[#AB2A02] text-base">
                                                    Rp {tx.total_price.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </MainLayout>
    );
}