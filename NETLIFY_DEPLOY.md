# Deploying ShopAtDoor to Netlify

This website is fully pre-configured and optimized for **Netlify** deployment.

---

## Deployment Settings

| Setting | Value |
|---|---|
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** | `18` or `20` (default) |

---

## Method 1: Git-Based Deployment (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log into [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select your Git provider and choose the `shopatdoor` repository.
5. Netlify will automatically detect `netlify.toml` and configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**. Your site will be live with a free SSL certificate.

---

## Method 2: Netlify Drop (Drag & Drop)

If you want to deploy immediately without Git:

1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Log into [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder into the Netlify Drop area.
4. Your site will go live instantly.

---

## Method 3: Netlify CLI

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## Pre-Configured Files Included

- **`netlify.toml`**: Configures build command, publish directory, security headers, and asset caching.
- **`public/_redirects`**: Handles client-side Single Page App (SPA) fallback routing.
- **`public/robots.txt`** & **`public/sitemap.xml`**: Pre-configured for local SEO.
- **`public/images/`**: High-resolution optimized photos (including the ShopAtDoor Supercentre storefront) bundled directly into `dist/images/`.
