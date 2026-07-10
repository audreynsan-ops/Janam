FROM nginx:1.28-alpine

ARG NGINX_ALLOWED_PHP_FILES=index
# Default values for "fastcgi_pass".
ARG FASTCGI_URL=backend
ARG FASTCGI_PORT=9000

# Build-time defaults for tuning (can be overridden at runtime via env).
ARG FASTCGI_EXTRA_DIRECTIVES=''

COPY . /app
# Keep static error pages outside the web root.
COPY services/nginx/static-error-pages /app/static-error-pages
COPY services/nginx/nginx.conf /etc/nginx/nginx.conf.template

# Add template processing before copying the configuration file and decline 50x
# error page to common variants.
RUN envsubst "\${NGINX_ALLOWED_PHP_FILES} \${FASTCGI_URL} \${FASTCGI_PORT} \${FASTCGI_EXTRA_DIRECTIVES}" \
    < /etc/nginx/nginx.conf.template \
    > /etc/nginx/nginx.conf \
 && rm -f /etc/nginx/nginx.conf.template \
 && cp -f /app/static-error-pages/50x.html /app/static-error-pages/500.html \
 && sed -i 's/__ERROR_CODE__/500/g' /app/static-error-pages/500.html \
 && cp -f /app/static-error-pages/50x.html /app/static-error-pages/502.html \
 && sed -i 's/__ERROR_CODE__/502/g' /app/static-error-pages/502.html \
 && cp -f /app/static-error-pages/50x.html /app/static-error-pages/503.html \
 && sed -i 's/__ERROR_CODE__/503/g' /app/static-error-pages/503.html \
 && cp -f /app/static-error-pages/50x.html /app/static-error-pages/504.html \
 && sed -i 's/__ERROR_CODE__/504/g' /app/static-error-pages/504.html
