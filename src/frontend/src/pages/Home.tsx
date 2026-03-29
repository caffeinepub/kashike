import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { useAllProducts } from "../hooks/useQueries";

const SKELETONS = ["a", "b", "c", "d", "e", "f", "g", "h"];

const categories = [
  {
    name: "3D Paintings",
    image: "/assets/generated/category-3d-paintings.dim_400x400.jpg",
    description: "Raised relief masterpieces",
  },
  {
    name: "Traditional Pencils",
    image: "/assets/generated/category-pencils.dim_400x400.jpg",
    description: "Hand-painted heritage pencils",
  },
  {
    name: "Keychains",
    image: "/assets/generated/category-keychains.dim_400x400.jpg",
    description: "Brass & thread artistry",
  },
  {
    name: "Jute Folders",
    image: "/assets/generated/category-jute-folders.dim_400x400.jpg",
    description: "Eco-elegant stationery",
  },
  {
    name: "Jute Bags",
    image: "/assets/generated/category-jute-bags.dim_400x400.jpg",
    description: "Embroidered natural bags",
  },
];

const artPieces = [
  {
    src: "/assets/uploads/image-019d2e2b-568c-778e-b0c1-e5526cf227d9-6.png",
    alt: "Shiva and Bull – Spiritual Varanasi Art",
  },
  {
    src: "/assets/uploads/image-019d2e2b-5679-75c4-89dc-bd362c9adb52-7.png",
    alt: "Keychains and Painting Art Pieces",
  },
  {
    src: "/assets/uploads/image-019d2e33-fe0c-7277-b7e5-5ccff23d3b59-1.png",
    alt: "Circular paintings – Kashi art",
  },
  {
    src: "/assets/uploads/image-019d2e33-fef6-7394-a6ea-81a4f2a598c2-2.png",
    alt: "Radha Krishna – Traditional painting",
  },
  {
    src: "/assets/uploads/image-019d2e34-0109-7603-a93d-5d434cb73967-3.png",
    alt: "Buddha and birds – Spiritual artwork",
  },
];

const collageItems = [
  // Shiva/Bull – tall left anchor
  {
    ...artPieces[0],
    style: {
      gridColumn: "1 / 5",
      gridRow: "1 / 3",
    },
  },
  // Keychains – wide middle-top
  {
    ...artPieces[1],
    style: {
      gridColumn: "5 / 9",
      gridRow: "1 / 2",
    },
  },
  // Circular paintings – wide right-top
  {
    ...artPieces[2],
    style: {
      gridColumn: "9 / 13",
      gridRow: "1 / 2",
    },
  },
  // Radha Krishna – middle-bottom
  {
    ...artPieces[3],
    style: {
      gridColumn: "5 / 9",
      gridRow: "2 / 3",
    },
  },
  // Buddha – right-bottom
  {
    ...artPieces[4],
    style: {
      gridColumn: "9 / 13",
      gridRow: "2 / 3",
    },
  },
];

export default function Home() {
  const { data: products, isLoading } = useAllProducts();
  const featured = products?.slice(0, 8) ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img
          src="/assets/generated/hero-kashike.dim_1600x700.jpg"
          alt="Kashike artisan workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.06_0_0/90%)] via-[oklch(0.06_0_0/60%)] to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl ml-auto text-right">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-[oklch(0.80_0.17_82)] text-sm font-medium uppercase tracking-widest mb-3 flex items-center justify-end gap-2">
                  <Sparkles size={14} /> From the Ghats of Varanasi
                </p>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Timeless Crafts
                  <br />
                  <span className="text-[oklch(0.82_0.15_82)]">From Kashi</span>
                </h1>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Discover hand-crafted treasures by master artisans rooted in
                  centuries of Varanasi tradition.
                </p>
                <div className="flex gap-4 justify-end">
                  <Link to="/shop">
                    <Button
                      className="bg-[oklch(0.75_0.15_80)] hover:bg-[oklch(0.80_0.17_82)] text-[oklch(0.08_0_0)] rounded-full px-8 h-12 text-base font-semibold gap-2"
                      data-ocid="hero.primary_button"
                    >
                      Shop the Collection <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-[oklch(0.80_0.17_82)] text-sm uppercase tracking-widest font-medium mb-2">
              Explore
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Browse Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to="/shop"
                  className="block group"
                  data-ocid={`category.item.${i + 1}`}
                >
                  <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-[oklch(0.75_0.15_80)] hover:shadow-[0_0_20px_oklch(0.75_0.15_80/0.2)] transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-display font-semibold text-sm text-foreground leading-tight">
                        {cat.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A Glimpse of Our Art */}
      <section className="py-20" style={{ background: "oklch(0.10 0 0)" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              Artisan Craftsmanship
            </p>
            <h2
              className="font-display text-4xl font-bold mb-3"
              style={{ color: "oklch(0.80 0.17 82)" }}
            >
              A Glimpse of Our Art
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Hand-crafted spiritual artwork inspired by the soul of Kashi
            </p>
          </motion.div>

          {/* Collage — desktop grid */}
          <div
            className="hidden md:grid gap-[3px]"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "260px 260px",
            }}
          >
            {collageItems.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-xl group relative"
                style={{
                  ...item.style,
                  border: "1px solid oklch(0.25 0.04 80)",
                  transition: "box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px oklch(0.80 0.17 82 / 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.06 0 0 / 0.55) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Collage — mobile stack */}
          <div className="flex flex-col gap-3 md:hidden">
            {artPieces.map((piece, i) => (
              <motion.div
                key={piece.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-xl group relative aspect-[4/3]"
                style={{ border: "1px solid oklch(0.25 0.04 80)" }}
              >
                <img
                  src={piece.src}
                  alt={piece.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.06 0 0 / 0.55) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[oklch(0.13_0_0)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-[oklch(0.80_0.17_82)] text-sm uppercase tracking-widest font-medium mb-2">
                Handpicked
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                New Arrivals
              </h2>
            </div>
            <Link to="/shop">
              <Button
                variant="outline"
                className="rounded-full border-[oklch(0.75_0.15_80)] text-[oklch(0.80_0.17_82)] hover:bg-[oklch(0.75_0.15_80)] hover:text-[oklch(0.08_0_0)] gap-2"
                data-ocid="featured.primary_button"
              >
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
              data-ocid="products.loading_state"
            >
              {SKELETONS.map((key) => (
                <div
                  key={key}
                  className="bg-card rounded-lg overflow-hidden border border-border"
                >
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16" data-ocid="products.empty_state">
              <p className="text-muted-foreground">
                No products available yet.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {featured.map((product, i) => (
                <motion.div
                  key={String(product.id)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ProductCard product={product} index={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Heritage banner */}
      <section className="py-14 bg-[oklch(0.08_0_0)] text-center border-t border-[oklch(0.22_0_0)]">
        <div className="container mx-auto px-4">
          <p className="text-[oklch(0.80_0.17_82)] text-sm uppercase tracking-widest mb-3">
            Our Promise
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Authentic. Artisan-Made. Timeless.
          </h2>
          <p className="text-[oklch(0.60_0_0)] max-w-xl mx-auto mb-8">
            Every piece from Kashike is hand-crafted by master artisans from
            Varanasi, preserving centuries-old techniques for generations to
            come.
          </p>
          <Link to="/shop">
            <Button
              variant="outline"
              className="rounded-full border-[oklch(0.75_0.15_80)] text-[oklch(0.80_0.17_82)] hover:bg-[oklch(0.75_0.15_80)] hover:text-[oklch(0.08_0_0)] px-8 h-12"
              data-ocid="banner.primary_button"
            >
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
