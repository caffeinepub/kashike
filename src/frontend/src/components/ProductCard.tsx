import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../backend";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(paise: bigint): string {
  const rupees = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export default function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addItem } = useCart();
  const imageUrl =
    product.image?.getDirectURL?.() ??
    "/assets/generated/category-3d-paintings.dim_400x400.jpg";

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl,
    });
  };

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-[oklch(0.75_0.15_80)] hover:shadow-[0_0_20px_oklch(0.75_0.15_80/0.15)] transition-all duration-300"
      data-ocid={`product.item.${index}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/category-3d-paintings.dim_400x400.jpg";
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge
              variant="secondary"
              className="text-sm bg-[oklch(0.20_0_0)] text-[oklch(0.60_0_0)]"
            >
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[oklch(0.80_0.17_82)] uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-lg text-[oklch(0.80_0.17_82)]">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            className="bg-[oklch(0.75_0.15_80)] hover:bg-[oklch(0.80_0.17_82)] text-[oklch(0.08_0_0)] rounded-full text-xs px-4 gap-1.5 font-semibold"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            data-ocid={`product.button.${index}`}
          >
            <ShoppingCart size={13} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
