export const PRODUCTS_PER_SECTION = 4;
export const CATEGORY_SHOWCASE_LIMIT = 6;

type CollectionLike = {
  title?: string;
  handle?: string;
};

type CategoryGroup = {
  key: string;
  aliases: string[];
  description: string;
};

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: "t-shirts",
    aliases: [
      "t shirt",
      "t shirts",
      "tee",
      "tees",
      "tee shirt",
      "tee shirts",
    ],
    description:
      "Everyday shirts built around the culture, pride, and work of the waterfront.",
  },
  {
    key: "long-sleeves",
    aliases: [
      "long sleeve",
      "long sleeves",
      "longsleeve",
      "longsleeves",
    ],
    description:
      "Dependable long-sleeve gear for cooler days, working conditions, and everyday wear.",
  },
  {
    key: "hoodies-sweatshirts",
    aliases: [
      "hoodie",
      "hoodies",
      "sweatshirt",
      "sweatshirts",
      "fleece",
    ],
    description:
      "Heavyweight layers designed for cold mornings, offshore weather, and life near the water.",
  },
  {
    key: "hats-headwear",
    aliases: [
      "hat",
      "hats",
      "headwear",
      "cap",
      "caps",
      "beanie",
      "beanies",
    ],
    description:
      "Working-waterfront headwear made to carry the Over The Rail identity anywhere.",
  },
  {
    key: "outerwear",
    aliases: [
      "outerwear",
      "jacket",
      "jackets",
      "coat",
      "coats",
      "vest",
      "vests",
    ],
    description:
      "Outer layers built for changing weather, hard work, and everyday protection.",
  },
  {
    key: "accessories",
    aliases: [
      "accessory",
      "accessories",
      "bags",
      "stickers",
      "decals",
      "gear",
    ],
    description:
      "Finishing pieces, everyday gear, and small ways to represent the culture.",
  },
  {
    key: "youth",
    aliases: [
      "youth",
      "kids",
      "children",
      "childrens",
    ],
    description:
      "Over The Rail gear for the next generation carrying the tradition forward.",
  },
];

const HOME_PAGE_ALIASES = [
  "home page",
  "homepage",
  "frontpage",
];

const BEST_SELLER_ALIASES = [
  "best sellers",
  "best seller",
  "bestsellers",
  "bestseller",
  "top sellers",
  "top seller",
];

const NEW_ARRIVAL_ALIASES = [
  "new arrivals",
  "new arrival",
  "new products",
  "new product",
  "latest arrivals",
];

const OTHER_UTILITY_ALIASES = [
  "featured products",
  "featured product",
  "all products",
  "all",
];

export function normalizeStorefrontValue(
  value = ""
): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getCollectionValues(
  collection: CollectionLike
): string[] {
  return [
    normalizeStorefrontValue(collection.title),
    normalizeStorefrontValue(collection.handle),
  ].filter(Boolean);
}

function matchesExactAlias(
  collection: CollectionLike,
  aliases: string[]
): boolean {
  const values = getCollectionValues(collection);
  const normalizedAliases = aliases.map(
    normalizeStorefrontValue
  );

  return values.some((value) =>
    normalizedAliases.includes(value)
  );
}

function matchesCategoryAliases(
  collection: CollectionLike,
  aliases: string[]
): boolean {
  const identity = getCollectionValues(
    collection
  ).join(" ");

  return aliases.some((alias) =>
    identity.includes(
      normalizeStorefrontValue(alias)
    )
  );
}

export function isHomePageCollection(
  collection: CollectionLike
): boolean {
  return matchesExactAlias(
    collection,
    HOME_PAGE_ALIASES
  );
}

export function isBestSellerCollection(
  collection: CollectionLike
): boolean {
  return matchesExactAlias(
    collection,
    BEST_SELLER_ALIASES
  );
}

export function isNewArrivalCollection(
  collection: CollectionLike
): boolean {
  return matchesExactAlias(
    collection,
    NEW_ARRIVAL_ALIASES
  );
}

export function isUtilityCollection(
  collection: CollectionLike
): boolean {
  return (
    isHomePageCollection(collection) ||
    isBestSellerCollection(collection) ||
    isNewArrivalCollection(collection) ||
    matchesExactAlias(
      collection,
      OTHER_UTILITY_ALIASES
    )
  );
}

export function getCollectionPriority(
  collection: CollectionLike
): number {
  const index = CATEGORY_GROUPS.findIndex(
    (group) =>
      matchesCategoryAliases(
        collection,
        group.aliases
      )
  );

  return index === -1
    ? CATEGORY_GROUPS.length + 100
    : index;
}

export function sortCollectionsForStorefront<
  T extends CollectionLike,
>(collections: T[]): T[] {
  return collections
    .map((collection, originalIndex) => ({
      collection,
      originalIndex,
      priority:
        getCollectionPriority(collection),
    }))
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      return (
        a.originalIndex -
        b.originalIndex
      );
    })
    .map(({ collection }) => collection);
}

export function getCollectionFallbackDescription(
  collection: CollectionLike
): string {
  const matchingGroup =
    CATEGORY_GROUPS.find((group) =>
      matchesCategoryAliases(
        collection,
        group.aliases
      )
    );

  return (
    matchingGroup?.description ||
    `Explore the ${collection.title || "collection"} from Over The Rail Co.`
  );
}
