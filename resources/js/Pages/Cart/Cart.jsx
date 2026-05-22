import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Cart({ auth, items }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (items) {
      const formattedItems = items.map(item => {
        // Hitung durasi (hari) dari rent_date ke return_date
        const start = new Date(item.rent_date);
        const end = new Date(item.return_date);
        const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        return {
          id: item.id, // ID cart item
          product_id: item.product.id,
          name: item.product.name,
          category: item.product.category,
          pricePerDay: item.product.price,
          image: item.product.image || "/assets/tenda.jpg", // Fallback image
          color: "Default", // Nanti bisa disesuaikan kalau ada fitur warna di DB
          quantity: item.quantity,
          duration: durationDays > 0 ? durationDays : 1,
          selected: true // Default tercentang
        };
      });
      setCartItems(formattedItems);
    }
  }, [items]);

  const handleCheckout = () => {
      const selectedIds = cartItems.filter(item => item.selected).map(item => item.id);
      
      if (selectedIds.length === 0) return;

      router.get(route('member.checkout'), { 
          cart_item_ids: selectedIds 
      });
  };
  const [discount, setDiscount] = useState(0);

  // Handle Perubahan Kuantitas (Pcs) atau Durasi (Hari)
  const updateMetrics = (id, field, type) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const currentValue = item[field];
          const newValue = type === 'increment' ? currentValue + 1 : currentValue - 1;
          return { ...item, [field]: newValue > 0 ? newValue : 1 };
        }
        return item;
      })
    );
  };

  // Handle Checkbox Tunggal
  const toggleSelect = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
    );
  };

  // Handle Checkbox "Pilih Semua"
  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setCartItems(prevItems => prevItems.map(item => ({ ...item, selected: isChecked })));
  };

  // Hapus Item
  const deleteItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Penerapan Kode Promo
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "PETUALANG") {
      setDiscount(15000); 
      alert("Kode promo berhasil dipasang!");
    } else {
      alert("Kode promo tidak valid.");
    }
  };

  // Perhitungan Finansial
  const totalSelectedItems = cartItems.filter(item => item.selected).length;
  const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
  
  const subtotal = cartItems.reduce((acc, item) => {
    return item.selected ? acc + (item.pricePerDay * item.quantity * item.duration) : acc;
  }, 0);

  const totalPayment = subtotal - discount > 0 ? subtotal - discount : 0;

  return (
    <MainLayout user={auth.user}>
      <Head title="Keranjang Belanja" />

      <div className="w-full">
        {/* Breadcrumb dengan tautan balik aktif ke katalog */}
        <div className="text-xs text-gray-400 mb-2">
          <Link 
            href={route('member.products')} 
            className="hover:text-[#AB2A02] transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          {" "} &gt; {" "}
          <Link 
            href={route('member.cart')} // Mengarahkan kembali ke rute Cart ini sendiri
            className="hover:text-[#AB2A02] transition-colors cursor-pointer"
          >
            Keranjang Belanja
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-8 text-[#0e0e2c]">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-gray-100 shadow-sm">
            <p className="text-gray-500 mb-4">Keranjang belanja Anda kosong.</p>
            <Link 
              href={route('member.products')}
              className="inline-block bg-[#AB2A02] text-white px-6 py-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#852102] transition-colors"
            >
              Lihat Perlengkapan Lain
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* KOLOM KIRI: DAFTAR ITEM (8 Kolom) */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              
              {/* Controller Pilih Semua */}
              <div className="bg-white px-6 py-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="accent-[#AB2A02] w-4 h-4 cursor-pointer rounded"
                />
                <span className="text-sm font-semibold text-[#0e0e2c]">Pilih Semua ({totalSelectedItems} Perlengkapan)</span>
              </div>

              {/* Loop Card Item */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex gap-4 items-center relative">
                  <input 
                    type="checkbox" 
                    checked={item.selected}
                    onChange={() => toggleSelect(item.id)}
                    className="accent-[#AB2A02] w-4 h-4 cursor-pointer rounded"
                  />
                  
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-50" />
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gray-400 font-bold tracking-wider block mb-0.5">{item.category}</span>
                    <h3 className="font-bold text-sm truncate pr-6 text-[#0e0e2c]">{item.name}</h3>
                    <p className="text-xs text-gray-400">Warna: {item.color}</p>
                    <p className="text-sm font-bold text-[#AB2A02] mt-2">
                      Rp {item.pricePerDay.toLocaleString('id-ID')} <span className="text-xs text-gray-400 font-normal">/ hari</span>
                    </p>
                  </div>

                  {/* Pengatur Durasi & Jumlah Unit */}
                  <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                    {/* Durasi */}
                    <div className="flex flex-col items-end sm:items-start">
                      <span className="text-[10px] text-gray-400 font-semibold mb-1">Durasi</span>
                      <div className="flex items-center border border-gray-200 rounded text-xs bg-white overflow-hidden">
                        <button onClick={() => updateMetrics(item.id, 'duration', 'decrement')} className="px-2 py-1 bg-gray-50 hover:bg-gray-100"><i className="fa-solid fa-minus text-[10px]"></i></button>
                        <span className="px-2 font-semibold min-w-[50px] text-center">{item.duration} Hari</span>
                        <button onClick={() => updateMetrics(item.id, 'duration', 'increment')} className="px-2 py-1 bg-gray-50 hover:bg-gray-100"><i className="fa-solid fa-plus text-[10px]"></i></button>
                      </div>
                    </div>

                    {/* Kuantitas */}
                    <div className="flex flex-col items-end sm:items-start">
                      <span className="text-[10px] text-gray-400 font-semibold mb-1">Jumlah</span>
                      <div className="flex items-center border border-gray-200 rounded text-xs bg-white overflow-hidden">
                        <button onClick={() => updateMetrics(item.id, 'quantity', 'decrement')} className="px-2 py-1 bg-gray-50 hover:bg-gray-100"><i className="fa-solid fa-minus text-[10px]"></i></button>
                        <span className="px-2 font-semibold min-w-[40px] text-center">{item.quantity} Pcs</span>
                        <button onClick={() => updateMetrics(item.id, 'quantity', 'increment')} className="px-2 py-1 bg-gray-50 hover:bg-gray-100"><i className="fa-solid fa-plus text-[10px]"></i></button>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Hapus */}
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* KOLOM KANAN: RINGKASAN PEMBAYARAN (4 Kolom) */}
            <div className="col-span-12 lg:col-span-4 sticky top-24">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h2 className="font-bold text-base mb-4 text-[#0e0e2c]">Ringkasan Sewa</h2>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal sewa ({totalSelectedItems} item)</span>
                    <span className="font-semibold text-[#0e0e2c]">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Potongan Promo</span>
                      <span>- Rp {discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>
                
                {/* Input Kode Promo */}
                {/* <div className="flex gap-2 my-5">
                  <input 
                    type="text" 
                    placeholder="KODE PROMO (PETUALANG)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-xs flex-1 bg-gray-50 focus:outline-none focus:border-[#AB2A02] uppercase font-semibold tracking-wider"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-[#0e0e2c] text-white px-4 py-2 rounded text-xs font-bold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div> */}

                <hr className="border-gray-100 my-4" />
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-sm text-[#0e0e2c]">Total Pembayaran</span>
                  <span className="font-bold text-lg text-[#AB2A02]">Rp {totalPayment.toLocaleString('id-ID')}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={totalSelectedItems === 0}
                    className={`w-full block text-center py-3 rounded font-bold tracking-wider text-xs uppercase transition-colors ${
                        totalSelectedItems === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                        : 'bg-[#AB2A02] text-white hover:bg-[#852102]'
                    }`}
                >
                    Sewa Sekarang ({totalSelectedItems})
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
}