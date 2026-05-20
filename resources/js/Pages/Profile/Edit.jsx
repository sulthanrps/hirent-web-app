import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth }) {
    const [previewImg, setPreviewImg] = useState(
        auth.user.profile_photo_path ? `/storage/${auth.user.profile_photo_path}` : '/assets/placeholder.svg'
    );

    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        phone_number: auth.user.phone_number || '',
        photo: null,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Profile" />

            <div className="flex flex-col md:flex-row w-full overflow-hidden font-['Work_Sans']">
                
                {/* === LEFT SECTION (SIDEBAR) === */}
                <div className="w-full md:w-[30%] p-8 md:p-11 md:pt-8 rounded-2xl border border-gray-300/50 flex flex-col items-center gap-7 bg-[#ECF1F4]">
                    
                    {/* Breadcrumb */}
                    <nav className="text-sm text-[#8C8CA1] self-start w-full mb-2">
                        <Link 
                            href={auth.user.role === 'owner' ? route('owner.dashboard') : route('member.products')} 
                            className="hover:underline hover:text-[#0e0e2c] transition-colors"
                        >
                            Dashboard
                        </Link>
                        <span className="mx-2">&gt;</span> 
                        <span className="font-semibold text-[#0e0e2c]">Profile</span>
                    </nav>

                    {/* Profile Info Summary */}
                    <div className="flex flex-col items-center text-center relative mt-4">
                        <img 
                            src={previewImg} 
                            alt="Profile" 
                            className="w-[130px] h-[130px] rounded-full object-cover border-4 border-white shadow-sm"
                        />
                        <h3 className="text-xl font-bold mt-4 text-[#0e0e2c]">{auth.user.name}</h3>
                        <p className="text-sm font-medium text-[#8C8CA1]">Role: <span className="uppercase">{auth.user.role}</span></p>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="w-full mt-4">
                        <ul className="flex flex-col gap-2 w-full">
                            <li className="p-4 px-6 flex items-center font-black gap-3 rounded-lg bg-black text-white cursor-pointer">
                                <i className="fa-solid fa-user"></i>
                                <span>Personal Information</span>
                            </li>
                            <li className="p-4 px-6 flex items-center font-bold gap-3 rounded-lg text-[#0e0e2c] hover:bg-black/10 transition-colors cursor-pointer">
                                <i className="fa-solid fa-credit-card"></i>
                                <span>Payment Method</span>
                            </li>
                            
                            {/* === LOGIKA CONDITIONAL KHUSUS MEMBER === */}
                            {auth.user.role === 'member' && (
                                <li className="p-4 px-6 flex items-center font-bold gap-3 rounded-lg text-[#0e0e2c] hover:bg-black/10 transition-colors cursor-pointer">
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

                {/* === RIGHT SECTION (FORM) === */}
                <div className="w-full md:w-[70%] p-8 md:p-11 flex flex-col items-center bg-white">
                    <form onSubmit={submit} className="flex flex-col gap-5 items-center w-full max-w-[650px]">
                        
                        {/* Profile Picture Upload Input */}
                        <div className="flex flex-col items-center relative mb-6">
                            <div className="relative">
                                <img 
                                    src={previewImg} 
                                    alt="Preview" 
                                    className="w-[130px] h-[130px] rounded-full object-cover border border-gray-200"
                                />
                                <label 
                                    htmlFor="profile-pic" 
                                    className="absolute -top-1 -right-1 cursor-pointer bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                                >
                                    <i className="fa-solid fa-pen text-[#AB2A02]"></i>
                                </label>
                            </div>
                            <input 
                                type="file" 
                                id="profile-pic" 
                                accept=".jpg, .png, .jpeg" 
                                className="hidden" 
                                onChange={handleImageChange}
                            />
                        </div>  

                        {/* Input Name */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name" className="font-bold text-[#0e0e2c]">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none"
                            />
                        </div>

                        {/* Input Email */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="font-bold text-[#0e0e2c]">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none"
                            />
                        </div>

                        {/* Input Phone */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="phone" className="font-bold text-[#0e0e2c]">Phone Number</label>
                            <input 
                                type="number" 
                                id="phone" 
                                value={data.phone_number}
                                onChange={e => setData('phone_number', e.target.value)}
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none"
                            />
                        </div>

                        {/* Change Password Section */}
                        <div className="flex flex-col gap-2 w-full mt-4 pt-4 border-t border-gray-100">
                            <label className="font-bold text-[#0e0e2c]">Change Password</label>
                            <input 
                                type="password" 
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                                placeholder="Write your old password"
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none mb-2"
                            />
                            <input 
                                type="password" 
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Write your new password"
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none mb-2"
                            />
                            <input 
                                type="password" 
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm your new password"
                                className="border border-gray-200 bg-[#f3f4f6] p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:border-black outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-black text-white border-none p-4 w-full rounded-lg font-bold mt-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}