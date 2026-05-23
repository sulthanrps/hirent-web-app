export default function Footer() {
    return (
        <footer className="bg-[#3E5626] text-white py-6 px-8 text-xs font-bold mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    Affordable hiking gear rental for every adventure.
                </div>
                
                <div className="flex gap-6 text-base">
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity"><i className="fa-brands fa-twitter"></i></a>
                </div>

                <div className="flex items-center gap-2">
                    All rights reserved © 2026 by 
                    <img src="/assets/mountain_icon.png" alt="logo" className="w-6 h-6" />
                </div>
            </div>
        </footer>
    );
}