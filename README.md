# Over The Rail Co. — Headless Shopify Storefront

A custom Next.js storefront for **Over The Rail Co.** built around New Bedford's commercial fishing culture and the brand statement:

> **Built by Fishermen. Worn with Pride.**

## What is included

- Home page with brand manifesto and automatic featured Shopify products
- Shop page with Shopify Collection filters
- Individual Shopify product pages
- Individual Shopify collection pages
- Variant selection
- Quantity controls
- Persistent cart saved in the customer's browser
- Cart drawer
- Add, update, and remove cart items
- Shopify checkout handoff
- About page
- Contact page
- Mobile navigation and responsive design
- SEO metadata
- Empty states so the site still builds before Shopify credentials are added

## Shopify behavior

The home page first looks for a Shopify collection with this exact handle:

`featured-products`

If it exists and contains products, the first four products in that collection become the featured products on the home page. If it does not exist, the site automatically falls back to the newest products in Shopify.

The Shop page reads your Shopify Collections automatically and turns them into collection filter buttons.

## Environment variables

Add these four variables in Vercel:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
SHOPIFY_STOREFRONT_API_VERSION=2026-07
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

Do not put a real Storefront token directly in GitHub. Keep it in Vercel Environment Variables.

## GitHub → Vercel setup using only the websites

### Part 1 — Create the GitHub repository

1. Sign in to GitHub.
2. Click **New repository**.
3. Name the repository something like `over-the-rail-co`.
4. Choose **Private** unless you intentionally want the source code public.
5. Click **Create repository**.
6. Extract the ZIP from ChatGPT on your computer.
7. In the empty GitHub repository, click **uploading an existing file**.
8. Drag every file and folder from inside the extracted `over-the-rail-co` folder into GitHub.
9. Commit the upload to the `main` branch.

Important: upload the contents of the project folder, not the outer folder itself. `package.json`, `app`, `components`, and `lib` should appear at the repository root.

### Part 2 — Import into Vercel

1. Sign in to Vercel.
2. Choose **Add New → Project**.
3. Connect GitHub if it is not already connected.
4. Find the `over-the-rail-co` repository and click **Import**.
5. Vercel should automatically detect **Next.js** as the Framework Preset.
6. Leave the Root Directory as `./`.
7. Before deploying, open **Environment Variables**.

Add:

#### `SHOPIFY_STORE_DOMAIN`
Value: your `.myshopify.com` domain only, without `https://`.

#### `SHOPIFY_STOREFRONT_TOKEN`
Value: your Storefront API access token from Shopify Headless.

#### `SHOPIFY_STOREFRONT_API_VERSION`
Value:

`2026-07`

#### `NEXT_PUBLIC_SITE_URL`
For the first deploy you may use:

`https://your-project-name.vercel.app`

You can update this later after your final Vercel URL or custom domain is known.

8. Make sure the variables apply to **Production**, **Preview**, and **Development**.
9. Click **Deploy**.

### Part 3 — After the first deployment

1. Open the deployed website.
2. Visit `/shop` and confirm Shopify products appear.
3. Open a product and confirm variants appear correctly.
4. Add an item to cart.
5. Change its quantity.
6. Remove an item.
7. Add an item again and click **Continue to checkout**.
8. Confirm Shopify checkout opens correctly.

### Part 4 — Recommended Shopify collection setup

Create collections such as:

- New Arrivals
- T-Shirts
- Hoodies & Sweatshirts
- Hats
- Outerwear
- Accessories
- Featured Products

For the automatic home-page feature section, create a collection whose handle is exactly:

`featured-products`

The collection title may still be written normally as **Featured Products**.

## Updating the site later

Because Vercel is connected to GitHub, every commit to the connected production branch automatically creates a new deployment. Product, price, inventory, image, and collection updates made in Shopify are requested by the storefront dynamically and do not require editing the website code.
