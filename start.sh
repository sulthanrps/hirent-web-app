#!/bin/bash

# Jalankan migrasi database otomatis di server produksi tanpa konfirmasi pertanyaan
php artisan migrate --force

# Buat shortcut link storage (Abaikan jika sudah ada)
php artisan storage:link || true

# Jalankan Apache web server agar website bisa diakses
apache2-foreground