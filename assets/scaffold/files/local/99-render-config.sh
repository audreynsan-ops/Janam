#!/bin/sh
set -eu

# Static error pages
# Source: baked into the image (or mounted) at /app/static-error-pages
# Target: served by nginx from /app/static-error-pages
if [ -f /app/static-error-pages/50x.html ]; then
  for code in 500 502 503 504; do
    target="/app/static-error-pages/${code}.html"
    if [ ! -f "$target" ]; then
      cp -f /app/static-error-pages/50x.html "$target"
      sed -i "s/__ERROR_CODE__/${code}/g" "$target"
    fi
  done
fi

# Default to empty string if not provided.
FASTCGI_EXTRA_DIRECTIVES="${FASTCGI_EXTRA_DIRECTIVES:=}"

# Render main config from template (substitute only these variables).
envsubst '$FASTCGI_URL $FASTCGI_PORT $FASTCGI_EXTRA_DIRECTIVES $NGINX_ALLOWED_PHP_FILES' \
  < /etc/nginx/nginx.conf.template \
  > /etc/nginx/nginx.conf

nginx -t
