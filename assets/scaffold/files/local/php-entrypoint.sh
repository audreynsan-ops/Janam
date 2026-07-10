#!/bin/sh
set -e

apk add --no-cache ca-certificates
update-ca-certificates

if [ "${OS_TYPE}" == "Linux" ]; then
  HOST_UID="${CURRENT_UID:-1000}"
  HOST_GID="${CURRENT_GID:-1001}"

  PHP_USER="www-data"
  PHP_USER_ID=82
  PHP_GROUP_ID=82

  echo "Configure permissions for PHP (user: ${PHP_USER}, UID: ${PHP_USER_ID})..."

  if ! getent group "${HOST_GID}" >/dev/null; then
      addgroup -g "${HOST_GID}" hostgroup
  fi

  adduser "${PHP_USER}" hostgroup
  umask 0002

  echo "Permissions updated."
fi

exec /usr/local/bin/docker-php-entrypoint php-fpm
