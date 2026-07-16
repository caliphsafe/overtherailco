import { NextRequest, NextResponse } from "next/server";
import {
  addCartLines,
  createCart,
  getCart,
  isShopifyConfigured,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify";

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured) {
    return NextResponse.json(
      { error: "Shopify is not connected yet. Add the Shopify environment variables in Vercel and redeploy." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { action, cartId, variantId, quantity = 1, lineId, lineIds } = body;

    let cart;

    switch (action) {
      case "get":
        if (!cartId) throw new Error("Missing cart ID.");
        cart = await getCart(cartId);
        if (!cart) throw new Error("Cart not found.");
        break;
      case "create":
        cart = await createCart(variantId, quantity);
        break;
      case "add":
        if (!cartId || !variantId) throw new Error("Missing cart ID or variant ID.");
        cart = await addCartLines(cartId, variantId, quantity);
        break;
      case "update":
        if (!cartId || !lineId) throw new Error("Missing cart ID or line ID.");
        cart = await updateCartLines(cartId, lineId, quantity);
        break;
      case "remove":
        if (!cartId || !Array.isArray(lineIds)) throw new Error("Missing cart ID or line IDs.");
        cart = await removeCartLines(cartId, lineIds);
        break;
      default:
        return NextResponse.json({ error: "Unknown cart action." }, { status: 400 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cart request failed." },
      { status: 500 }
    );
  }
}
