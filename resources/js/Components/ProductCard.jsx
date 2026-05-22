import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden relative border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            
            {product.price < 30000 && (
                <span className="absolute top-6 left-6 bg-[#AB2A02] text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                    PROMO
                </span>
            )}

            <div className="relative pt-[100%] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                    src={
                        product.image 
                            ? (product.image.startsWith('/assets/') ? product.image : `/storage/${product.image}`) 
                            : '/assets/product-dummy-img.png'
                    } 
                    alt={product.name} 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                />
            </div>

            <div className="flex-1 flex flex-col">
                <div className="text-[10px] text-[#3E5626] font-bold mb-1 uppercase tracking-wide">
                    {product.category?.name || 'CATEGORY'}
                </div>
                <h3 className="text-sm font-bold mb-2 leading-tight line-clamp-2 text-[#0e0e2c]">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-[#c6913f] text-xs tracking-widest">★★★★★</span>
                    <span className="text-[11px] text-[#8C8CA1]">(112)</span>
                </div>

                {/* Card Footer (Price & Rent Button) */}
                <div className="mt-auto flex justify-between items-center pt-2">
                    <div className="text-lg md:text-xl font-bold text-[#0e0e2c]">
                        Rp {product.price?.toLocaleString('id-ID')} 
                        <span className="text-[11px] font-normal text-[#8C8CA1] ml-1">/ day</span>
                    </div>
                    <Link 
                        href={`/products/${product.id}`} 
                        className="bg-transparent text-[#AB2A02] border border-[#AB2A02] hover:bg-[#AB2A02] hover:text-white text-[10px] font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        RENT
                    </Link>
                </div>
            </div>
        </div>
    );
}