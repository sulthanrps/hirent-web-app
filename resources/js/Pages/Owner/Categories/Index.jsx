import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, categories = [] }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('owner.categories.store'), {
            onSuccess: () => reset('name'),
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Manage Categories" />

            <div className="p-6 md:p-10 font-['Work_Sans'] bg-[#FAFCFE] min-h-screen">
                
                {/* === HEADER === */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-[#0e0e2c]">Product Categories</h1>
                    <p className="text-sm text-[#8C8CA1] mt-1">Organize your rental gears into structured categories</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-[#0e0e2c]">Existing Categories</h3>
                                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {categories.length} Total
                                </span>
                            </div>

                            <div className="flex flex-col">
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <div key={category.id} className="flex justify-between items-center p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#ecf1f4] text-[#0e0e2c] flex items-center justify-center group-hover:bg-[#3E5626] group-hover:text-white transition-colors">
                                                    <i className="fa-solid fa-tags"></i>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#0e0e2c] text-base">{category.name}</h4>
                                                    <p className="text-xs text-[#8C8CA1] mt-0.5">
                                                        ID: CAT-{category.id.toString().padStart(3, '0')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-3">
                                            <i className="fa-solid fa-folder-open text-2xl"></i>
                                        </div>
                                        <p className="text-[#8C8CA1] text-sm font-medium">Belum ada kategori yang ditambahkan.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
                            <h3 className="font-bold text-[#0e0e2c] mb-6">Add New Category</h3>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#0e0e2c]">Category Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[#0e0e2c] outline-none transition-all`}
                                        placeholder="e.g. Tenda & Shelter"
                                    />
                                    {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
                                </div>

                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full mt-2 py-3 rounded-xl text-sm font-bold bg-[#3E5626] hover:bg-[#2d401b] text-white shadow-lg shadow-green-900/20 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {processing ? (
                                        'Saving...'
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-plus"></i> Save Category
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            <div className="mt-6 p-4 bg-[#FADD9B]/20 rounded-xl border border-[#FADD9B]/50">
                                <div className="flex gap-3">
                                    <i className="fa-solid fa-lightbulb text-[#AB2A02] mt-0.5"></i>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Kategori membantu member memfilter alat dengan lebih mudah. Buat nama yang singkat dan jelas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}