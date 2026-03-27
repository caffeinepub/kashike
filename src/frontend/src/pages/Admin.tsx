import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PackageSearch, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Product } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useAllProducts,
  useDeleteProduct,
  useInitializeProducts,
  useIsAdmin,
  useSetStock,
  useUpdateProduct,
} from "../hooks/useQueries";

const CATEGORIES = [
  "3D Paintings",
  "Traditional Pencils",
  "Keychains",
  "Jute Folders",
  "Jute Bags",
];
const SKELETONS = ["a", "b", "c", "d", "e"];

function formatPrice(paise: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(paise) / 100);
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  inStock: boolean;
  imageFile: File | null;
}

const defaultFormData: ProductFormData = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  inStock: true,
  imageFile: null,
};

export default function Admin() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: products = [], isLoading: productsLoading } = useAllProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const setStock = useSetStock();
  const initProducts = useInitializeProducts();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoggingIn = loginStatus === "logging-in";
  const isLoggedIn = !!identity;

  const openAdd = () => {
    setEditingProduct(null);
    setFormData(defaultFormData);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: (Number(product.price) / 100).toString(),
      inStock: product.inStock,
      imageFile: null,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    const priceInPaise = BigInt(
      Math.round(Number.parseFloat(formData.price) * 100),
    );

    let imageBlob: ExternalBlob;
    if (formData.imageFile) {
      const bytes = new Uint8Array(await formData.imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
        setUploadProgress(p),
      );
    } else if (editingProduct) {
      imageBlob = editingProduct.image as ExternalBlob;
    } else {
      toast.error("Please select an image");
      return;
    }

    const productData: Product = {
      id: editingProduct?.id ?? 0n,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: priceInPaise,
      inStock: formData.inStock,
      image: imageBlob,
    };

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync(productData);
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync(productData);
        toast.success("Product added!");
      }
      setDialogOpen(false);
      setUploadProgress(0);
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleToggleStock = async (id: bigint, inStock: boolean) => {
    try {
      await setStock.mutateAsync({ id, inStock });
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleInitialize = async () => {
    try {
      await initProducts.mutateAsync();
      toast.success("Products initialized!");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm p-8" data-ocid="admin.panel">
          <div className="w-16 h-16 rounded-full bg-[oklch(0.92_0.02_75)] border-2 border-[oklch(0.72_0.12_75)] flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-2xl">काशी</span>
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in to manage your Kashike store
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full bg-[oklch(0.28_0.06_30)] hover:bg-[oklch(0.35_0.06_30)] text-[oklch(0.96_0.015_80)] rounded-full h-11"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : null}
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      </main>
    );
  }

  if (isAdminLoading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2
          className="animate-spin text-[oklch(0.72_0.12_75)]"
          size={32}
        />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm p-8" data-ocid="admin.error_state">
          <h1 className="font-display text-2xl font-bold mb-2 text-destructive">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You do not have admin privileges to access this panel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-[oklch(0.28_0.06_30)] text-white py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
            <p className="text-[oklch(0.72_0.12_75)] text-sm mt-1">
              Kashike Store Management
            </p>
          </div>
          <div className="flex gap-3">
            {products.length === 0 && (
              <Button
                variant="outline"
                className="border-[oklch(0.72_0.12_75)] text-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.72_0.12_75)] hover:text-[oklch(0.24_0.06_28)] gap-2 rounded-full"
                onClick={handleInitialize}
                disabled={initProducts.isPending}
                data-ocid="admin.secondary_button"
              >
                {initProducts.isPending && (
                  <Loader2 className="animate-spin" size={14} />
                )}
                <PackageSearch size={16} /> Initialize Products
              </Button>
            )}
            <Button
              className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.14_73)] text-[oklch(0.24_0.06_28)] gap-2 rounded-full font-semibold"
              onClick={openAdd}
              data-ocid="admin.primary_button"
            >
              <Plus size={16} /> Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {productsLoading ? (
          <div className="space-y-3" data-ocid="admin.loading_state">
            {SKELETONS.map((key) => (
              <Skeleton key={key} className="h-16 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20" data-ocid="admin.empty_state">
            <PackageSearch
              size={48}
              className="text-muted-foreground/30 mx-auto mb-4"
            />
            <p className="font-display text-xl font-semibold mb-2">
              No products yet
            </p>
            <p className="text-muted-foreground mb-4">
              Initialize with sample products or add your first product
            </p>
            <Button
              onClick={handleInitialize}
              disabled={initProducts.isPending}
              data-ocid="admin.primary_button"
            >
              {initProducts.isPending && (
                <Loader2 className="animate-spin mr-2" size={14} />
              )}
              Initialize Sample Products
            </Button>
          </div>
        ) : (
          <div
            className="rounded-lg border border-border overflow-hidden"
            data-ocid="admin.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary">
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Price</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, i) => (
                  <TableRow
                    key={String(product.id)}
                    data-ocid={`admin.row.${i + 1}`}
                  >
                    <TableCell>
                      <img
                        src={
                          product.image?.getDirectURL?.() ??
                          "/assets/generated/category-3d-paintings.dim_400x400.jpg"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/generated/category-3d-paintings.dim_400x400.jpg";
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 hidden md:block">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-medium">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.inStock}
                        onCheckedChange={(checked) =>
                          handleToggleStock(product.id, checked)
                        }
                        data-ocid={`admin.switch.${i + 1}`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEdit(product)}
                          data-ocid={`admin.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="prod-name">Product Name *</Label>
                <Input
                  id="prod-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g., Peacock 3D Painting"
                  className="mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label htmlFor="prod-category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData((f) => ({ ...f, category: v }))
                  }
                >
                  <SelectTrigger
                    id="prod-category"
                    className="mt-1"
                    data-ocid="admin.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prod-price">Price (₹) *</Label>
                <Input
                  id="prod-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="e.g., 1500"
                  className="mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="prod-desc">Description</Label>
                <Textarea
                  id="prod-desc"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe the product..."
                  rows={3}
                  className="mt-1"
                  data-ocid="admin.textarea"
                />
              </div>
              <div className="col-span-2">
                <Label>Product Image {!editingProduct && "*"}</Label>
                <button
                  type="button"
                  className="mt-1 w-full border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-[oklch(0.72_0.12_75)] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="admin.dropzone"
                >
                  {formData.imageFile ? (
                    <p className="text-sm text-foreground font-medium">
                      {formData.imageFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {editingProduct
                        ? "Click to replace image"
                        : "Click to upload image"}
                    </p>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData((f) => ({ ...f, imageFile: file }));
                  }}
                  data-ocid="admin.upload_button"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-[oklch(0.72_0.12_75)] h-1.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <Switch
                  id="prod-stock"
                  checked={formData.inStock}
                  onCheckedChange={(v) =>
                    setFormData((f) => ({ ...f, inStock: v }))
                  }
                  data-ocid="admin.switch"
                />
                <Label htmlFor="prod-stock">In Stock</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-[oklch(0.28_0.06_30)] hover:bg-[oklch(0.35_0.06_30)] text-[oklch(0.96_0.015_80)]"
              onClick={handleSubmit}
              disabled={addProduct.isPending || updateProduct.isPending}
              data-ocid="admin.submit_button"
            >
              {addProduct.isPending || updateProduct.isPending ? (
                <Loader2 className="animate-spin mr-2" size={14} />
              ) : null}
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
