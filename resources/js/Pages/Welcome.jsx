import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <MainLayout user={auth.user}>
            {/* Tag Head dari Inertia untuk mengubah title tab browser */}
            <Head title="Explore the Outdoors" />

            {/* Efek Animasi Marquee Custom */}
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: scroll 20s linear infinite;
                }
            `}</style>

            <main className="overflow-x-hidden bg-white text-[#222222]">
                {/* HERO SECTION */}
                <section className="py-24 relative">
                    <div className="max-w-[1200px] mx-auto px-5 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-[60px]">
                        <div className="w-full md:w-1/2 flex gap-5 h-[350px] md:h-[500px]">
                            <div className="flex-1 h-full relative overflow-hidden bg-gray-200 rounded-[100px_0_0_100px] md:rounded-[200px_0_0_200px]">
                                <img src="/assets/hero.jpeg" alt="Hiking gear" className="absolute top-0 h-full w-[220%] object-cover" />
                            </div>
                            <div className="flex-1 h-full relative overflow-hidden bg-gray-200 rounded-[0_100px_100px_0] md:rounded-[0_200px_0_200px]">
                                <img src="/assets/hero.jpeg" alt="Hiking gear" className="absolute top-0 h-full w-[220%] object-cover right-0" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h1 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.2] mb-[30px]">
                                Explore the<br />
                                <span className="text-[#4b5a34] italic font-black">Outdoors</span><br />
                                with the Right Gear
                            </h1>
                            <Link 
                                href={auth.user ? route('member.products') : route('register')} 
                                className="inline-block py-3.5 px-7 font-black text-[0.9rem] bg-[#c04e2b] text-white rounded-[6px] uppercase shadow-[4px_4px_0_#e8e1d5] transition-all duration-200 hover:bg-[#a84224] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent"
                            >
                                RENT NOW
                            </Link>
                        </div>
                    </div>
                    <img src="/assets/icons/Star.png" alt="" className="absolute bottom-0 right-[-10px] w-[110px] rotate-10 hidden md:block" />
                </section>

                {/* PROMO SECTION */}
                <section className="bg-[#f4e3b7] py-[60px] md:py-[120px] relative -skew-y-3 mt-10 md:mt-20 overflow-hidden">
                    <div className="skew-y-3 relative max-w-[1200px] mx-auto px-5">
                        <h2 className="text-[2.2rem] md:text-[3rem] font-black mb-[50px] text-center md:text-left">Most Rented Gear</h2>
                        <div className="flex flex-col gap-[35px] max-w-[850px]">
                            <div className="flex flex-col md:flex-row gap-[35px] h-auto md:h-[260px] justify-start">
                                <div className="w-full md:w-[28%] bg-[#3d5634] p-10 rounded-[20px] md:rounded-[0_160px_0_0] flex flex-col justify-center items-center md:items-start text-center md:text-left">
                                    <div className="text-white font-extrabold tracking-[3px] border-b-2 border-white mb-[25px] pb-1.5 pr-0 md:pr-4">CODE : TIF</div>
                                    <Link 
                                        href={auth.user ? route('member.products') : route('register')} 
                                        className="inline-block py-3.5 px-7 font-black text-[0.9rem] bg-[#c04e2b] text-white rounded-[6px] uppercase shadow-[4px_4px_0_white] transition-all duration-200 hover:bg-[#a84224] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent"
                                    >
                                        RENT NOW
                                    </Link>
                                </div>
                                <div className="w-full md:w-[40%] h-[250px] md:h-auto relative md:mr-auto">
                                    <div className="w-full h-full overflow-hidden rounded-[20px] md:rounded-[0_0_0_160px]">
                                        <img src="/assets/section2.jpeg" alt="Gear" className="w-full h-full object-cover" />
                                    </div>
                                    <img src="/assets/badge.png" alt="Discount" className="absolute top-[-90px] right-[-90px] w-[180px] z-10 hidden md:block" />
                                </div>
                            </div>
                            <div className="flex h-[250px] md:h-[260px]">
                                <div className="w-full h-full overflow-hidden rounded-[20px] md:rounded-[0_160px_0_160px]">
                                    <img src="/assets/section2.jpeg" alt="Wide Gear" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        {/* Watermark Texts */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none hidden md:block">
                            <span className="absolute top-[5%] right-[140px] text-[200px] font-extrabold text-white/30 tracking-[20px] -rotate-90 origin-center mix-blend-overlay m-0 leading-none">50%</span>
                            <span className="absolute top-[20%] right-[-400px] text-[233px] font-semibold text-white/30 tracking-[44px] -rotate-90 origin-center mix-blend-overlay m-0 leading-none font-mono">SALE</span>
                        </div>
                    </div>
                </section>

                {/* MARQUEE */}
                <div className="bg-gradient-to-b from-transparent via-[#c04e2b] to-transparent py-6 -skew-y-4 translate-y-[50px] overflow-hidden">
                    <div className="whitespace-nowrap inline-block animate-marquee">
                        <span className="text-white pr-5 text-[1.1rem] font-extrabold">Get Going! Sale ends in 30 mins ✦ </span>
                        <span className="text-white pr-5 text-[1.1rem] font-normal">Get Going! Sale ends in 30 mins ✦ </span>
                        <span className="text-white pr-5 text-[1.1rem] font-extrabold">Get Going! Sale ends in 30 mins ✦ </span>
                        <span className="text-white pr-5 text-[1.1rem] font-normal">Get Going! Sale ends in 30 mins ✦ </span>
                    </div>
                </div>

                {/* CATALOG SECTION */}
                <section className="py-24 text-center relative">
                    <div className="max-w-[1200px] mx-auto px-5">
                        <h2 className="text-[2.5rem] font-black mb-10 md:mb-[80px]">AVAILABLE FOR RENT</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-[50px]">
                            {/* Product 1 */}
                            <article className="text-left px-1.5">
                                <div className="aspect-[1/1.1] overflow-hidden bg-gray-100 mb-5 rounded-[0_160px_0_0]">
                                    <img src="/assets/jacket_windbraker.jpeg" alt="Jacket" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-[1.8rem] font-bold mb-1">Jacket Windbreaker</h3>
                                        <p className="text-[1.6rem] font-medium opacity-90">Rp20.000 / hari</p>
                                    </div>
                                    <button className="w-[50px] h-[50px] rounded-full border-2 border-[#222222] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#222222] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent">
                                        <img src="/assets/icons/arrow.png" alt="" />
                                    </button>
                                </div>
                            </article>

                            {/* Product 2 */}
                            <article className="text-left px-1.5">
                                <div className="aspect-[1/1.1] overflow-hidden bg-gray-100 mb-5 rounded-[0_0_0_160px]">
                                    <img src="/assets/backpack.jpeg" alt="Backpack" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-[1.8rem] font-bold mb-1">Carrier Backpack</h3>
                                        <p className="text-[1.6rem] font-medium opacity-90">Rp20.000 / hari</p>
                                    </div>
                                    <button className="w-[50px] h-[50px] rounded-full border-2 border-[#222222] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#222222] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent">
                                        <img src="/assets/icons/arrow.png" alt="" />
                                    </button>
                                </div>
                            </article>

                            {/* Product 3 */}
                            <article className="text-left px-1.5">
                                <div className="aspect-[1/1.1] overflow-hidden bg-gray-100 mb-5 rounded-[160px_0_0_0]">
                                    <img src="/assets/sepatu.jpeg" alt="Shoes" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-[1.8rem] font-bold mb-1">Hiking Shoes</h3>
                                        <p className="text-[1.6rem] font-medium opacity-90">Rp20.000 / hari</p>
                                    </div>
                                    <button className="w-[50px] h-[50px] rounded-full border-2 border-[#222222] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#222222] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent">
                                        <img src="/assets/icons/arrow.png" alt="" />
                                    </button>
                                </div>
                            </article>
                        </div>
                        <Link 
                            href={auth.user ? route('member.products') : route('register')} 
                            className="inline-block py-3.5 px-7 font-black text-[0.9rem] bg-[#c04e2b] text-white rounded-[6px] uppercase shadow-[4px_4px_0_#e8e1d5] transition-all duration-200 hover:bg-[#a84224] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent"
                        >
                            EXPLORE MORE
                        </Link>
                    </div>
                    <img src="/assets/icons/star2.png" alt="" className="absolute bottom-[-30px] left-0 w-[90px] hidden md:block" />
                </section>

                {/* NEWSLETTER SECTION */}
                <section className="bg-[#d8b88e] py-20 text-white">
                    <div className="max-w-[1200px] mx-auto px-5">
                        <h2 className="text-[3rem] italic font-extrabold mb-10">Get Ready for Your Next Adventure</h2>
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
                            <div className="text-[1.4rem] leading-[1.6] font-normal tracking-[0.5px] text-center md:text-left">
                                <p>Dapatkan update gear terbaru,<br />tips hiking, dan promo sewa<br />langsung ke emailmu.</p>
                            </div>
                            <form className="w-full md:flex-1 md:max-w-[500px] text-center md:text-left">
                                <label className="block text-[1.5rem] font-bold mb-4 md:mb-[25px]">Subscribe to us today!</label>
                                <div className="flex flex-col md:flex-row border-none md:border-b-2 md:border-[#c04e2b] pb-0 md:pb-3.5 gap-[15px] items-center">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        required 
                                        className="bg-transparent border md:border-none border-white/50 w-full p-[15px] md:p-0 text-center md:text-left rounded-[6px] md:rounded-none outline-none text-white text-[1rem] placeholder-white/80"
                                    />
                                    <button 
                                        type="submit" 
                                        className="w-full md:w-auto inline-block py-3.5 px-7 font-black text-[0.9rem] bg-[#c04e2b] text-white rounded-[6px] uppercase shadow-[4px_4px_0_white] transition-all duration-200 hover:bg-[#a84224] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-transparent"
                                    >
                                        KEEP ME IN TREND
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}