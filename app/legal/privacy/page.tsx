export default function PrivacyPage(){
  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="opacity-90">
        We collect minimal data to run the site (payments via Stripe, email for updates).
        We don’t sell your data. You can request deletion of personal data at any time.
      </p>
      <p className="opacity-90">
        Third-party providers (Stripe, Printify) handle payment/fulfillment and have their own policies.
      </p>
    </section>
  );
}
