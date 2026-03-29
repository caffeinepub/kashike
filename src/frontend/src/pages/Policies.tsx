export default function Policies() {
  return (
    <main className="min-h-screen bg-[oklch(0.06_0_0)] text-[oklch(0.85_0_0)]">
      {/* Hero */}
      <div className="bg-[oklch(0.10_0_0)] border-b border-[oklch(0.18_0_0)] py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[oklch(0.90_0.17_82)]">
          Policies &amp; Support
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.50_0_0)]">
          Everything you need to know before and after your purchase.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
        {/* Customer Support */}
        <section id="support">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            Customer Support
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-3 text-sm leading-relaxed text-[oklch(0.65_0_0)]">
            <p>We're here to assist you with any queries or concerns.</p>
            <p>
              📧 <span className="text-[oklch(0.80_0_0)]">Email:</span>{" "}
              rinku0397@gmail.com
            </p>
            <p>
              📞 <span className="text-[oklch(0.80_0_0)]">Contact:</span> +91
              9891357782
            </p>
            <p>
              🕒 <span className="text-[oklch(0.80_0_0)]">Support Hours:</span>{" "}
              Monday – Saturday, 10:00 AM – 6:00 PM
            </p>
            <p className="pt-2 text-[oklch(0.50_0_0)]">
              We aim to respond within 24–48 hours.
            </p>
          </div>
        </section>

        {/* Shipping Policy */}
        <section id="shipping">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            Shipping Policy
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-3 text-sm leading-relaxed text-[oklch(0.65_0_0)]">
            <p>
              At Kashike, we ensure a smooth and reliable delivery experience.
            </p>
            <p>
              🚚 <span className="text-[oklch(0.80_0_0)]">Delivery Time:</span>{" "}
              Orders are delivered within 7–14 business days across India.
            </p>
            <p>
              📦{" "}
              <span className="text-[oklch(0.80_0_0)]">Processing Time:</span>{" "}
              Orders are processed within 2–3 business days after confirmation.
            </p>
            <p>
              💳 <span className="text-[oklch(0.80_0_0)]">Payment Mode:</span>{" "}
              We accept prepaid orders only (No Cash on Delivery available).
            </p>
            <p>
              💰{" "}
              <span className="text-[oklch(0.80_0_0)]">Shipping Charges:</span>{" "}
              Shipping charges are calculated at checkout based on your
              location.
            </p>
            <p className="pt-2 text-[oklch(0.50_0_0)]">
              Once your order is shipped, you will receive a tracking link via
              email/SMS.
            </p>
          </div>
        </section>

        {/* Return & Refund */}
        <section id="returns">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            Return &amp; Refund Policy
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-4 text-sm leading-relaxed text-[oklch(0.65_0_0)]">
            <p className="text-[oklch(0.50_0_0)]">
              Please read carefully before placing your order.
            </p>
            <p>
              ❌{" "}
              <span className="text-[oklch(0.80_0_0)]">
                No Returns or Exchanges:
              </span>{" "}
              All sales are final.
            </p>
            <p>
              ⚠️ Please check product details carefully before placing your
              order.
            </p>
            <div className="pt-2">
              <p className="text-[oklch(0.80_0_0)] font-semibold mb-1">
                Exceptions
              </p>
              <ul className="list-disc list-inside space-y-1 text-[oklch(0.60_0_0)]">
                <li>
                  If you receive a damaged or incorrect product, contact us
                  within 48 hours of delivery with clear photos.
                </li>
                <li>
                  After verification, we may offer a replacement or store
                  credit.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Track Your Order */}
        <section id="tracking">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            Track Your Order
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-3 text-sm leading-relaxed text-[oklch(0.65_0_0)]">
            <p>Use the tracking link sent to your email/SMS after dispatch.</p>
            <p>Or contact us with your Order ID for assistance.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            FAQ
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-5 text-sm leading-relaxed">
            {[
              {
                q: "How long does delivery take?",
                a: "Delivery takes 7–14 business days.",
              },
              {
                q: "Do you offer Cash on Delivery?",
                a: "No, we accept prepaid orders only.",
              },
              {
                q: "Can I return my order?",
                a: "No, we have a no return and no exchange policy.",
              },
              {
                q: "What if I receive a damaged product?",
                a: "Contact us within 48 hours with proof for resolution.",
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="text-[oklch(0.80_0_0)] font-semibold mb-1">
                  {item.q}
                </p>
                <p className="text-[oklch(0.60_0_0)]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy">
          <h2 className="text-xl font-bold text-[oklch(0.80_0.17_82)] uppercase tracking-widest mb-4">
            Privacy Policy
          </h2>
          <div className="bg-[oklch(0.10_0_0)] border border-[oklch(0.18_0_0)] rounded-xl p-6 space-y-3 text-sm leading-relaxed text-[oklch(0.65_0_0)]">
            <p>
              🔒 We collect only necessary information to process your order.
            </p>
            <p>💳 Payments are handled securely via trusted gateways.</p>
            <p>🚫 We do not sell or share your personal information.</p>
            <p>📩 You may receive order updates and promotional messages.</p>
            <p className="pt-2 text-[oklch(0.50_0_0)]">
              By using our website, you agree to our privacy policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
