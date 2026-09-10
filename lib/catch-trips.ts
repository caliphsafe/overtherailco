export type CatchTripMedia = {
  src: string;
  eyebrow: string;
  title: string;
  caption: string;
};

export type CatchTripMilestone = {
  step: string;
  title: string;
  detail: string;
};

export type CatchTrip = {
  slug: string;
  publicTripCode: string;
  demo: boolean;

  product: {
    name: string;
    species: string;
    format: string;
    lotCode: string;
  };

  vessel: {
    name: string;
    captain: string;
    homePort: string;
    note: string;
  };

  trip: {
    departed: string;
    landed: string;
    duration: string;
    harvestArea: string;
    harvestMethod: string;
    landedAt: string;
  };

  story: {
    eyebrow: string;
    title: string;
    body: string;
  };

  map: {
    departureLabel: string;
    harvestAreaLabel: string;
    returnLabel: string;
    privacyNote: string;
  };

  milestones: CatchTripMilestone[];
  media: CatchTripMedia[];
};

export const DEMO_CATCH_TRIP_ID =
  "otr-fleet-demo-001";

const catchTrips: Record<string, CatchTrip> = {
  [DEMO_CATCH_TRIP_ID]: {
    slug: DEMO_CATCH_TRIP_ID,
    publicTripCode: "OTR-FLEET-DEMO-001",
    demo: true,

    product: {
      name: "Sea Scallops",
      species: "Atlantic Sea Scallop",
      format: "Direct-to-consumer seafood",
      lotCode: "DEMO-LOT-001",
    },

    vessel: {
      name: "F/V Demo Vessel",
      captain: "Demo Captain",
      homePort: "New Bedford, Massachusetts",
      note:
        "This prototype uses sample vessel and captain information. Replace this record with verified Fleet Fisheries trip data before printing a customer QR code.",
    },

    trip: {
      departed: "Departure date",
      landed: "Landing date",
      duration: "Trip duration",
      harvestArea: "General offshore harvest area",
      harvestMethod: "Commercial scallop vessel",
      landedAt: "New Bedford, Massachusetts",
    },

    story: {
      eyebrow: "The people behind the catch",
      title:
        "Your seafood has a crew, a vessel, and a story.",
      body:
        "The goal of this experience is to connect each package of scallops to the real trip behind it. Once verified trip data is added, this page becomes a digital catch passport showing the vessel, captain, timing, general fishing area, trip media, and the path from the water to the customer.",
    },

    map: {
      departureLabel: "New Bedford",
      harvestAreaLabel: "Harvest area",
      returnLabel: "Return to port",
      privacyNote:
        "The map intentionally shows a general fishing area rather than exact tow coordinates. This keeps the customer connected to the source while protecting sensitive fishing-ground information.",
    },

    milestones: [
      {
        step: "01",
        title: "Left the dock",
        detail:
          "The vessel departs port and begins the trip connected to this package.",
      },
      {
        step: "02",
        title: "Worked offshore",
        detail:
          "The crew harvests scallops within the documented general fishing area.",
      },
      {
        step: "03",
        title: "Returned to port",
        detail:
          "The trip lands back ashore and the catch enters the seafood handling process.",
      },
      {
        step: "04",
        title: "Packed by Fleet Fisheries",
        detail:
          "The scallops are prepared for direct-to-consumer fulfillment and tied to this trip record.",
      },
      {
        step: "05",
        title: "Delivered to you",
        detail:
          "The QR code on the package reconnects the final customer to the trip that produced their seafood.",
      },
    ],

    media: [
      {
        src: "/hero.mp4",
        eyebrow: "01 / On the water",
        title: "The working waterfront",
        caption:
          "Existing Over The Rail footage is used in this prototype. For live orders, this slot can point to video captured on the exact trip.",
      },
      {
        src: "/about.mp4",
        eyebrow: "02 / The work",
        title: "Life offshore",
        caption:
          "A closer view of the culture and work behind the seafood industry.",
      },
      {
        src: "/shop.mp4",
        eyebrow: "03 / The catch",
        title: "From boat to shore",
        caption:
          "Trip-specific landing, deck, or handling footage can be attached to each catch record.",
      },
      {
        src: "/contact.mp4",
        eyebrow: "04 / Back in port",
        title: "The people behind it",
        caption:
          "Use this final slot for captain, crew, dockside, or arrival footage from the documented trip.",
      },
    ],
  },
};

function normalizeTripId(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase();
}

export function getCatchTrip(
  tripId: string
): CatchTrip | null {
  return (
    catchTrips[normalizeTripId(tripId)] ||
    null
  );
}

export function getCatchTripIds(): string[] {
  return Object.keys(catchTrips);
}
