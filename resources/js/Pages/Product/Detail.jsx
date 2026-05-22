import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Detail({ auth, productId }) {
    const colorOptions = [
        { name: 'ORANGE', img: '/assets/Orange-Tent.jpg' },
        { name: 'WHITE', img: '/assets/White-Tent.jpg' },
        { name: 'YELLOW', img: '/assets/Yellow-Tent.jpg' },
        { name: 'NAVY', img: '/assets/Navy-Tent.jpg' },
        { name: 'GREEN FOREST', img: '/assets/Green-Forest-Tent.jpg' },
    ];

    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [mainImage, setMainImage] = useState(colorOptions[0].img);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // 'success' | 'error'

    const { data, setData, post, processing } = useForm({
        product_id: productId,
        quantity: 1,
        rent_date: '',
        return_date: '',
    });

    const relatedProducts = Array.from({ length: 4 }, (_, index) => ({
        id: index + 10,
        category: { name: 'TENDA & SHELTER' },
        name: 'Naturehike Cloud Up 2 Person',
        price: 25000,
        image: '/assets/tenda.jpg',
    }));

    useEffect(() => {
        setMainImage(selectedColor.img);
    }, [selectedColor]);

    const swapMainImage = (src) => {
        setMainImage(src);
    };

    const handleQuantityChange = (value) => {
        const n = parseInt(value, 10);
        setData('quantity', isNaN(n) || n < 1 ? 1 : n);
    };

    const handleRentDateChange = (value) => {
        setData('rent_date', value);
        // Reset return_date jika tanggal mulai berubah
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
            onSuccess: () => {
                showToastMessage(
                    `✓ ${data.quantity}x produk (${selectedColor.name}) berhasil ditambahkan ke keranjang!`,
                    'success'
                );
            },
            onError: (errors) => {
                showToastMessage(errors.error || 'Gagal menambahkan ke keranjang.', 'error');
            },
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Product Detail - Naturehike Cloud Up 2" />

            {/* CONTAINER */}
            <div className="max-w-[1200px] mx-auto px-[20px] font-['Work_Sans'] text-[#0e0e2c] bg-[#fff]">

                {/* BREADCRUMB */}
                <nav className="py-[25px] text-[14px] text-[#8C8CA1]">
                    <Link href="/products" className="hover:underline transition-all duration-500">
                        <span>Dashboard</span>
                    </Link>
                    {' > '}<span>Kategori</span>{' > '}<span>Tenda & Shelter</span>{' > '}
                    <span className="text-[#0e0e2c] font-[600]">Naturehike Cloud Up 2</span>
                </nav>

                {/* PRODUCT CONTAINER */}
                <main className="flex flex-col lg:flex-row gap-[80px] mb-[50px]">

                    {/* PRODUCT LEFT */}
                    <section className="lg:flex-[45%]">
                        <div className="w-full">
                            <img
                                src={mainImage}
                                alt="Naturehike Tent"
                                className="w-full rounded-[12px] mb-[15px]"
                                style={{ transition: 'opacity .2s ease-in-out' }}
                            />
                        </div>

                        <div className="flex gap-[10px] overflow-x-auto pb-1">
                            {colorOptions.map((c, i) => (
                                <img
                                    key={i}
                                    src={c.img}
                                    alt={c.name}
                                    onClick={() => { setSelectedColor(c); swapMainImage(c.img); }}
                                    className={`w-[70px] h-[70px] object-cover rounded-[6px] cursor-pointer border transition-all duration-300 ${
                                        c.img === mainImage
                                            ? 'border-[#AB2A02] opacity-80'
                                            : 'border-[#ecf1f4] hover:border-[#AB2A02] hover:opacity-80'
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="mt-[25px]">
                            <h4 className="text-[14px] font-[600] text-[#8C8CA1] mb-[12px]">COLOR</h4>
                            <div className="flex flex-wrap gap-[10px]">
                                {colorOptions.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setSelectedColor(c); swapMainImage(c.img); }}
                                        className={`px-[24px] py-[12px] border text-[12px] font-[600] transition-all duration-300 ${
                                            selectedColor.name === c.name
                                                ? 'bg-[#000] text-[#fff] border-[#000]'
                                                : 'bg-[#fff] text-[#0e0e2c] border-[#ddd] hover:border-[#000]'
                                        }`}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-[30px]">
                            {/* QUANTITY */}
                            <div className="mb-[20px]">
                                <h4 className="text-[14px] font-[600] text-[#8C8CA1] mb-[12px]">QUANTITY</h4>
                                <div className="flex items-center border border-[#ddd] w-fit rounded-[4px]">
                                    <button
                                        type="button"
                                        onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                                        className="bg-transparent border-none px-[15px] py-[10px] text-[18px] cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="w-[50px] border-none text-center text-[16px] font-[600] outline-none bg-transparent [&::-webkit-inner-spin-button]:appearance-none"
                                        value={data.quantity}
                                        min={1}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setData('quantity', data.quantity + 1)}
                                        className="bg-transparent border-none px-[15px] py-[10px] text-[18px] cursor-pointer"
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

                            <button
                                onClick={handleAddToCart}
                                disabled={processing}
                                className="w-full bg-[#000] hover:bg-[#333] disabled:bg-[#666] disabled:cursor-not-allowed text-[#fff] p-[18px] border-none text-[16px] font-[700] tracking-[1px] cursor-pointer transition-colors duration-300"
                            >
                                {processing ? 'MENAMBAHKAN...' : 'ADD TO CART'}
                            </button>
                        </div>
                    </section>

                    {/* PRODUCT RIGHT */}
                    <section className="lg:flex-[55%]">
                        <h1 className="text-[32px] font-[700] mb-[10px] leading-[1.2]">
                            Naturehike Cloud Up 2 Person Ultralight Tent
                        </h1>

                        <div className="flex items-center gap-[5px] mb-[12px]">
                            <span className="text-[#F4A418] text-[18px]">★★★★★</span>
                            <span className="text-[#8C8CA1] text-[18px]">(112)</span>
                        </div>

                        <div className="text-[24px] font-[700] my-[15px]">
                            Rp 25.000,00 <span className="text-[14px] text-[#8C8CA1] font-[400]">/ day</span>
                        </div>

                        <div className="mt-[20px] leading-[1.6] text-[15px] text-justify">
                            <p><strong>Cloud Up™ 2-Person Ultralight Backpacking Tent</strong> is the perfect choice for lightweight backpacking adventures. This ultralight, free-standing tent is made from durable 20D nylon with a silicone coating, ensuring excellent waterproof and windproof performance. Its easy setup design allows the tent to be assembled in just a few minutes, making it ideal for camping, hiking, and bikepacking. The spacious interior and vestibule provide plenty of room for two people, ensuring a comfortable and dry night's sleep in any weather.</p>

                            <p className="font-[700] my-[15px] mb-[5px] text-left">Key Features:</p>
                            <ul className="ml-[20px] mb-[15px] list-disc">
                                <li className="mb-[5px]"><strong>Easy Setup:</strong> Freestanding design with aluminum alloy poles, quick and hassle-free assembly.</li>
                                <li className="mb-[5px]"><strong>Waterproof & Windproof:</strong> PU-coated nylon with taped seams and strong aluminum alloy poles for reliable protection.</li>
                                <li className="mb-[5px]"><strong>Spacious Interior:</strong> Comfortable space for two people with a front door and vestibule for extra storage.</li>
                                <li className="mb-[5px]"><strong>Ultralight:</strong> Designed for easy carrying, perfect for backpacking adventures.</li>
                                <li className="mb-[5px]"><strong>Double Layer Design:</strong> Excellent ventilation and can be used separately as a sun shelter.</li>
                            </ul>

                            <p className="italic text-[#8C8CA1] mb-[10px] text-left">
                                *Cloud Up™ 20D are clearance models and will be replaced by the Cloud Up™ Pro series.
                            </p>
                            <a href="#" className="text-[#8C8CA1] underline text-[14px]">Read Less</a>
                        </div>
                    </section>
                </main>

                {/* RELATED PRODUCTS */}
                <section className="mt-[80px] mb-[80px]">
                    <h2 className="text-[24px] font-[700] mb-[30px] border-t border-[#ecf1f4] pt-[30px]">Produk Lain</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
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
