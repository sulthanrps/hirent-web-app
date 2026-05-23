import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ auth, product, categories }) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: product.name || '',
        category_id: product.category_id || '',
        price: product.price || '',
        stock: product.stock || '',
        description: product.description || '',
        image: null, 
        _method: 'PUT', 
    });

    const [imagePreview, setImagePreview] = useState(product.image || '/assets/mountain_icon.png');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file); 
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('owner.products.update', product.id));
    };

    // Fungsi hapus produk
    const handleDelete = () => {
        if (confirm('Apakah kamu yakin ingin menghapus produk ini secara permanen?')) {
            destroy(route('owner.products.destroy', product.id));
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title={`Edit ${product.name}`} />

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === HEADER === */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('owner.products.index')} 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#0e0e2c] hover:bg-gray-50 transition-colors"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold text-[#0e0e2c]">Edit Product</h1>
                            <p className="text-sm text-[#8C8CA1]">Update your gear information and availability</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleDelete}
                        disabled={processing}
                        className="px-6 py-2.5 rounded-lg text-sm font-bold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                        <i className="fa-solid fa-trash-can mr-2"></i> Delete Product
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* === LEFT COLUMN: MEDIA === */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#0e0e2c] mb-4">Product Image</h3>
                            
                            <div className="relative group overflow-hidden rounded-xl aspect-square bg-gray-100 mb-4 border-2 border-dashed border-gray-200 flex items-center justify-center">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                                    <i className="fa-solid fa-camera text-2xl mb-2"></i>
                                    <span className="text-xs font-bold uppercase">Change Photo</span>
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            
                            <p className="text-[10px] text-[#8C8CA1] leading-relaxed italic">
                                * Recommended resolution: 800x800px. Max size: 2MB. Format: JPG, PNG, WEBP.
                            </p>
                            {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
                        </div>
                    </div>

                    {/* === RIGHT COLUMN: FORM DETAILS === */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
                            
                            {/* Product Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0e0e2c]">Product Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none transition-all`}
                                    placeholder="e.g. Naturehike Cloud Up 2"
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category (Dinamis dari Database) */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#0e0e2c]">Category</label>
                                    <select 
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.category_id ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none bg-white`}
                                    >
                                        <option value="" disabled>Select a category...</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <span className="text-xs text-red-500">{errors.category_id}</span>}
                                </div>

                                {/* Stock */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#0e0e2c]">Stock Quantity</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.stock ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none`}
                                    />
                                    {errors.stock && <span className="text-xs text-red-500">{errors.stock}</span>}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0e0e2c]">Rental Price per Day (Rp)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.price ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none font-bold`}
                                    />
                                </div>
                                {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0e0e2c]">Description</label>
                                <textarea 
                                    rows="5"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none resize-none leading-relaxed`}
                                ></textarea>
                                {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-gray-50">
                                <Link 
                                    href={route('owner.products.index')}
                                    className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-3 rounded-xl text-sm font-bold bg-[#3E5626] hover:bg-[#2d401b] text-white shadow-lg shadow-green-900/20 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </MainLayout>
    );
}