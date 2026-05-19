import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        // Kita panggil MainLayout dan oper data auth.user agar Navbar tahu siapa yang sedang login
        <MainLayout user={auth.user}>
            
            {/* Tag Head ini dari Inertia untuk mengubah title tab browser */}
            <Head title="Dashboard Testing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 text-[#0e0e2c] font-bold text-lg">
                            🎉 Halo, {auth.user.name}! 
                            <br />
                            <span className="text-sm font-normal text-gray-500 mt-2 block">
                                Uji coba MainLayout berhasil. Navbar dan Footer harusnya sudah muncul di atas dan di bawah kotak ini!
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}