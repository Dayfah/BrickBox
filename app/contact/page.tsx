export default function ContactPage(){
  return (
    <section className="max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <form action="/api/contact" method="post" className="space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 rounded bg-bbxDark border border-bbxCream text-bbxCream" required />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 rounded bg-bbxDark border border-bbxCream text-bbxCream" required />
        <textarea name="message" rows={4} placeholder="Your message" className="w-full p-2 rounded bg-bbxDark border border-bbxCream text-bbxCream" required />
        <button type="submit" className="bg-bbxRed text-bbxCream px-4 py-2 rounded">Send</button>
      </form>
    </section>
  );
}
