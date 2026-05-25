import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Detail({ auth, product, relatedProducts = [], reviews = [] }) {
    const { flash, errors } = usePage().props;
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); 

    useEffect(() => {
        if (flash?.error) {
            showToastMessage(flash.error, 'error');
        } else if (flash?.success) {
            showToastMessage(flash.success, 'success');
        }
        
        if (errors && Object.keys(errors).length > 0) {
            const errorMsg = Object.values(errors).join("\n");
            showToastMessage(errorMsg, 'error');
        }
    }, [flash, errors]);

    // === KODE ASLI: FORM CART ===
    const { data, setData, post, processing } = useForm({
        product_id: product.id, 
        quantity: 1,
        rent_date: '',
        return_date: '',
    });

    // === TAMBAHAN BARU: FORM REVIEW ===
    const reviewForm = useForm({
        product_id: product.id,
        rating: 5,
        comment: '',
    });

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!reviewForm.data.comment.trim()) {
            showToastMessage('Komentar tidak boleh kosong!', 'error');
            return;
        }

        reviewForm.post(route('member.reviews.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset('comment');
            }
        });
    };
    // === AKHIR TAMBAHAN BARU ===

    const handleQuantityChange = (value) => {
        const n = parseInt(value, 10);
        // Cegah user menyewa melebihi stok yang ada di database
        if (n > product.stock) {
            showToastMessage(`Stok tersisa hanya ${product.stock} unit.`, 'error');
            setData('quantity', product.stock);
        } else {
            setData('quantity', isNaN(n) || n < 1 ? 1 : n);
        }
    };

    const handleRentDateChange = (value) => {
        setData('rent_date', value);
        if (data.return_date && value >= data.return_date) {
            setData('return_date', '');
        }
    };

    const showToastMessage = (msg, type = 'success') => {
        setToastMessage(msg);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    };

    const handleAddToCart = () => {
        if (!data.rent_date || !data.return_date) {
            showToastMessage('Pilih tanggal mulai dan tanggal selesai sewa dulu!', 'error');
            return;
        }

        post(route('member.cart.store'), {
            preserveScroll: true
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title={`Sewa ${product.name}`} />

            <div className="max-w-[1200px] mx-auto px-[20px] font-['Work_Sans'] text-[#0e0e2c] bg-[#fff]">

                {/* BREADCRUMB DINAMIS */}
                <nav className="py-[25px] text-[14px] text-[#8C8CA1]">
                    <Link href="/products" className="hover:underline transition-all duration-500">
                        <span>Dashboard</span>
                    </Link>
                    {' > '}<span>Kategori</span>{' > '}<span>{product.category?.name}</span>{' > '}
                    <span className="text-[#0e0e2c] font-[600]">{product.name}</span>
                </nav>

                <main className="flex flex-col lg:flex-row gap-[80px] mb-[50px]">

                    {/* PRODUCT LEFT (MEDIA & FORM) */}
                    <section className="lg:flex-[45%]">
                        
                        {/* Gambar Utama (Satu-satunya) */}
                        <div className="w-full mb-[25px]">
                            <img
                                src={product.image || '/assets/product-dummy-img.png'}
                                alt={product.name}
                                className="w-full rounded-[12px] object-cover aspect-square border border-gray-100 shadow-sm"
                            />
                        </div>

                        <div>
                            {/* QUANTITY DINAMIS TERHADAP STOK */}
                            <div className="mb-[20px]">
                                <h4 className="text-[14px] font-[600] text-[#8C8CA1] mb-[12px]">
                                    QUANTITY <span className="text-xs font-normal ml-2 text-gray-500">(Tersedia: {product.stock})</span>
                                </h4>
                                <div className="flex items-center border border-[#ddd] w-fit rounded-[4px]">
                                    <button
                                        type="button"
                                        onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                                        className="bg-transparent border-none px-[15px] py-[10px] text-[18px] cursor-pointer hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="w-[50px] border-none text-center text-[16px] font-[600] outline-none bg-transparent [&::-webkit-inner-spin-button]:appearance-none"
                                        value={data.quantity}
                                        min={1}
                                        max={product.stock}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (data.quantity < product.stock) setData('quantity', data.quantity + 1);
                                            else showToastMessage(`Maksimal penyewaan adalah ${product.stock} unit.`, 'error');
                                        }}
                                        className="bg-transparent border-none px-[15px] py-[10px] text-[18px] cursor-pointer hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mb-[20px] grid grid-cols-2 gap-3">
                                <div>
                                    <h4 className="text-[14px] font-[600] text-[#8C8CA1] mb-[8px]">TANGGAL MULAI</h4>
                                    <input
                                        type="date"
                                        value={data.rent_date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => handleRentDateChange(e.target.value)}
                                        className="w-full border border-[#ddd] rounded-[4px] px-3 py-2 text-[13px] font-[600] text-[#0e0e2c] focus:outline-none focus:border-[#AB2A02] cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-[600] text-[#8C8CA1] mb-[8px]">TANGGAL SELESAI</h4>
                                    <input
                                        type="date"
                                        value={data.return_date}
                                        min={data.rent_date || new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setData('return_date', e.target.value)}
                                        className="w-full border border-[#ddd] rounded-[4px] px-3 py-2 text-[13px] font-[600] text-[#0e0e2c] focus:outline-none focus:border-[#AB2A02] cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Tombol dimatikan jika stok habis */}
                            <button
                                onClick={handleAddToCart}
                                disabled={processing || product.stock < 1}
                                className="w-full bg-[#000] hover:bg-[#333] disabled:bg-[#666] disabled:cursor-not-allowed text-[#fff] p-[18px] border-none text-[16px] font-[700] tracking-[1px] cursor-pointer transition-colors duration-300 rounded-lg"
                            >
                                {processing ? 'MENAMBAHKAN...' : product.stock < 1 ? 'STOK HABIS' : 'ADD TO CART'}
                            </button>
                        </div>
                    </section>

                    {/* PRODUCT RIGHT (INFORMASI DETAIL) */}
                    <section className="lg:flex-[55%]">
                        <h1 className="text-[32px] font-[700] mb-[10px] leading-[1.2]">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-[5px] mb-[12px]">
                            <span className="text-[#F4A418] text-[18px]">★★★★★</span>
                            <span className="text-[#8C8CA1] text-[18px]">{reviews?.length}</span>
                        </div>

                        <div className="text-[24px] font-[700] my-[15px]">
                            Rp {product.price.toLocaleString('id-ID')} <span className="text-[14px] text-[#8C8CA1] font-[400]">/ day</span>
                        </div>

                        <div className="mt-[20px] leading-[1.6] text-[15px] text-justify whitespace-pre-wrap">
                            {product.description}
                        </div>
                    </section>
                </main>

                {/* === TAMBAHAN BARU: SECTION REVIEWS === */}
                <section className="mt-[60px] pt-[40px] border-t border-[#ecf1f4]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Kiri: Daftar Ulasan */}
                        <div className="lg:col-span-7">
                            <h2 className="text-[24px] font-[700] mb-6">Ulasan Pengguna ({reviews.length})</h2>
                            
                            {reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {reviews.map((rev) => (
                                        <div key={rev.id} className="pb-6 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#FADD9B] flex items-center justify-center text-[#AB2A02] font-bold uppercase">
                                                        {rev.user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-[#0e0e2c]">{rev.user?.name || 'Anonim'}</h4>
                                                        <span className="text-[10px] text-[#8C8CA1]">{rev.created_at}</span>
                                                    </div>
                                                </div>
                                                <div className="flex text-[#F4A418] text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fa-star ${i < rev.rating ? 'fa-solid' : 'fa-regular'}`}></i>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed pl-13">
                                                {rev.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-100 text-gray-500">
                                    <i className="fa-regular fa-comment-dots text-3xl mb-2 text-gray-300"></i>
                                    <p className="text-sm font-medium">Belum ada ulasan. Jadilah yang pertama mengulas!</p>
                                </div>
                            )}
                        </div>

                        {/* Kanan: Form Tulis Ulasan */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-1">Tulis Ulasan Anda</h3>
                                <p className="text-xs text-gray-400 mb-6">Bantu pendaki lain dengan membagikan pengalaman Anda.</p>

                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-4">
                                        <label className="text-xs font-bold text-[#8C8CA1] mb-2 block">RATING BINTANG</label>
                                        <div className="flex gap-2 text-2xl">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    type="button" 
                                                    key={star} 
                                                    onClick={() => reviewForm.setData('rating', star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <i className={`fa-star ${reviewForm.data.rating >= star ? 'fa-solid text-[#F4A418]' : 'fa-regular text-gray-300'}`}></i>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="text-xs font-bold text-[#8C8CA1] mb-2 block">KOMENTAR</label>
                                        <textarea
                                            value={reviewForm.data.comment}
                                            onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                            placeholder="Tuliskan pengalaman jujur Anda tentang alat ini..."
                                            className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:border-[#AB2A02] focus:ring-[#AB2A02] outline-none min-h-[120px] resize-y"
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={reviewForm.processing}
                                        className="w-full bg-[#AB2A02] hover:bg-[#852102] text-white font-bold py-3 rounded-lg text-sm transition-colors disabled:opacity-50"
                                    >
                                        {reviewForm.processing ? 'Mengirim...' : 'Kirim Ulasan'}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>
                {/* === AKHIR TAMBAHAN BARU === */}

                {/* RELATED PRODUCTS DINAMIS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-[80px] mb-[80px]">
                        <h2 className="text-[24px] font-[700] mb-[30px] border-t border-[#ecf1f4] pt-[30px]">
                            Produk Lain di Kategori {product.category?.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* TOAST POP-UP */}
            <div
                className={`fixed bottom-[30px] right-[30px] px-[24px] py-[16px] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-[1000] font-[600] transition-all duration-300 flex items-center gap-2 ${
                    toastType === 'success' ? 'bg-[#3E5626]' : 'bg-[#AB2A02]'
                } text-[#fff] ${
                    showToast ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-[20px] invisible'
                }`}
            >
                <p className="m-0">{toastMessage}</p>
            </div>

        </MainLayout>
    );
}