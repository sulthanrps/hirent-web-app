# 1. Gunakan image resmi PHP dengan web server Apache bawaan
FROM php:8.2-apache

# 2. Instal tool sistem OS Linux yang dibutuhkan (git, unzip, nodejs, npm)
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. Instal ekstensi PHP yang wajib ada untuk Laravel & MySQL
RUN docker-php-ext-install pdo_mysql zip

# 4. Aktifkan fitur mod_rewrite Apache agar routing web Laravel bisa jalan
RUN a2enmod rewrite

# 5. Ubah target folder Apache agar mengarah ke folder /public milik Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. Salin seluruh file proyek HiRent dari komputer ke dalam server
COPY . /var/www/html

# 7. Ambil dan instal Composer di dalam server
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 8. Pindah ke folder kerja utama
WORKDIR /var/www/html

# 9. Jalankan instalasi dependensi PHP (Laravel) & JavaScript (React Vite)
RUN composer install --optimize-autoloader --no-dev --ignore-platform-reqs
RUN npm install --legacy-peer-deps
RUN npm run build

# 10. Berikan hak akses (permission) folder storage agar Laravel bisa nulis file/log
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 11. Jalankan perintah otomatis saat server menyala menggunakan file script
CMD ["bash", "start.sh"]