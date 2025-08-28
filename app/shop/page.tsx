"use client";

export default function ShopPage() {
  return (
    <section style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Shop</h1>
      <p style={{ marginBottom: '24px' }}>
        Browse and purchase BrickBox merchandise without leaving the site.
      </p>
      <div style={{ height: '600px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <iframe
          src="https://brickbox.printify.me/"
          title="BrickBox Printify Store"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </section>
  );
}

