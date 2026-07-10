ARG BASE_IMAGE=ghcr.io/aion-solutions/php-8.3:8.3.21-r1-xdebug
FROM ${BASE_IMAGE}
RUN apk add --no-cache patch git openssh-client zip unzip su-exec
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
