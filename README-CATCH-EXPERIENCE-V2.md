# Over The Rail Co. × Fleet Fisheries — Catch Experience V2

This patch upgrades the existing Catch Passport into a more immersive customer experience while keeping the same dynamic `/catch/[tripId]` architecture.

## Upload / replace

Copy these files into the same paths in `caliphsafe/overtherailco`:

- `app/catch/page.tsx`
- `app/catch/[tripId]/page.tsx`
- `app/catch/catch.module.css`
- `components/CatchVoyageExperience.tsx`
- `components/CatchShareButton.tsx`
- `lib/catch-trips.ts`

The patch does not change `package.json`, the Shopify cart, the Shop page, the homepage, or global CSS.

## Existing public assets used

- `/icon.png`
- `/fleet.png`
- `/hero.mp4`
- `/about.mp4`
- `/shop.mp4`
- `/contact.mp4`

## Experience changes

1. Full-screen QR-scan reveal hero.
2. Scroll-driven voyage story with changing video chapters.
3. Animated general harvest-area route.
4. Cinematic vessel / people section.
5. Facts are revealed later as proof instead of leading the experience.
6. Visual chain-of-custody journey from dock to customer.
7. Share-this-catch control using the native device share sheet when available.
8. Full-screen emotional closing section connecting the food to its origin.
9. Mobile-specific layouts and reduced-motion fallbacks.

## Demo route

`/catch/otr-fleet-demo-001`

The demo record remains visibly marked as sample data. Replace the trip record in `lib/catch-trips.ts` with verified Fleet Fisheries trip information before using the URL on seafood packaging.
