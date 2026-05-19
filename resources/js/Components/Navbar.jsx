import { Link } from '@inertiajs/react';

export default function Navbar({ user }) {
    return (
        <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 py-4 px-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img src="/assets/mountain_icon.png" alt="logo" className="w-12" />
                </Link>

                {/* <nav className="hidden md:flex gap-8 font-semibold text-[#0e0e2c] text-sm">
                    <Link href="/products" className="hover:text-[#AB2A02] transition-colors">Home</Link>
                    <Link href="/transactions" className="hover:text-[#AB2A02] transition-colors">Rental History</Link>
                </nav> */}
                
                <div className="flex items-center gap-6">
                    <Link href="/cart" className="text-[#0e0e2c] hover:text-[#AB2A02] transition-colors">
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                    </Link>
                    
                    <div className="w-px h-6 bg-gray-300"></div>

                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="flex items-center gap-2 font-semibold text-sm hover:text-[#AB2A02] transition-colors">
                            <i className="fa-solid fa-user text-base"></i>
                            <span>{user?.name || 'Member'}</span>
                        </Link>
                        
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}