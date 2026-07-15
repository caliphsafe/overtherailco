import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div>
        <p className="eyebrow">404 / Off course</p>
        <h1>Nothing on this heading.</h1>
        <p>The page you're looking for isn't here. Head back to the shop and find your way to the gear.</p>
        <Link className="button button-orange" href="/shop">Go to shop</Link>
      </div>
    </section>
  );
}
