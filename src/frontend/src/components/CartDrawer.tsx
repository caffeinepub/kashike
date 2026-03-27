import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";

function formatPrice(paise: bigint): string {
  const rupees = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        className="w-full sm:max-w-md flex flex-col bg-background"
        data-ocid="cart.sheet"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag size={20} className="text-[oklch(0.72_0.12_75)]" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag size={48} className="text-muted-foreground/30" />
            <div>
              <p className="font-medium text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some traditional treasures!
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={closeCart}
              data-ocid="cart.cancel_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={String(item.productId)}
                  className="flex gap-3"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-snug line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-[oklch(0.72_0.12_75)] font-bold text-sm mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                        onClick={() => removeItem(item.productId)}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg text-[oklch(0.28_0.06_30)]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Button
                className="w-full bg-[oklch(0.28_0.06_30)] hover:bg-[oklch(0.35_0.06_30)] text-[oklch(0.96_0.015_80)] rounded-full h-12 text-base font-medium"
                data-ocid="cart.confirm_button"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="ghost"
                className="w-full text-sm text-muted-foreground"
                onClick={clearCart}
                data-ocid="cart.delete_button"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
