# Over The Rail Co. × Fleet Fisheries
## Catch Passport / Trip Traceability Patch

This ZIP is a patch for the existing `caliphsafe/overtherailco` Next.js storefront.

It adds a QR-ready seafood traceability experience without changing the current
shop, cart, header, footer, or Shopify integration.

## Files in this patch

- `app/catch/page.tsx`
  - Manual catch-code lookup page.
  - Useful if a customer types the code instead of scanning the QR.

- `app/catch/[tripId]/page.tsx`
  - Dynamic catch passport page.
  - Each QR code points to one trip ID.

- `app/catch/catch.module.css`
  - Scoped styles for the traceability experience.
  - No global CSS replacement is required.

- `lib/catch-trips.ts`
  - Typed trip-data source.
  - Contains one sample record: `OTR-FLEET-DEMO-001`.

## Required public assets

The existing Over The Rail videos are referenced directly:

- `public/hero.mp4`
- `public/about.mp4`
- `public/shop.mp4`
- `public/contact.mp4`
- `public/icon.png`

Add the Fleet Fisheries logo as:

- `public/fleet.png`

IMPORTANT: The request referenced `fleet.pgn`. If the actual file is named
`fleet.pgn`, rename it to `fleet.png` so browsers serve it as the correct image type.

## Demo URL

After deployment:

`/catch/otr-fleet-demo-001`

The demo page is visibly marked as sample data so placeholder vessel/captain/trip
details can never be mistaken for real seafood provenance.

## Real QR-code format

For each verified trip, create a unique slug in `lib/catch-trips.ts`.

Example:

`https://overtherailco.com/catch/fleet-2026-09-trip-014`

Print that URL into the QR code on the seafood package.

A customer scan opens the exact trip record.

## Adding a real trip

Copy the demo object in `lib/catch-trips.ts`, then replace:

- `slug`
- `publicTripCode`
- `demo` -> set to `false`
- product / species / lot code
- vessel name
- captain
- home port
- departure date
- landing date
- trip duration
- general harvest area
- harvest method
- trip-specific story copy
- chain-of-custody details
- media paths

For real trip footage, upload the videos into `public/` and replace the `media[].src`
values for that trip.

## General-area map

The page intentionally uses a generalized route visualization instead of publishing
precise tow coordinates. The labels are driven by the trip data object.

If Fleet Fisheries later approves public coordinates, the map can be upgraded to a
real geographic map provider. The first version stays dependency-free and avoids
exposing sensitive fishing-ground information.

## Recommended production phase after this patch

The current data file is ideal for proving the experience and launching a pilot.

For scale, the next phase should move trip records into a database/admin workflow so:

1. Fleet/OTR staff create a trip.
2. Vessel, captain, dates, lot, general area, and media are uploaded.
3. The system creates a public trip URL.
4. A QR code is generated for that trip/lot.
5. Packaging links directly to the public catch passport.
6. Records can be updated without redeploying the storefront.

That admin/data phase is intentionally not included in this patch because this first
build requires no new packages, no new environment variables, and no database migration.

## GitHub / Vercel

This patch does not change `package.json` and adds no dependencies.

Upload the folders/files into the same paths in your existing repository, commit,
and Vercel can build the site using the existing project configuration.
