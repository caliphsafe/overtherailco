export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number | null;
  height?: number | null;
};

export type ProductOptionValue = {
  name: string;
  optionName: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: Money;
  compareAtPrice: Money | null;
  image: ShopifyImage | null;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  vendor: string;
  productType: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];

  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };

  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;

  variants: ProductVariant[];
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;

  cost: {
    totalAmount: Money;
  };

  merchandise: ProductVariant & {
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;

  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };

  lines: CartLine[];
};


/* =========================================
   SHOPIFY CONFIG
========================================= */

const domain = (
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ||
  ""
)
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

const token =
  process.env.SHOPIFY_STOREFRONT_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
  "";

const apiVersion =
  process.env.SHOPIFY_STOREFRONT_API_VERSION ||
  "2026-07";

export const isShopifyConfigured = Boolean(
  domain && token
);

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";


/* =========================================
   SHOPIFY FETCH
========================================= */

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = "no-store",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify environment variables are not configured."
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    cache,
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    const message =
      payload.errors
        ?.map(
          (error: { message: string }) =>
            error.message
        )
        .join("; ") ||
      response.statusText;

    throw new Error(
      `Shopify Storefront API error: ${message}`
    );
  }

  return payload.data as T;
}


/* =========================================
   PRODUCT FRAGMENTS
========================================= */

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    title
    handle
    description
    availableForSale
    vendor
    productType
    tags

    featuredImage {
      url
      altText
      width
      height
    }

    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }

      maxVariantPrice {
        amount
        currencyCode
      }
    }

    variants(first: 20) {
      nodes {
        id
        title
        availableForSale

        selectedOptions {
          name
          value
        }

        price {
          amount
          currencyCode
        }

        compareAtPrice {
          amount
          currencyCode
        }

        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

const PRODUCT_FULL_FRAGMENT = `
  fragment ProductFull on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    vendor
    productType
    tags

    featuredImage {
      url
      altText
      width
      height
    }

    images(first: 20) {
      nodes {
        url
        altText
        width
        height
      }
    }

    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }

      maxVariantPrice {
        amount
        currencyCode
      }
    }

    options {
      id
      name
      values
    }

    variants(first: 100) {
      nodes {
        id
        title
        availableForSale

        selectedOptions {
          name
          value
        }

        price {
          amount
          currencyCode
        }

        compareAtPrice {
          amount
          currencyCode
        }

        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;


/* =========================================
   NORMALIZERS
========================================= */

function normalizeProduct(node: any): Product {
  return {
    ...node,

    images:
      node.images?.nodes ||
      (node.featuredImage
        ? [node.featuredImage]
        : []),

    variants:
      node.variants?.nodes || [],

    options:
      node.options || [],
  };
}

function normalizeCollection(
  node: any
): Collection {
  return {
    ...node,

    products: (
      node.products?.nodes || []
    ).map(normalizeProduct),
  };
}


/* =========================================
   HOME PAGE COLLECTION IDENTIFICATION
========================================= */

/*
  This makes the website identify the Shopify
  "Home page" collection by either its visible
  title or its internal Shopify handle.

  This avoids problems if Shopify uses:
  - home-page
  - frontpage
  - another handle

  As long as the visible collection title is
  "Home page", the website will find it.
*/

function isHomePageCollection(
  collection: {
    title?: string;
    handle?: string;
  }
): boolean {
  const title = (
    collection.title || ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const handle = (
    collection.handle || ""
  )
    .trim()
    .toLowerCase();

  return (
    title === "home page" ||
    handle === "home-page" ||
    handle === "frontpage"
  );
}


/* =========================================
   HOME PAGE FEATURED PRODUCTS
========================================= */

/*
  Pulls products specifically from the Shopify
  collection called "Home page".

  These products are used by app/page.tsx for:
  - Hero product 1
  - Hero product 2
  - Featured product grid

  If the Home page collection cannot be found
  or has no products, the function falls back
  to the newest Shopify products.
*/

export async function getFeaturedProducts(
  limit = 4
): Promise<Product[]> {
  if (!isShopifyConfigured) {
    return [];
  }

  const query = `
    ${PRODUCT_CARD_FRAGMENT}

    query FeaturedProducts(
      $collectionLimit: Int!
      $productLimit: Int!
    ) {
      collections(
        first: $collectionLimit
      ) {
        nodes {
          id
          title
          handle

          products(
            first: $productLimit
          ) {
            nodes {
              ...ProductCard
            }
          }
        }
      }

      products(
        first: $productLimit
        sortKey: CREATED_AT
        reverse: true
      ) {
        nodes {
          ...ProductCard
        }
      }
    }
  `;

  try {
    const data =
      await shopifyFetch<any>({
        query,

        variables: {
          collectionLimit: 100,
          productLimit: limit,
        },
      });

    const collections =
      data.collections?.nodes || [];

    const homePageCollection =
      collections.find(
        (collection: any) =>
          isHomePageCollection(
            collection
          )
      );

    const homePageProducts =
      homePageCollection
        ?.products
        ?.nodes || [];

    /*
      Prefer products from the Home page
      collection.

      Fall back to newest products only if
      that collection cannot be found or
      contains no products.
    */

    const source =
      homePageProducts.length > 0
        ? homePageProducts
        : data.products?.nodes || [];

    return source.map(
      normalizeProduct
    );
  } catch (error) {
    console.error(
      "Unable to load homepage products:",
      error
    );

    return [];
  }
}


/* =========================================
   SHOP PAGE DATA
========================================= */

/*
  Loads:
  - All Shopify products
  - All Shopify collections

  But specifically removes the collection
  called "Home page" from the category list
  before sending collections to the Shop page.
*/

export async function getShopData(): Promise<{
  products: Product[];
  collections: Collection[];
}> {
  if (!isShopifyConfigured) {
    return {
      products: [],
      collections: [],
    };
  }

  const query = `
    ${PRODUCT_CARD_FRAGMENT}

    query ShopData {
      products(
        first: 100
        sortKey: TITLE
      ) {
        nodes {
          ...ProductCard
        }
      }

      collections(
        first: 100
        sortKey: TITLE
      ) {
        nodes {
          id
          title
          handle
          description

          image {
            url
            altText
            width
            height
          }

          products(first: 100) {
            nodes {
              ...ProductCard
            }
          }
        }
      }
    }
  `;

  try {
    const data =
      await shopifyFetch<any>({
        query,
      });

    const allProducts =
      data.products?.nodes || [];

    const allCollections =
      data.collections?.nodes || [];

    /*
      Remove the "Home page" collection
      completely from the Shop category list.
    */

    const shopCollections =
      allCollections
        .filter(
          (collection: any) =>
            !isHomePageCollection(
              collection
            )
        )
        .map(normalizeCollection);

    return {
      products:
        allProducts.map(
          normalizeProduct
        ),

      collections:
        shopCollections,
    };
  } catch (error) {
    console.error(
      "Unable to load shop data:",
      error
    );

    return {
      products: [],
      collections: [],
    };
  }
}


/* =========================================
   SINGLE PRODUCT
========================================= */

export async function getProduct(
  handle: string
): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return null;
  }

  const query = `
    ${PRODUCT_FULL_FRAGMENT}

    query ProductByHandle(
      $handle: String!
    ) {
      product(
        handle: $handle
      ) {
        ...ProductFull
      }
    }
  `;

  try {
    const data =
      await shopifyFetch<any>({
        query,

        variables: {
          handle,
        },
      });

    return data.product
      ? normalizeProduct(
          data.product
        )
      : null;
  } catch (error) {
    console.error(
      "Unable to load product:",
      error
    );

    return null;
  }
}


/* =========================================
   SINGLE COLLECTION
========================================= */

export async function getCollection(
  handle: string
): Promise<Collection | null> {
  if (!isShopifyConfigured) {
    return null;
  }

  const query = `
    ${PRODUCT_CARD_FRAGMENT}

    query CollectionByHandle(
      $handle: String!
    ) {
      collection(
        handle: $handle
      ) {
        id
        title
        handle
        description

        image {
          url
          altText
          width
          height
        }

        products(first: 100) {
          nodes {
            ...ProductCard
          }
        }
      }
    }
  `;

  try {
    const data =
      await shopifyFetch<any>({
        query,

        variables: {
          handle,
        },
      });

    return data.collection
      ? normalizeCollection(
          data.collection
        )
      : null;
  } catch (error) {
    console.error(
      "Unable to load collection:",
      error
    );

    return null;
  }
}


/* =========================================
   MONEY FORMATTING
========================================= */

export function formatMoney(
  money?: Money | null
): string {
  if (!money) {
    return "";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency:
        money.currencyCode,
    }
  ).format(
    Number(money.amount)
  );
}


/* =========================================
   CART FRAGMENT
========================================= */

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity

    cost {
      subtotalAmount {
        amount
        currencyCode
      }

      totalAmount {
        amount
        currencyCode
      }
    }

    lines(first: 100) {
      nodes {
        id
        quantity

        cost {
          totalAmount {
            amount
            currencyCode
          }
        }

        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale

            selectedOptions {
              name
              value
            }

            price {
              amount
              currencyCode
            }

            compareAtPrice {
              amount
              currencyCode
            }

            image {
              url
              altText
              width
              height
            }

            product {
              title
              handle

              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;


/* =========================================
   CART NORMALIZER
========================================= */

function normalizeCart(
  cart: any
): Cart {
  return {
    ...cart,

    lines:
      cart.lines?.nodes || [],
  };
}


/* =========================================
   GET CART
========================================= */

export async function getCart(
  cartId: string
): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}

    query GetCart(
      $cartId: ID!
    ) {
      cart(
        id: $cartId
      ) {
        ...CartFields
      }
    }
  `;

  const data =
    await shopifyFetch<any>({
      query,

      variables: {
        cartId,
      },
    });

  return data.cart
    ? normalizeCart(
        data.cart
      )
    : null;
}


/* =========================================
   CREATE CART
========================================= */

export async function createCart(
  variantId?: string,
  quantity = 1
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}

    mutation CartCreate(
      $input: CartInput!
    ) {
      cartCreate(
        input: $input
      ) {
        cart {
          ...CartFields
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const lines = variantId
    ? [
        {
          merchandiseId:
            variantId,

          quantity,
        },
      ]
    : [];

  const data =
    await shopifyFetch<any>({
      query,

      variables: {
        input: {
          lines,
        },
      },
    });

  if (
    data.cartCreate
      .userErrors
      ?.length
  ) {
    throw new Error(
      data.cartCreate
        .userErrors
        .map(
          (error: any) =>
            error.message
        )
        .join("; ")
    );
  }

  return normalizeCart(
    data.cartCreate.cart
  );
}


/* =========================================
   ADD CART LINES
========================================= */

export async function addCartLines(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}

    mutation CartLinesAdd(
      $cartId: ID!
      $lines: [CartLineInput!]!
    ) {
      cartLinesAdd(
        cartId: $cartId
        lines: $lines
      ) {
        cart {
          ...CartFields
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await shopifyFetch<any>({
      query,

      variables: {
        cartId,

        lines: [
          {
            merchandiseId:
              variantId,

            quantity,
          },
        ],
      },
    });

  if (
    data.cartLinesAdd
      .userErrors
      ?.length
  ) {
    throw new Error(
      data.cartLinesAdd
        .userErrors
        .map(
          (error: any) =>
            error.message
        )
        .join("; ")
    );
  }

  return normalizeCart(
    data.cartLinesAdd.cart
  );
}


/* =========================================
   UPDATE CART LINES
========================================= */

export async function updateCartLines(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}

    mutation CartLinesUpdate(
      $cartId: ID!
      $lines: [CartLineUpdateInput!]!
    ) {
      cartLinesUpdate(
        cartId: $cartId
        lines: $lines
      ) {
        cart {
          ...CartFields
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await shopifyFetch<any>({
      query,

      variables: {
        cartId,

        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      },
    });

  if (
    data.cartLinesUpdate
      .userErrors
      ?.length
  ) {
    throw new Error(
      data.cartLinesUpdate
        .userErrors
        .map(
          (error: any) =>
            error.message
        )
        .join("; ")
    );
  }

  return normalizeCart(
    data.cartLinesUpdate.cart
  );
}


/* =========================================
   REMOVE CART LINES
========================================= */

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}

    mutation CartLinesRemove(
      $cartId: ID!
      $lineIds: [ID!]!
    ) {
      cartLinesRemove(
        cartId: $cartId
        lineIds: $lineIds
      ) {
        cart {
          ...CartFields
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await shopifyFetch<any>({
      query,

      variables: {
        cartId,
        lineIds,
      },
    });

  if (
    data.cartLinesRemove
      .userErrors
      ?.length
  ) {
    throw new Error(
      data.cartLinesRemove
        .userErrors
        .map(
          (error: any) =>
            error.message
        )
        .join("; ")
    );
  }

  return normalizeCart(
    data.cartLinesRemove.cart
  );
}
