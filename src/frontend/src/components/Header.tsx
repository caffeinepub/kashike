import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "3D Paintings", to: "/shop?category=3D+Paintings" },
  { label: "Traditional Pencils", to: "/shop?category=Traditional+Pencils" },
  { label: "Keychains", to: "/shop?category=Keychains" },
  { label: "Jute Folders", to: "/shop?category=Jute+Folders" },
  { label: "Jute Bags", to: "/shop?category=Jute+Bags" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Sign Up", to: "/signup" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to.split("?")[0]);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-[0_2px_20px_oklch(0_0_0/0.4)]">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        {/* Left: Brand mark (logo + name + tagline) */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/image-019d2dfc-0fba-7712-85a9-19975fdb8250-1.png"
            alt="Kashike Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col items-start leading-tight">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "oklch(0.80 0.17 82)",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              Kashike
            </span>
            <span
              className="tagline-kashi"
              style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}
            >
              Authenticity of Kashi
            </span>
          </div>
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to.split("?")[0]}
                  className={`px-2.5 py-1.5 text-xs font-medium inline-block transition-colors whitespace-nowrap ${
                    link.label === "Sign Up"
                      ? "text-[oklch(0.10_0.02_60)] bg-[oklch(0.80_0.17_82)] rounded-full px-3 hover:bg-[oklch(0.72_0.15_80)]"
                      : isActive(link.to)
                        ? "text-[oklch(0.80_0.17_82)] border-b-2 border-[oklch(0.75_0.15_80)]"
                        : "text-muted-foreground hover:text-[oklch(0.80_0.17_82)]"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Action icons */}
        <div className="flex items-center gap-1 shrink-0 ml-auto md:ml-0">
          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-[oklch(0.80_0.17_82)] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link
            to="/signup"
            className="p-2 text-muted-foreground hover:text-[oklch(0.80_0.17_82)] transition-colors"
            aria-label="Account"
            data-ocid="nav.link"
          >
            <User size={18} />
          </Link>
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to.split("?")[0]}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-[oklch(0.80_0.17_82)] hover:bg-secondary transition-colors"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
