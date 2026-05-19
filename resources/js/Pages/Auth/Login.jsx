import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex h-screen w-full flex-col md:flex-row font-['Work_Sans']">
            <Head title="Log in" />

            {/* LEFT PANEL */}
            <div className="flex w-full md:w-[65%] items-center justify-center bg-gradient-to-br from-[#FAFCFE] to-[#FADD9B] p-6 h-full">
                <div className="w-full max-w-[360px] text-center">
                    
                    <div className="mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-[#b33400]">
                        <img src="/assets/mountain_icon.png" alt="logo" className="w-[120px]" />
                    </div>

                    <h1 className="mb-[30px] text-[32px] font-bold tracking-tight text-[#0e0e2c]">
                        Welcome Back
                    </h1>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        
                        <div className="mb-[15px]">
                            <div className={`flex items-center rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-[#b33400]'} bg-[#f3f4f6] p-3`}>
                                <span className="mr-[10px] text-[#b33400]">✉</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email"
                                    className="w-full border-none bg-transparent text-[16px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-left text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="mb-[15px]">
                            <div className={`flex items-center rounded-lg border-2 ${errors.password ? 'border-red-500' : 'border-[#b33400]'} bg-[#f3f4f6] p-3`}>
                                <svg className="mr-[10px] text-[#b33400]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="w-full border-none bg-transparent text-[16px] outline-none focus:ring-0 p-0 text-[#0e0e2c]"
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-left text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="mt-[15px] w-full rounded-full bg-[#b33400] p-[14px] text-[18px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* <div className="my-[25px] flex items-center text-[14px] text-[#777]">
                        <div className="h-px flex-1 bg-[#ccc]"></div>
                        <span className="mx-[10px]">or sign in with</span>
                        <div className="h-px flex-1 bg-[#ccc]"></div>
                    </div> */}

                    {/* Social Login Buttons
                    <div className="mb-5 flex justify-center gap-[15px]">
                        <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-none bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>

                        <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#ddd] bg-white transition-transform duration-200 hover:scale-110">
                            <svg viewBox="0 0 48 48" width="30" height="30">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                        </button>

                        <button className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-none bg-black text-white transition-transform duration-200 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.057 12.781c.032 2.588 2.254 3.462 2.287 3.477-.023.072-.351 1.201-1.152 2.365-.692 1.007-1.411 2.009-2.533 2.029-1.103.022-1.458-.648-2.72-.648-1.261 0-1.654.628-2.7.668-1.083.043-1.925-1.097-2.621-2.105-1.423-2.061-2.511-5.831-1.046-8.369.727-1.258 2.022-2.054 3.433-2.074 1.069-.02 2.078.719 2.735.719.658 0 1.879-.904 3.15-.775.533.022 2.029.213 2.991 1.614-.076.048-1.789 1.043-1.833 3.199zm-2.427-6.73c.566-.689.948-1.644.843-2.597-.819.033-1.812.544-2.399 1.23-.526.608-.987 1.58-.864 2.514.913.07 1.854-.458 2.42-1.147z"/>
                            </svg>
                        </button>
                    </div> */}

                    <p className="text-[14px] text-[#777] mt-4">
                        don't have an account?{' '}
                        <Link href={route('register')} className="font-semibold text-[#b33400] hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL (Image) */}
            <div className="hidden w-[35%] md:block h-full bg-black">
                <img 
                    src="/assets/hiking_outfit_login.jpg" 
                    alt="side image" 
                    className="h-full w-full object-cover opacity-70"
                />
            </div>
        </div>
    );
}