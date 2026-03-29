import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const GOLD = "oklch(0.80 0.17 82)";

export default function Signup() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
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
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.mobile || !form.city) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    setIsPending(true);
    try {
      await actor.submitSignup(
        form.fullName,
        form.email,
        form.mobile,
        form.city,
      );
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
        <div className="text-center max-w-md" data-ocid="signup.success_panel">
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
            Welcome to the Kashike family, {form.fullName}.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Your registration is confirmed. We'll keep you updated with new
            arrivals and exclusive offers.
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
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
            style={{
              border: `2px solid ${GOLD}`,
              background: "oklch(0.14 0.04 70)",
            }}
          >
            <UserPlus size={28} style={{ color: GOLD }} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: GOLD,
              letterSpacing: "0.05em",
              fontStyle: "italic",
            }}
          >
            Join Kashike
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Become part of our community and stay updated with new arrivals,
            exclusive offers, and the spirit of Kashi.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 flex items-start justify-center px-4 py-12">
        <div
          className="w-full max-w-md rounded-2xl p-8 border border-border"
          style={{ background: "oklch(0.09 0.02 60)" }}
          data-ocid="signup.panel"
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: GOLD }}>
            Create your profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="signup-name"
                className="text-muted-foreground text-sm"
              >
                Full Name *
              </Label>
              <Input
                id="signup-name"
                value={form.fullName}
                onChange={update("fullName")}
                placeholder="Anjana Singh"
                className="mt-1.5 bg-background border-border focus:border-[oklch(0.72_0.14_80)]"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label
                htmlFor="signup-email"
                className="text-muted-foreground text-sm"
              >
                Email Address *
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className="mt-1.5 bg-background border-border focus:border-[oklch(0.72_0.14_80)]"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label
                htmlFor="signup-mobile"
                className="text-muted-foreground text-sm"
              >
                Mobile Number *
              </Label>
              <Input
                id="signup-mobile"
                type="tel"
                value={form.mobile}
                onChange={update("mobile")}
                placeholder="+91 9999999999"
                className="mt-1.5 bg-background border-border focus:border-[oklch(0.72_0.14_80)]"
                data-ocid="signup.input"
              />
            </div>
            <div>
              <Label
                htmlFor="signup-city"
                className="text-muted-foreground text-sm"
              >
                City / State *
              </Label>
              <Input
                id="signup-city"
                value={form.city}
                onChange={update("city")}
                placeholder="Varanasi, UP"
                className="mt-1.5 bg-background border-border focus:border-[oklch(0.72_0.14_80)]"
                data-ocid="signup.input"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-full font-semibold mt-2"
              style={{ background: GOLD, color: "oklch(0.10 0.02 60)" }}
              data-ocid="signup.submit_button"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              {isPending ? "Submitting..." : "Register Now"}
            </Button>
          </form>
          <p className="mt-5 text-xs text-muted-foreground text-center">
            Your details are stored securely on the Internet Computer
            blockchain.
          </p>
        </div>
      </section>
    </main>
  );
}
