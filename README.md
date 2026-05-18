# 🏕️ Hirent - Hiking Rental Platform

Hirent adalah platform penyewaan alat-alat mendaki gunung (hiking) berbasis web yang mempertemukan pemilik barang (Owner) dan penyewa (Member). Proyek ini dibangun menggunakan arsitektur MVC dengan **Laravel 11**, **Laravel Breeze (Blade)**, dan **Tailwind CSS**.

## 🚀 Prasyarat Instalasi
Sebelum memulai, pastikan perangkat kalian sudah terinstal:
- [Laragon](https://laragon.org/) (Sangat direkomendasikan untuk pengguna Windows)
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL (Bisa pakai bawaan Laragon)

## 🛠️ Panduan Setup (Local Development)

Ikuti langkah-langkah berikut secara berurutan untuk menjalankan proyek ini di laptop masing-masing:

**1. Clone Repository**
Buka terminal di dalam folder `www` atau `htdocs` Laragon, lalu jalankan:
```bash
git clone <masukkan-link-repo-github-di-sini>
cd hirent
```

**2. Install Dependensi (Backend & Frontend)**
```bash
composer install
npm install
```

**3. Konfigurasi Environment (.env)**

Copy file .env.example dan rename menjadi .env.

Buka aplikasi Database di laragon dan buat database kosong dengan nama hirent.

Buka file .env di VSCode, pastikan konfigurasi databasenya seperti ini:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hirent
DB_USERNAME=root
DB_PASSWORD=
```

**4. Generate Application Key**
```bash
php artisan key:generate
```

**5. Migrasi Database & Seeder Data (Wajib!)**
Perintah ini akan membuat semua tabel sekaligus memasukkan data dummy awal (user, kategori, produk) agar aplikasi bisa langsung dites:
```bash
php artisan migrate:fresh --seed
```

**6. Buat Storage Link**
Agar gambar produk dan foto profil bisa dimuat dengan benar oleh website:
```bash
php artisan storage:link
```

**7. Jalankan Server Development**
Buka dua terminal secara terpisah di VS Code, dan jalankan perintah berikut secara bersamaan:

Terminal 1 (Untuk meng-compile file Tailwind/CSS & JS):
```bash
npm run dev
```

Terminal 2 (Untuk menjalankan server Laravel):

```bash
php artisan serve
```

Sekarang website bisa diakses di browser melalui: http://localhost:8000

## 🔑 Akun Testing

Gunakan kredensial berikut untuk login ke dalam aplikasi tanpa harus melakukan register ulang:

### Akun Owner (Pemilik Barang):
```
Email: owner@hirent.com

Password: password123
```

### Akun Member (Penyewa):
```
Email: member@hirent.com

Password: password123
```