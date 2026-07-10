#!/bin/sh
set -e

if [ "${OS_TYPE}" == "Linux" ]; then
  HOST_UID="${CURRENT_UID:-1000}"
  HOST_GID="${CURRENT_GID:-1001}"

  NGINX_USER="nginx"
  NGINX_USER_ID=101
  NGINX_GROUP_ID=101

  echo "Configure permissions for Nginx (user: ${NGINX_USER}, UID: ${NGINX_USER_ID})..."

  if ! getent group "${HOST_GID}" >/dev/null; then
      addgroup -g "${HOST_GID}" hostgroup
  fi

  adduser "${NGINX_USER}" hostgroup

  echo "Permissions updated."
fi
