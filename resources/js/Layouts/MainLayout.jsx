import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ user, children }) {
    return (
        <div className="min-h-screen bg-white flex flex-col font-['Work_Sans'] text-[#0e0e2c]">
            
            <Navbar user={user} />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                {children}
            </main>

            <Footer />
            
        </div>
    );
}