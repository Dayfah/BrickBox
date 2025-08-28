export default function SuccessPage(){
  return (
    <section className="max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold">You’re in! 🎉</h1>
      <p>Thanks for subscribing to BrickBox. Check your email for the receipt and details.</p>
      <a href="/account" className="inline-block bg-bbxCream text-bbxDark px-4 py-2 rounded">
        Manage Billing
      </a>
    </section>
  );
}
