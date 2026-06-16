#!/usr/bin/env bash
#
# One-time Hostinger VPS setup for the DAR landing page.
# Run this ONCE on the VPS as root (or with sudo) after the VPS is provisioned.
#
#   sudo bash setup-vps.sh yourdomain.com you@email.com
#
# It installs nginx + certbot, creates a locked-down `deploy` user that GitHub
# Actions rsyncs into, writes the nginx site, and issues a Let's Encrypt cert.
#
set -euo pipefail

DOMAIN="${1:?Usage: setup-vps.sh <domain> [email]}"
EMAIL="${2:-admin@${DOMAIN}}"
DEPLOY_USER="deploy"
WEB_ROOT="/var/www/dar-landing"

echo "==> Installing packages"
apt-get update -y
apt-get install -y nginx rsync certbot python3-certbot-nginx

echo "==> Creating deploy user '${DEPLOY_USER}'"
if ! id -u "${DEPLOY_USER}" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "${DEPLOY_USER}"
fi
install -d -m 700 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh"
touch "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chmod 600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chown "${DEPLOY_USER}:${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh/authorized_keys"

echo "==> Preparing web root ${WEB_ROOT}"
mkdir -p "${WEB_ROOT}"
chown -R "${DEPLOY_USER}:www-data" "${WEB_ROOT}"
chmod -R 775 "${WEB_ROOT}"
# Placeholder page so nginx -t / first cert request has something to serve.
[ -f "${WEB_ROOT}/index.html" ] || echo "<h1>DAR landing page — deploy pending</h1>" > "${WEB_ROOT}/index.html"

echo "==> Writing nginx site for ${DOMAIN}"
cat > /etc/nginx/sites-available/dar-landing <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${WEB_ROOT};
    index index.html;

    # Next static export with trailingSlash:true -> each route is a folder/index.html
    location / {
        try_files \$uri \$uri/ \$uri.html /404.html;
    }

    # Immutable hashed build assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Other static assets
    location ~* \.(?:jpg|jpeg|png|gif|webp|avif|svg|ico|woff2?|css|js)\$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    error_page 404 /404.html;
}
NGINX

ln -sf /etc/nginx/sites-available/dar-landing /etc/nginx/sites-enabled/dar-landing
rm -f /etc/nginx/sites-enabled/default

echo "==> Testing & reloading nginx"
nginx -t
systemctl reload nginx

echo "==> Requesting Let's Encrypt certificate"
echo "    (DNS for ${DOMAIN} must already point to this server's IP, or this step will fail — re-run it later if so.)"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
  --non-interactive --agree-tos -m "${EMAIL}" --redirect || \
  echo "!! certbot failed (likely DNS not propagated yet). Once DNS resolves, re-run: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"

echo ""
echo "==> Done."
echo "    Web root : ${WEB_ROOT}"
echo "    Deploy user: ${DEPLOY_USER}"
echo "    Next: paste the GitHub Actions deploy PUBLIC key into:"
echo "          /home/${DEPLOY_USER}/.ssh/authorized_keys"
