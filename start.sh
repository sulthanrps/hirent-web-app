#!/bin/bash

# 1. Hapus link storage lama jika ada, lalu buat ulang agar rapi & tidak error
rm -rf public/storage
php artisan storage:link

# 2. Jalankan migrasi database otomatis
php artisan migrate --force

# 3. Paksa matikan mesin Apache yang bentrok sesaat sebelum server nyala
a2dismod mpm_event mpm_worker || true
a2enmod mpm_prefork || true

# 4. Nyalakan server web
apache2-foreground