import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAllProducts } from "../hooks/useQueries";

const PLACEHOLDER = "/assets/generated/category-3d-paintings.dim_400x400.jpg";

function formatPrice(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(paise) / 100);
}

export default function ProductDetail() {
  const { productId } = useParams({ from: "/layout/shop/$productId" });
  const { data: products = [], isLoading } = useAllProducts();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const product = products.find((p) => String(p.id) === productId);

  const images =
    product?.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [PLACEHOLDER];

  const activeImage = images[Math.min(selectedIndex, images.length - 1)];

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-5 w-32 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-5xl mb-4">🪔</p>
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This item may have been removed or the link is incorrect.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-[oklch(0.80_0.17_82)] hover:underline"
            data-ocid="product.link"
          >
            <ArrowLeft size={15} /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[oklch(0.12_0_0)] border-b border-border py-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              to="/"
              className="hover:text-[oklch(0.80_0.17_82)] transition-colors"
              data-ocid="product.link"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/shop"
              className="hover:text-[oklch(0.80_0.17_82)] transition-colors"
              data-ocid="product.link"
            >
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[oklch(0.80_0.17_82)] transition-colors mb-8"
          data-ocid="product.link"
        >
          <ArrowLeft size={15} />
          Back to Shop
        </Link>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Image gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER;
                }}
              />
              {!product.inStock && (
                <div className="absolute inset-0 rounded-xl bg-black/60 flex items-center justify-center">
                  <Badge
                    variant="secondary"
                    className="text-base px-4 py-1.5 bg-[oklch(0.15_0_0)] text-[oklch(0.55_0_0)] border border-[oklch(0.30_0_0)]"
                    data-ocid="product.card"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails — only show if more than 1 image */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((url, thumbIdx) => {
                  const thumbKey = `thumb-${url}-${thumbIdx}`;
                  return (
                    <button
                      key={thumbKey}
                      type="button"
                      onClick={() => setSelectedIndex(thumbIdx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        thumbIdx === selectedIndex
                          ? "border-[oklch(0.80_0.17_82)] shadow-[0_0_8px_oklch(0.80_0.17_82/0.4)]"
                          : "border-border hover:border-[oklch(0.80_0.17_82/0.5)]"
                      }`}
                      data-ocid={`product.item.${thumbIdx + 1}`}
                    >
                      <img
                        src={url}
                        alt={`View ${thumbIdx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <Badge
                className="bg-[oklch(0.75_0.15_80/0.15)] text-[oklch(0.80_0.17_82)] border border-[oklch(0.75_0.15_80/0.35)] uppercase tracking-widest text-xs px-3 py-1"
                data-ocid="product.card"
              >
                {product.category}
              </Badge>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-[oklch(0.80_0.17_82)]">
              {formatPrice(product.price)}
            </p>

            <div className="border-t border-border" />

            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                About this piece
              </h2>
              <p className="text-base text-foreground/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-border" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin
                  size={14}
                  className="text-[oklch(0.80_0.17_82)] shrink-0"
                />
                <span>Handcrafted in Varanasi, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Package
                  size={14}
                  className="text-[oklch(0.80_0.17_82)] shrink-0"
                />
                <span>
                  Each piece is unique — slight variations are natural
                </span>
              </div>
            </div>

            <div className="mt-auto">
              {product.inStock ? (
                <p className="text-sm text-emerald-400 font-medium">
                  ● In Stock
                </p>
              ) : (
                <p
                  className="text-sm text-[oklch(0.55_0_0)] font-medium"
                  data-ocid="product.error_state"
                >
                  ● Currently Unavailable
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
