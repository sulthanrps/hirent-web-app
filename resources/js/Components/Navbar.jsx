import { Link, usePage } from '@inertiajs/react';

export default function Navbar({ user }) {
    const { url } = usePage(); 

    const getNavLinkClass = (path) => {
        const isActive = url.startsWith(path);
        
        return isActive 
            ? 'text-[#AB2A02] font-extrabold' 
            : 'text-[#0e0e2c] font-semibold hover:text-[#AB2A02] transition-colors'; // Style normal
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 py-4 px-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                <Link href="/" className="flex items-center">
                    <img src="/assets/mountain_icon.png" alt="logo" className="w-12" />
                </Link>

                
                <nav className="hidden md:flex gap-8 text-sm">
                    
                    {/* {user?.role === 'member' && (
                        <Link href="/transactions" className={getNavLinkClass('/transactions')}>
                            Rental History
                        </Link>
                    )} */}

                    {user?.role === 'owner' && (
                        <>
                            <Link 
                                href={user.role === 'owner' ? route('owner.dashboard') : '/product-catalogue'} 
                                className={getNavLinkClass(user.role === 'owner' ? '/owner/dashboard' : '/product-catalogue')}
                            >
                                Home
                            </Link>

                            <Link href="/owner/rentals" className={getNavLinkClass('/owner/rentals')}>
                                Rental Requests
                            </Link>

                            <Link href="/owner/products" className={getNavLinkClass('/owner/products')}>
                                Products
                            </Link>

                            <Link href="/owner/categories" className={getNavLinkClass('/owner/categories')}>
                                Categories
                            </Link>
                        </>
                    )}
                </nav>
                
                <div className="flex items-center gap-6">
                    {user?.role === 'member' && (
                        <>
                            <Link href="/cart" className={`${url.startsWith('/cart') ? 'text-[#AB2A02]' : 'text-[#0e0e2c]'} hover:text-[#AB2A02] transition-colors`}>
                                <i className="fa-solid fa-cart-shopping text-xl"></i>
                            </Link>

                            <div className="w-px h-6 bg-gray-300"></div>
                        </>
                    )}
                    
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/profile" 
                            className={`flex items-center gap-2 text-sm transition-colors ${url.startsWith('/profile') ? 'text-[#AB2A02] font-extrabold' : 'text-[#0e0e2c] font-semibold hover:text-[#AB2A02]'}`}
                        >
                            <i className="fa-solid fa-user text-base"></i>
                            <span>{user ? user.name : 'Log In'}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}