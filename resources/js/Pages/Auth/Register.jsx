import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        phone_number: '',
        role: 'member',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FAFCFE] to-[#FADD9B] p-4 md:p-8 font-['Work_Sans']">
            <Head title="Register" />

            {/* Main Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* Header Section */}
                <div className="flex items-center gap-5 mb-10 border-b border-gray-100 pb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#b33400] bg-white flex-shrink-0">
                        <img src="/assets/mountain_icon.png" alt="logo" className="w-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#0e0e2c]">
                            Create an Account
                        </h1>
                        <p className="text-sm text-[#777] mt-1">Please fill in your basic details to continue.</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={submit}>
                    
                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Full Name</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <span className="mr-[10px] text-[#b33400]">👤</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Sulthan Rafi"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Username</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.username ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <span className="mr-[10px] text-[#b33400] font-bold">@</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="e.g. sulthan_r"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Email Address</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <span className="mr-[10px] text-[#b33400]">✉</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="sulthan@example.com"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Phone Number</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.phone_number ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <span className="mr-[10px] text-[#b33400]">📞</span>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    placeholder="081234567890"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Password</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.password ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <svg className="mr-[10px] text-[#b33400]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#777] mb-2">Confirm Password</label>
                            <div className={`flex items-center rounded-lg border-2 ${errors.password_confirmation ? 'border-red-500' : 'border-[#ecf1f4] focus-within:border-[#b33400]'} bg-[#f3f4f6] p-3 transition-colors`}>
                                <svg className="mr-[10px] text-[#b33400]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    {/* Role Selection (Full Width) */}
                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-[#777] mb-2">I want to register as</label>
                        <div className="flex items-center rounded-lg border-2 border-[#ecf1f4] focus-within:border-[#b33400] bg-[#f3f4f6] p-3 transition-colors">
                            <span className="mr-[10px] text-[#b33400]">⛺</span>
                            <select
                                name="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full border-none bg-transparent text-[15px] outline-none focus:ring-0 p-0 text-[#0e0e2c] cursor-pointer"
                            >
                                <option value="member">Renter (Member)</option>
                                <option value="owner">Equipment Owner (Owner)</option>
                            </select>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col gap-2 w-full md:w-auto text-center md:text-left">
                            <button 
                                type="button" 
                                onClick={() => reset()} 
                                className="text-[14px] font-semibold text-[#777] hover:text-[#b33400] transition-colors w-fit mx-auto md:mx-0"
                            >
                                ↺ Reset All
                            </button>
                            <Link 
                                href={route('login')} 
                                className="text-[14px] font-semibold text-[#777] hover:text-[#b33400] transition-colors"
                            >
                                Already have an account? Log in
                            </Link>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full md:w-auto min-w-[180px] rounded-full bg-[#3E5626] px-8 py-3 text-[16px] font-bold text-white transition-opacity hover:bg-[#2d401b] disabled:opacity-50 shadow-md"
                        >
                            {processing ? 'Processing...' : 'Continue'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}