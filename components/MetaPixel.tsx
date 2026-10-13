"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Public dataset identifier; Shopify remains responsible for Purchase events.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "4192361147704940";

type FBQ = (...args: unknown[]) => void;
declare global { interface Window { fbq?: FBQ; _fbq?: FBQ } }

export function trackMetaEvent(event: "ViewContent" | "AddToCart" | "InitiateCheckout", params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", event, params || {});
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!META_PIXEL_ID || !pathname) return;
    // Honor a browser-level opt-out. Storefront privacy/consent management must
    // additionally govern whether advertising cookies/scripts may run.
    if (navigator.globalPrivacyControl) return;
    if (!window.fbq) {
      const queue: unknown[][] = [];
      const fbq: FBQ = (...args) => { queue.push(args); };
      Object.assign(fbq, { queue, loaded: true, version: "2.0", push: fbq });
      window.fbq = fbq;
      window._fbq = fbq;
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
      fbq("init", META_PIXEL_ID);
    }
    window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
