#!/bin/bash

chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage

rm -rf public/storage
php artisan storage:link

php artisan migrate --force

a2dismod mpm_event mpm_worker || true
a2enmod mpm_prefork || true

apache2-foreground