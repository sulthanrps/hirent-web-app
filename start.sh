#!/bin/bash

# Jalankan migrasi database otomatis di server produksi tanpa konfirmasi pertanyaan
php artisan migrate --force

# Buat shortcut link storage agar foto profil/produk bisa diakses publik luar
php artisan storage:link

# Jalankan Apache web server agar website bisa diakses
apache2-foreground