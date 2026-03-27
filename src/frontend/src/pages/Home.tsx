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
