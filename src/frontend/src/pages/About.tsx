import { Award, Lightbulb, Shield, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const galleryImages = [
  {
    src: "/assets/uploads/whatsapp_image_2026-01-23_at_9.27.39_am-019d2e16-969d-76b0-b6ac-63afb40b4d2a-1.jpeg",
    caption: "2nd Runner-Up Award – Advancing Micro-Enterprises",
  },
  {
    src: "/assets/uploads/image_18-019d2e16-96c0-70f6-9a06-27d4b5eaef17-2.png",
    caption: "Stall Inauguration by Dignitaries",
  },
  {
    src: "/assets/uploads/whatsapp_image_2026-01-23_at_9.27.40_am-019d2e16-986f-7528-909c-2f54c0d8241c-4.jpeg",
    caption: "Swadeshi Utsav – Delhi",
  },
  {
    src: "/assets/uploads/34e4cee2-ef4b-4af8-8ea0-3d822e93415a-019d2e16-98b0-7719-9292-ce3710623dc5-5.jpg",
    caption: "Ministry of Food Processing Industries",
  },
  {
    src: "/assets/uploads/whatsapp_image_2026-01-23_at_9.23.24_am-019d2e16-9922-73da-93d5-cc0a19b2b8b9-6.jpeg",
    caption: "Meeting International Visitors",
  },
  {
    src: "/assets/uploads/image_19-019d2e16-9a11-735a-8d01-b8fb8e7e93a1-7.png",
    caption: "Certificate of Recognition",
  },
  {
    src: "/assets/uploads/image-019d2e2b-5349-744e-9162-270a0f30f183-1.png",
    caption: "Meeting Notable Personalities at Stall",
  },
  {
    src: "/assets/uploads/image-019d2e2b-5450-74fc-8745-ca522752b5d2-3.png",
    caption: "Gifting Our 3D Painting Artwork",
  },
  {
    src: "/assets/uploads/image-019d2e2b-54be-74e1-8b16-fb9a24fb8936-4.png",
    caption: "Recognition by Art, Culture & Language Minister",
  },
  {
    src: "/assets/uploads/image-019d2e2b-5508-724f-9d69-5500555b9b29-5.png",
    caption: "With Supporters at Our Exhibition Stall",
  },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    desc: "Delivering products that meet the highest standards of craftsmanship and excellence.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    desc: "Building strong, lasting relationships with our customers through trust and care.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Continuously evolving with new ideas and solutions to meet modern demands.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Maintaining honesty and transparency in all our dealings and partnerships.",
  },
];

export default function About() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main className="min-h-screen" style={{ background: "oklch(0.08 0 0)" }}>
      {/* Hero Banner */}
      <section
        className="relative py-24 text-center overflow-hidden"
        style={{ background: "oklch(0.10 0 0)" }}
        data-ocid="about.section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.75 0.15 80) 0, oklch(0.75 0.15 80) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] mb-4 font-medium"
            style={{ color: "oklch(0.80 0.17 82)" }}
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            About Us –{" "}
            <span style={{ color: "oklch(0.80 0.17 82)" }}>Kashike Brand</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto h-0.5 w-32"
            style={{ background: "oklch(0.80 0.17 82)" }}
          />
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20" style={{ background: "oklch(0.10 0 0)" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-3xl font-bold mb-8 font-display"
              style={{ color: "oklch(0.97 0 0)" }}
            >
              Who We Are
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.80 0 0)" }}
            >
              Kashike Brand is a dynamic and forward-thinking company committed
              to delivering quality, innovation, and trust in every product and
              service it offers. Built on the foundation of passion and
              excellence, Kashike Brand aims to create a strong identity in the
              market by blending creativity with customer satisfaction.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "oklch(0.80 0 0)" }}
            >
              Founded by{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.80 0.17 82)" }}
              >
                Anjana Singh
              </span>
              , Kashike Brand reflects a vision of growth, integrity, and
              long-term value. As both the Founder and President, Anjana Singh
              has played a key role in shaping the brand's direction, ensuring
              that every step aligns with high standards and modern trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "oklch(0.12 0 0)" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold font-display mb-2"
              style={{ color: "oklch(0.97 0 0)" }}
            >
              At Kashike Brand,{" "}
              <span style={{ color: "oklch(0.80 0.17 82)" }}>
                we believe in:
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl p-6 flex flex-col gap-4"
                style={{
                  background: "oklch(0.10 0 0)",
                  border: "1px solid oklch(0.30 0.05 80)",
                }}
                data-ocid={`about.card.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.18 0.05 80)" }}
                >
                  <v.icon size={18} style={{ color: "oklch(0.80 0.17 82)" }} />
                </div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: "oklch(0.97 0 0)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.70 0 0)" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20" style={{ background: "oklch(0.10 0 0)" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-shrink-0"
            >
              <div
                className="w-72 h-80 rounded-2xl overflow-hidden"
                style={{
                  border: "2px solid oklch(0.30 0.05 80)",
                  boxShadow: "0 0 40px oklch(0.80 0.17 82 / 0.15)",
                }}
              >
                <img
                  src="/assets/uploads/image-019d387d-e779-74ac-aa94-26c5e29812d0-1.png"
                  alt="Anjana Singh – Founder & President"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex-1"
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
                style={{ color: "oklch(0.80 0.17 82)" }}
              >
                Meet Our Founder
              </p>
              <h2
                className="text-4xl font-bold font-display mb-2"
                style={{ color: "oklch(0.97 0 0)" }}
              >
                Anjana Singh
              </h2>
              <p
                className="text-lg italic mb-6 font-display"
                style={{ color: "oklch(0.80 0.17 82)" }}
              >
                Founder &amp; President, Kashike Brand
              </p>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "oklch(0.78 0 0)" }}
              >
                Anjana Singh is the visionary force behind Kashike Brand. With
                an unwavering commitment to quality and a passion for authentic
                craftsmanship, she has led the brand from its inception to
                national recognition — earning prestigious awards and showcasing
                at major government and international platforms.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.78 0 0)" }}
              >
                Her leadership ensures that every product reflects the soul of
                Kashi — timeless, purposeful, and crafted with integrity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section
        className="py-24 text-center"
        style={{ background: "oklch(0.13 0 0)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-6xl font-display leading-none mb-4 select-none"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              &ldquo;
            </div>
            <p
              className="text-xl md:text-2xl leading-relaxed mb-6"
              style={{ color: "oklch(0.88 0 0)" }}
            >
              Our mission is to grow as a trusted name while making a positive
              impact through our work. With dedication and a clear vision,
              Kashike Brand continues to move forward, aiming to achieve
              excellence and recognition in its field.
            </p>
            <div
              className="text-6xl font-display leading-none mb-8 select-none"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              &rdquo;
            </div>
            <p
              className="text-lg italic font-display font-semibold"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              Kashike Brand – Driven by Vision, Defined by Quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20" style={{ background: "oklch(0.08 0 0)" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              Our Journey
            </p>
            <h2
              className="text-4xl font-bold font-display"
              style={{ color: "oklch(0.97 0 0)" }}
            >
              Stalls, Awards &amp;{" "}
              <span style={{ color: "oklch(0.80 0.17 82)" }}>
                Memorable Moments
              </span>
            </h2>
          </motion.div>

          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            data-ocid="about.list"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                style={{ border: "1px solid oklch(0.20 0 0)" }}
                onClick={() => setLightbox(i)}
                data-ocid={`about.item.${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.05 0 0 / 0.9) 0%, transparent 60%)",
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.80 0.17 82)" }}
                  >
                    {img.caption}
                  </p>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: "inset 0 0 0 2px oklch(0.80 0.17 82 / 0.5)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "oklch(0.02 0 0 / 0.95)" }}
            onClick={() => setLightbox(null)}
            data-ocid="about.modal"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors"
                onClick={() => setLightbox(null)}
                data-ocid="about.close_button"
              >
                <X size={28} />
              </button>
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].caption}
                className="w-full rounded-xl object-contain max-h-[80vh]"
                style={{ border: "1px solid oklch(0.30 0.05 80)" }}
              />
              <p
                className="text-center mt-3 text-sm"
                style={{ color: "oklch(0.80 0.17 82)" }}
              >
                {galleryImages[lightbox].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
