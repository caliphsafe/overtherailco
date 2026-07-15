import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://overtherailco.com"
  ),

  title: {
    default: "Over The Rail Co. | Built by Fishermen. Worn with Pride.",
    template: "%s | Over The Rail Co.",
  },

  description:
    "Commercial fishing apparel and gear born from New Bedford's working waterfront. Built by fishermen. Worn with pride.",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Over The Rail Co.",
    description: "We don't just sell apparel. We represent a way of life.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
