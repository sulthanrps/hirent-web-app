import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react'; // Tambahkan import useState

export default function Navbar({ user }) {
    const { url } = usePage(); 
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getNavLinkClass = (path) => {
        const isActive = url.startsWith(path);
        
        return isActive 
            ? 'text-[#AB2A02] font-extrabold' 
            : 'text-[#0e0e2c] font-semibold hover:text-[#AB2A02] transition-colors'; 
    };

    const OwnerLinks = () => (
        <>
            <Link 
                href={user?.role === 'owner' ? route('owner.dashboard') : '/product-catalogue'} 
                className={getNavLinkClass(user?.role === 'owner' ? '/owner/dashboard' : '/product-catalogue')}
                onClick={() => setIsMobileMenuOpen(false)} 
            >
                Home
            </Link>

            <Link href="/owner/rentals" className={getNavLinkClass('/owner/rentals')} onClick={() => setIsMobileMenuOpen(false)}>
                Rental Requests
            </Link>

            <Link href="/owner/products" className={getNavLinkClass('/owner/products')} onClick={() => setIsMobileMenuOpen(false)}>
                Products
            </Link>

            <Link href="/owner/categories" className={getNavLinkClass('/owner/categories')} onClick={() => setIsMobileMenuOpen(false)}>
                Categories
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 py-4 px-6 md:px-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                <Link href="/" className="flex items-center">
                    <img src="/assets/mountain_icon.png" alt="logo" className="w-12" />
                </Link>

                <nav className="hidden md:flex gap-8 text-sm">
                    {user?.role === 'owner' && <OwnerLinks />}
                </nav>
                
                <div className="flex items-center gap-4 md:gap-6">
                    {user?.role === 'member' && (
                        <>
                            <Link href="/cart" className={`${url.startsWith('/cart') ? 'text-[#AB2A02]' : 'text-[#0e0e2c]'} hover:text-[#AB2A02] transition-colors`}>
                                <i className="fa-solid fa-cart-shopping text-xl"></i>
                            </Link>

                            <div className="w-px h-6 bg-gray-300 hidden md:block"></div>
                        </>
                    )}
                    
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/profile" 
                            className={`flex items-center gap-2 text-sm transition-colors ${url.startsWith('/profile') ? 'text-[#AB2A02] font-extrabold' : 'text-[#0e0e2c] font-semibold hover:text-[#AB2A02]'}`}
                        >
                            {/* Logika penampil foto profil / ikon */}
                            {user?.profile_picture ? (
                                <img 
                                    src={`/storage/${user.profile_picture}`} 
                                    alt="Profile Avatar" 
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                    <i className="fa-solid fa-user text-gray-500 text-sm"></i>
                                </div>
                            )}

                            {/* Nama User */}
                            <span className="hidden sm:inline-block">{user ? user.name : 'Log In'}</span>
                        </Link>
                    </div>

                    {user?.role === 'owner' && (
                        <button 
                            className="md:hidden text-2xl text-[#0e0e2c] ml-2 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                        </button>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && user?.role === 'owner' && (
                <nav className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-gray-100 text-sm pb-2">
                    <OwnerLinks />
                </nav>
            )}
        </header>
    );
}