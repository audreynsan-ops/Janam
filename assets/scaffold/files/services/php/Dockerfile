FROM ghcr.io/aion-solutions/php-8.3:8.3.21-r1

COPY . /app
COPY services/php/php.ini /usr/local/etc/php/php.ini
COPY services/php/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN rm -rf /app/services/
