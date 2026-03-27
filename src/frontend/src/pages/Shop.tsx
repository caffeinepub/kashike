import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAllProducts } from "../hooks/useQueries";

const CATEGORIES = [
  "3D Paintings",
  "Traditional Pencils",
  "Keychains",
  "Jute Folders",
  "Jute Bags",
];
const MAX_PRICE_PAISE = 500000;
const SKELETONS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Shop() {
  const { data: products = [], isLoading } = useAllProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE_PAISE]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        !selectedCategory || p.category === selectedCategory;
      const priceMatch =
        Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [products, selectedCategory, priceRange]);

  const formatRupees = (paise: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(paise / 100);

  return (
    <main className="min-h-screen">
      <div className="bg-[oklch(0.13_0_0)] py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-[oklch(0.80_0.17_82)] text-sm uppercase tracking-widest mb-1">
            Kashike
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground">
            All Products
          </h1>
          <p className="text-muted-foreground mt-2">
            Handcrafted by master artisans of Varanasi
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <p className="text-sm text-muted-foreground">
            {filtered.length} products
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border text-muted-foreground hover:border-[oklch(0.75_0.15_80)] hover:text-[oklch(0.80_0.17_82)]"
            onClick={() => setFilterOpen(!filterOpen)}
            data-ocid="shop.toggle"
          >
            <SlidersHorizontal size={15} /> Filters
          </Button>
        </div>

        <div className="flex gap-8">
          <aside
            className={`w-56 flex-shrink-0 ${
              filterOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center justify-between">
                  Categories
                  {selectedCategory && (
                    <button
                      type="button"
                      className="text-xs text-[oklch(0.80_0.17_82)] flex items-center gap-1"
                      onClick={() => setSelectedCategory(null)}
                    >
                      <X size={10} /> Clear
                    </button>
                  )}
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      type="button"
                      className={`text-sm w-full text-left px-2 py-1.5 rounded transition-colors ${
                        !selectedCategory
                          ? "bg-[oklch(0.75_0.15_80)] text-[oklch(0.08_0_0)] font-medium"
                          : "hover:bg-secondary text-muted-foreground"
                      }`}
                      onClick={() => setSelectedCategory(null)}
                      data-ocid="shop.tab"
                    >
                      All Products
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        className={`text-sm w-full text-left px-2 py-1.5 rounded transition-colors ${
                          selectedCategory === cat
                            ? "bg-[oklch(0.75_0.15_80)] text-[oklch(0.08_0_0)] font-medium"
                            : "hover:bg-secondary text-muted-foreground"
                        }`}
                        onClick={() => setSelectedCategory(cat)}
                        data-ocid="shop.tab"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display font-semibold text-foreground mb-3">
                  Price Range
                </h3>
                <Slider
                  min={0}
                  max={MAX_PRICE_PAISE}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3"
                  data-ocid="shop.toggle"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatRupees(priceRange[0])}</span>
                  <span>{formatRupees(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {selectedCategory && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">
                  Filtering by:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center gap-1"
                >
                  <Badge className="bg-[oklch(0.75_0.15_80)] text-[oklch(0.08_0_0)] gap-1 cursor-pointer">
                    {selectedCategory} <X size={10} />
                  </Badge>
                </button>
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-4 hidden md:block">
              {filtered.length} products found
            </p>

            {isLoading ? (
              <div
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                data-ocid="shop.loading_state"
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
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20" data-ocid="shop.empty_state">
                <p className="text-xl font-display font-semibold text-foreground mb-2">
                  No products found
                </p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <Button
                  variant="outline"
                  className="border-border hover:border-[oklch(0.75_0.15_80)] hover:text-[oklch(0.80_0.17_82)]"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, MAX_PRICE_PAISE]);
                  }}
                  data-ocid="shop.secondary_button"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={String(product.id)}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <ProductCard product={product} index={i + 1} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
