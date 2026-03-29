import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const GOLD = "oklch(0.80 0.17 82)";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9891357782",
    href: "tel:+919891357782",
  },
  {
    icon: Mail,
    label: "Email",
    value: "rinku0397@gmail.com",
    href: "mailto:rinku0397@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Varanasi, Uttar Pradesh",
    href: null,
  },
];

export default function Contact() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  useEffect(() => {
    if (!submitted) return;
    if (countdown <= 0) {
      navigate({ to: "/" });
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [submitted, countdown, navigate]);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    setIsPending(true);
    try {
      await actor.submitContactMessage(
        form.name,
        form.email,
        form.mobile,
        form.message,
      );
      setSenderName(form.name);
      setSubmitted(true);
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsPending(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md" data-ocid="contact.success_panel">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto"
            style={{
              border: `2px solid ${GOLD}`,
              background: "oklch(0.14 0.04 70)",
            }}
          >
            <CheckCircle2 size={36} style={{ color: GOLD }} />
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: GOLD,
              letterSpacing: "0.05em",
              fontStyle: "italic",
            }}
          >
            Thank You!
          </h1>
          <p className="text-foreground text-lg mb-2">
            We received your message, {senderName}.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Our team will get back to you shortly. We appreciate you reaching
            out to Kashike.
          </p>
          <div
            className="rounded-full px-6 py-3 text-sm font-medium inline-block"
            style={{
              background: "oklch(0.12 0.03 65)",
              color: "oklch(0.65 0.04 75)",
            }}
          >
            Redirecting to home in{" "}
            <span style={{ color: GOLD }}>{countdown}</span> second
            {countdown !== 1 ? "s" : ""}...
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="text-sm underline underline-offset-4"
              style={{ color: GOLD }}
            >
              Go home now
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.10 0.03 60) 0%, oklch(0.06 0.01 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.28 0.09 75 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: GOLD,
              letterSpacing: "0.05em",
              fontStyle: "italic",
            }}
          >
            Contact Us
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            We'd love to hear from you. Reach out directly or drop us a message
            below.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 grid md:grid-cols-2 gap-12 items-start max-w-4xl">
        {/* Left: Contact Info */}
        <div data-ocid="contact.panel">
          <h2
            className="text-2xl font-semibold mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: GOLD,
            }}
          >
            Get in Touch
          </h2>
          <div className="space-y-6">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    border: `1.5px solid ${GOLD}`,
                    background: "oklch(0.12 0.03 65)",
                  }}
                >
                  <Icon size={18} style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-foreground hover:underline font-medium"
                      style={{ color: "oklch(0.92 0.02 80)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      className="text-foreground font-medium"
                      style={{ color: "oklch(0.92 0.02 80)" }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  border: `1.5px solid ${GOLD}`,
                  background: "oklch(0.12 0.03 65)",
                }}
              >
                <SiInstagram size={18} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/_kashike_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "oklch(0.92 0.02 80)" }}
                >
                  @_kashike_
                </a>
              </div>
            </div>
          </div>
          <div
            className="mt-10 h-px"
            style={{
              background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            }}
          />
          <p
            className="mt-6 text-sm leading-relaxed"
            style={{ color: "oklch(0.65 0.04 75)" }}
          >
            Kashike Brand is rooted in the spirit of Varanasi — a city of
            timeless craft, culture, and heritage. Every product carries a piece
            of Kashi's soul.
          </p>
        </div>

        {/* Right: Message Form */}
        <div
          className="rounded-2xl p-8 border border-border"
          style={{ background: "oklch(0.09 0.02 60)" }}
          data-ocid="contact.modal"
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: GOLD }}>
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="contact-name"
                className="text-muted-foreground text-sm"
              >
                Your Name *
              </Label>
              <Input
                id="contact-name"
                value={form.name}
                onChange={update("name")}
                placeholder="Rahul Sharma"
                className="mt-1.5 bg-background border-border"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-email"
                className="text-muted-foreground text-sm"
              >
                Email *
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className="mt-1.5 bg-background border-border"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-mobile"
                className="text-muted-foreground text-sm"
              >
                Mobile Number *
              </Label>
              <Input
                id="contact-mobile"
                type="tel"
                value={form.mobile}
                onChange={update("mobile")}
                placeholder="+91 9999999999"
                className="mt-1.5 bg-background border-border"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-message"
                className="text-muted-foreground text-sm"
              >
                Message *
              </Label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={update("message")}
                placeholder="Write your message here..."
                rows={4}
                className="mt-1.5 bg-background border-border resize-none"
                data-ocid="contact.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-full font-semibold mt-1"
              style={{ background: GOLD, color: "oklch(0.10 0.02 60)" }}
              data-ocid="contact.submit_button"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
