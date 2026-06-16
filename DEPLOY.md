# Deploying the DAR landing page

Static Next.js export → **Hostinger VPS** (nginx) → domain on **Namecheap**, with
**GitHub Actions** auto-deploying on every push to `main`.

```
git push main ──▶ GitHub Actions ──(npm run build → ./out)──▶ rsync over SSH ──▶ /var/www/dar-landing ──▶ nginx ──▶ https://darhub.io
```

Do the four one-time setup steps below once. After that, **every push to `main` deploys itself.**

---

## 1. One-time: VPS setup

SSH into your Hostinger VPS as root, copy the setup script over, and run it with
your domain:

```bash
# from your machine
scp deploy/setup-vps.sh root@72.60.202.243:/root/

# on the VPS
sudo bash /root/setup-vps.sh darhub.io you@email.com
```

This installs nginx + certbot, creates a `deploy` user, writes the nginx site,
and (if DNS already points here) issues an SSL cert. If certbot fails because DNS
hasn't propagated yet, that's fine — re-run the certbot line it prints after step 3.

## 2. One-time: deploy SSH key

GitHub Actions needs a key to rsync into the VPS. Generate a **dedicated** keypair
(no passphrase) on your machine:

```bash
ssh-keygen -t ed25519 -f dar_deploy_key -N "" -C "github-actions-dar"
```

- Put the **public** key on the VPS so the `deploy` user accepts it:
  ```bash
  ssh-copy-id -i dar_deploy_key.pub deploy@72.60.202.243
  # or paste the contents of dar_deploy_key.pub into
  # /home/deploy/.ssh/authorized_keys on the VPS
  ```
- Keep the **private** key (`dar_deploy_key`) for step 4. Don't commit it.

## 3. One-time: Namecheap → Hostinger DNS

You chose **Hostinger nameservers**. In Hostinger hPanel, find your VPS's DNS zone
(or the Hostinger nameservers, typically `ns1.dns-parking.com` / `ns2.dns-parking.com`),
then:

1. **Namecheap** → Domain List → *Manage* → *Nameservers* → **Custom DNS** → enter
   Hostinger's two nameservers → save. (Propagation: minutes to ~24h.)
2. In **Hostinger's DNS zone** for the domain, make sure these records point at your VPS:
   | Type | Host | Value           |
   |------|------|-----------------|
   | A    | `@`  | `72.60.202.243`   |
   | A    | `www`| `72.60.202.243`   |
3. Check propagation: `dig +short darhub.io` should return your VPS IP.
   Once it does, finish SSL if certbot was skipped in step 1:
   ```bash
   sudo certbot --nginx -d darhub.io -d www.darhub.io
   ```

> Prefer to keep DNS at Namecheap instead? Skip the nameserver change and just add
> the two A records above in Namecheap's *Advanced DNS* tab. Everything else is identical.

## 4. One-time: GitHub secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret.**
Add these (the workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) reads them):

| Secret        | Value                                              |
|---------------|----------------------------------------------------|
| `VPS_HOST`    | your VPS IP or hostname                            |
| `VPS_USER`    | `deploy`                                           |
| `VPS_PATH`    | `/var/www/dar-landing`                             |
| `VPS_SSH_KEY` | full contents of the **private** key `dar_deploy_key` |
| `VPS_PORT`    | *(optional)* SSH port if not `22`                  |

---

## That's it

Push to `main` (or hit **Run workflow** in the Actions tab) and the site builds and
deploys automatically. Verify locally any time with:

```bash
npm run build && npx serve out
```

### Notes
- The lead-capture form currently only `console.log`s its data — no backend yet.
  When you want submissions stored/emailed, that needs a small API (the static
  export can POST to an external endpoint or a serverless function).
- To deploy from your machine without CI:
  `npm run build && rsync -avz --delete out/ deploy@72.60.202.243:/var/www/dar-landing/`
