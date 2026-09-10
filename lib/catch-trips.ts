export type CatchTripMedia = {
  src: string;
  eyebrow: string;
  title: string;
  caption: string;
};

export type CatchTripMilestone = {
  step: string;
  time: string;
  title: string;
  detail: string;
};

export type CatchTrip = {
  slug: string;
  publicTripCode: string;
  demo: boolean;
  demoNote?: string;

  product: {
    name: string;
    species: string;
    pack: string;
    lotCode: string;
  };

  vessel: {
    name: string;
    captain: string;
    homePort: string;
    officialNumber: string;
    built: string;
    hull: string;
    length: string;
    beam: string;
    fishery: string;
  };

  trip: {
    departed: string;
    landed: string;
    duration: string;
    harvestArea: string;
    harvestMethod: string;
    landedAt: string;
    weather: string;
  };

  map: {
    departureLabel: string;
    harvestAreaLabel: string;
    returnLabel: string;
  };

  milestones: CatchTripMilestone[];
  media: CatchTripMedia[];
};

export const DEMO_CATCH_TRIP_ID = "vp-0907-nb";

const catchTrips: Record<string, CatchTrip> = {
  [DEMO_CATCH_TRIP_ID]: {
    slug: DEMO_CATCH_TRIP_ID,
    publicTripCode: "VP-0907-NB",
    demo: true,
    demoNote:
      "Sample voyage · F/V Viking Power vessel and captain details are real Fleet Fisheries information. Voyage dates, lot, weather, and harvest region are illustrative.",

    product: {
      name: "Atlantic Sea Scallops",
      species: "Atlantic Sea Scallop",
      pack: "Fresh scallops · 2 lb box",
      lotCode: "VP-090726-01",
    },

    vessel: {
      name: "F/V Viking Power",
      captain: "Marty Harris",
      homePort: "New Bedford, Massachusetts",
      officialNumber: "1296701",
      built: "2019",
      hull: "Steel",
      length: "100.0 ft",
      beam: "30.0 ft",
      fishery: "Sea Scallops",
    },

    trip: {
      departed: "September 2, 2026 · 4:42 AM",
      landed: "September 7, 2026 · 6:18 PM",
      duration: "6 days",
      harvestArea: "Georges Bank · North Atlantic",
      harvestMethod: "Commercial sea scallop dredge",
      landedAt: "New Bedford Harbor",
      weather: "48–61°F · variable North Atlantic seas",
    },

    map: {
      departureLabel: "New Bedford",
      harvestAreaLabel: "Georges Bank",
      returnLabel: "New Bedford Harbor",
    },

    milestones: [
      {
        step: "01",
        time: "SEP 02 · 04:42",
        title: "Lines off in New Bedford",
        detail:
          "F/V Viking Power clears the harbor before sunrise and heads for the North Atlantic.",
      },
      {
        step: "02",
        time: "SEP 03 · OFFSHORE",
        title: "The first tow",
        detail:
          "The crew works the scallop grounds, hauling and sorting the catch as the trip settles into its offshore rhythm.",
      },
      {
        step: "03",
        time: "SEP 03–06",
        title: "Scallops on ice",
        detail:
          "The catch is kept cold aboard the vessel while the Viking Power continues working offshore.",
      },
      {
        step: "04",
        time: "SEP 07 · 18:18",
        title: "Home through the hurricane barrier",
        detail:
          "The Viking Power returns to New Bedford and the catch comes ashore at Fleet Fisheries.",
      },
      {
        step: "05",
        time: "NEW BEDFORD",
        title: "Inspected and lot-tracked",
        detail:
          "Fleet's shore team receives the catch, inspects it, and maintains the lot identity through refrigerated handling.",
      },
      {
        step: "06",
        time: "YOUR BOX",
        title: "From their hands to yours",
        detail:
          "This box carries the voyage forward — Atlantic scallops connected back to the vessel that brought them home.",
      },
    ],

    media: [
      {
        src: "/hero.mp4",
        eyebrow: "Dawn / New Bedford Harbor",
        title: "Leaving the city behind",
        caption:
          "The harbor gives way to open water as the working day begins before sunrise.",
      },
      {
        src: "/about.mp4",
        eyebrow: "Offshore / North Atlantic",
        title: "Life on the water",
        caption:
          "Steel deck, changing seas, heavy gear, and the repetition of a commercial scallop trip.",
      },
      {
        src: "/shop.mp4",
        eyebrow: "The catch / Aboard",
        title: "What the trip is for",
        caption:
          "Atlantic sea scallops — brought aboard, handled by the crew, and kept cold for the ride home.",
      },
      {
        src: "/contact.mp4",
        eyebrow: "Return / New Bedford",
        title: "Back to the working waterfront",
        caption:
          "The voyage ends where Fleet Fisheries' shore-side handling begins.",
      },
    ],
  },
};

function normalizeTripId(value: string): string {
  return decodeURIComponent(value).trim().toLowerCase();
}

export function getCatchTrip(tripId: string): CatchTrip | null {
  const normalized = normalizeTripId(tripId);

  const directMatch = catchTrips[normalized];

  if (directMatch) {
    return directMatch;
  }

  return (
    Object.values(catchTrips).find(
      (trip) =>
        normalizeTripId(trip.publicTripCode) === normalized
    ) || null
  );
}

export function getCatchTripIds(): string[] {
  return Object.keys(catchTrips);
}
