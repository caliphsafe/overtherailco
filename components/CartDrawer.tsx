"use client";

import Link from "next/link";
import { formatMoney } from "@/lib/shopify";
import { useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const { cart, isOpen, isLoading, error, closeCart, updateLine, removeLine } = useCart();

  return (
    <>
      <button
        className={`cart-backdrop ${isOpen ? "is-open" : ""}`}
        aria-label="Close cart"
        onClick={closeCart}
        type="button"
      />
      <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-drawer-head">
          <div>
            <p className="eyebrow">Your gear</p>
            <h2>Cart <span>({cart?.totalQuantity || 0})</span></h2>
          </div>
          <button type="button" onClick={closeCart} aria-label="Close cart">×</button>
        </div>

        <div className="cart-drawer-body">
          {!cart?.lines?.length ? (
            <div className="empty-cart">
              <span className="empty-cart-mark">OTR</span>
              <h3>Nothing over the rail yet.</h3>
              <p>Add gear made to represent the people who work the water.</p>
              <Link href="/shop" className="button button-dark" onClick={closeCart}>Shop all products</Link>
            </div>
          ) : (
            <div className="cart-lines">
              {cart.lines.map((line) => {
                const image = line.merchandise.image || line.merchandise.product.featuredImage;
                const options = line.merchandise.selectedOptions
                  .filter((option) => option.value !== "Default Title")
                  .map((option) => option.value)
                  .join(" / ");

                return (
                  <article className="cart-line" key={line.id}>
                    <Link href={`/products/${line.merchandise.product.handle}`} className="cart-line-media" onClick={closeCart}>
                      {image ? <img src={image.url} alt={image.altText || line.merchandise.product.title} /> : <span>OTR</span>}
                    </Link>
                    <div className="cart-line-copy">
                      <div className="cart-line-top">
                        <div>
                          <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeCart}>
                            {line.merchandise.product.title}
                          </Link>
                          {options && <p>{options}</p>}
                        </div>
                        <strong>{formatMoney(line.cost.totalAmount)}</strong>
                      </div>
                      <div className="cart-line-actions">
                        <div className="quantity-control">
                          <button type="button" onClick={() => updateLine(line.id, line.quantity - 1)} disabled={isLoading}>−</button>
                          <span>{line.quantity}</span>
                          <button type="button" onClick={() => updateLine(line.id, line.quantity + 1)} disabled={isLoading}>+</button>
                        </div>
                        <button className="text-button" type="button" onClick={() => removeLine(line.id)} disabled={isLoading}>Remove</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {cart?.lines?.length ? (
          <div className="cart-drawer-foot">
            {error && <p className="form-error">{error}</p>}
            <div className="cart-total-row">
              <span>Subtotal</span>
              <strong>{formatMoney(cart.cost.subtotalAmount)}</strong>
            </div>
            <p>Taxes and shipping calculated at Shopify checkout.</p>
            <a className="button button-orange checkout-button" href={cart.checkoutUrl}>
              {isLoading ? "Updating..." : "Continue to checkout"}
            </a>
          </div>
        ) : null}
      </aside>
    </>
  );
}
