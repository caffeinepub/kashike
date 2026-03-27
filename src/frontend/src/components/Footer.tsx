import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-[oklch(0.08_0_0)] text-[oklch(0.75_0_0)] border-t border-[oklch(0.18_0_0)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img
              src="/assets/uploads/image-019d2dfc-0fba-7712-85a9-19975fdb8250-1.png"
              alt="Kashike Logo"
              className="h-16 w-auto object-contain mb-3"
            />
            <p className="text-sm leading-relaxed text-[oklch(0.55_0_0)] mb-4">
              Born from the ancient city of Kashi (Varanasi), Kashike brings you
              authentic traditional handicrafts crafted by master artisans.
            </p>
            <div className="flex items-center gap-2 text-sm text-[oklch(0.55_0_0)]">
              <MapPin size={14} />
              <span>Varanasi, Uttar Pradesh, India</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[oklch(0.80_0.17_82)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Shop All", to: "/shop" },
                { label: "3D Paintings", to: "/shop" },
                { label: "Traditional Pencils", to: "/shop" },
                { label: "Jute Bags", to: "/shop" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[oklch(0.55_0_0)] hover:text-[oklch(0.80_0.17_82)] transition-colors"
                    data-ocid="nav.link"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[oklch(0.80_0.17_82)] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-sm text-[oklch(0.55_0_0)]">
              <li>Shipping Policy</li>
              <li>Return & Refund</li>
              <li>Track Your Order</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[oklch(0.80_0.17_82)] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[oklch(0.55_0_0)]">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>+91 98913 57782</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>rinku0397@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={14} />
                <a
                  href="https://instagram.com/_kashike_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(0.80_0.17_82)] transition-colors"
                >
                  @_kashike_
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[oklch(0.18_0_0)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[oklch(0.40_0_0)]">
          <p>© {year} Kashike. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.80_0.17_82)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
