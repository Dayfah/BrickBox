'use client';

export default function Subscribe() {
  const go = async () => {
    const r = await fetch('/api/checkout', { method: 'POST' });
    const { url } = await r.json();
    window.location.href = url;
  };
  return <button onClick={go}>Subscribe to BrickBox+</button>;
}
