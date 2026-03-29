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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Mail,
  PackageSearch,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  useAddProduct,
  useAllProducts,
  useDeleteProduct,
  useSetStock,
  useUpdateProduct,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "kashike@2024";
const STORAGE_KEY = "adminLoggedIn";

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

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface SignupEntry {
  id: bigint;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: bigint;
}

interface ContactMessage {
  id: bigint;
  name: string;
  email: string;
  mobile: string;
  message: string;
  timestamp: bigint;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  inStock: boolean;
  imageUrl: string;
}

const defaultFormData: ProductFormData = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  inStock: true,
  imageUrl: "",
};

function SignupsTab() {
  const { actor, isFetching } = useActor();
  const { data: signups = [], isLoading } = useQuery<SignupEntry[]>({
    queryKey: ["signups"],
    queryFn: async () => {
      try {
        if (!actor) return [];
        return await actor.getAllSignups();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading) {
    return (
      <div className="space-y-3 mt-4" data-ocid="admin.loading_state">
        {SKELETONS.map((k) => (
          <Skeleton key={k} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (signups.length === 0) {
    return (
      <div className="text-center py-16" data-ocid="admin.empty_state">
        <Users size={40} className="text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No signups yet.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-border overflow-hidden mt-4"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Mobile</TableHead>
            <TableHead className="hidden md:table-cell">City</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signups.map((s, i) => (
            <TableRow key={String(s.id)} data-ocid={`admin.row.${i + 1}`}>
              <TableCell className="font-medium">{s.fullName}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell className="hidden sm:table-cell">{s.mobile}</TableCell>
              <TableCell className="hidden md:table-cell">{s.city}</TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                {formatTimestamp(s.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ContactMessagesTab() {
  const { actor, isFetching } = useActor();
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      try {
        if (!actor) return [];
        return await actor.getAllContactMessages();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading) {
    return (
      <div className="space-y-3 mt-4" data-ocid="admin.loading_state">
        {SKELETONS.map((k) => (
          <Skeleton key={k} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16" data-ocid="admin.empty_state">
        <Mail size={40} className="text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No messages yet.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-border overflow-hidden mt-4"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Mobile</TableHead>
            <TableHead className="hidden md:table-cell">Message</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((m, i) => (
            <TableRow key={String(m.id)} data-ocid={`admin.row.${i + 1}`}>
              <TableCell className="font-medium">{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell className="hidden sm:table-cell">{m.mobile}</TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="max-w-xs truncate text-sm text-muted-foreground">
                  {m.message}
                </p>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                {formatTimestamp(m.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PasswordGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.15 0.04 28)" }}
    >
      <div
        className="text-center max-w-sm w-full p-8 mx-4 rounded-2xl"
        style={{
          background: "oklch(0.2 0.05 28)",
          border: "1px solid oklch(0.72 0.12 75 / 0.3)",
        }}
        data-ocid="admin.panel"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{
            background: "oklch(0.28 0.06 30)",
            border: "2px solid oklch(0.72 0.12 75)",
          }}
        >
          <span
            className="font-display text-xl"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            काशी
          </span>
        </div>
        <h1
          className="font-display text-2xl font-bold mb-1"
          style={{ color: "oklch(0.96 0.015 80)" }}
        >
          Admin Access
        </h1>
        <p className="text-sm mb-6" style={{ color: "oklch(0.72 0.12 75)" }}>
          Kashike Store Management
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="pr-10 text-center"
              style={{
                background: "oklch(0.28 0.06 30)",
                border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                color: "oklch(0.96 0.015 80)",
              }}
              autoFocus
              data-ocid="admin.input"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "oklch(0.72 0.12 75)" }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p
              className="text-sm"
              style={{ color: "oklch(0.6 0.2 25)" }}
              data-ocid="admin.error_state"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-full h-11 font-semibold"
            style={{
              background: "oklch(0.72 0.12 75)",
              color: "oklch(0.24 0.06 28)",
            }}
            data-ocid="admin.submit_button"
          >
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: products = [], isLoading: productsLoading } = useAllProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const setStock = useSetStock();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);

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
      imageUrl: product.imageUrl,
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

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          name: formData.name,
          description: formData.description,
          price: priceInPaise,
          category: formData.category,
          imageUrl: formData.imageUrl,
          inStock: formData.inStock,
        });
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync({
          name: formData.name,
          description: formData.description,
          price: priceInPaise,
          category: formData.category,
          imageUrl: formData.imageUrl,
          inStock: formData.inStock,
        });
        toast.success("Product added!");
      }
      setDialogOpen(false);
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
            <Button
              className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.14_73)] text-[oklch(0.24_0.06_28)] gap-2 rounded-full font-semibold"
              onClick={openAdd}
              data-ocid="admin.primary_button"
            >
              <Plus size={16} /> Add Product
            </Button>
            <Button
              variant="ghost"
              className="text-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.35_0.06_30)] gap-2 rounded-full"
              onClick={onLogout}
              data-ocid="admin.close_button"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="products" data-ocid="admin.tab">
              Products
            </TabsTrigger>
            <TabsTrigger value="signups" data-ocid="admin.tab">
              Signups
            </TabsTrigger>
            <TabsTrigger value="messages" data-ocid="admin.tab">
              Contact Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
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
                  Add your first product using the button above
                </p>
                <Button onClick={openAdd} data-ocid="admin.primary_button">
                  <Plus size={16} className="mr-2" />
                  Add First Product
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
                      <TableHead className="hidden sm:table-cell">
                        Price
                      </TableHead>
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
                              product.imageUrl ||
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
          </TabsContent>

          <TabsContent value="signups">
            <SignupsTab />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessagesTab />
          </TabsContent>
        </Tabs>
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
                <Label htmlFor="prod-image">Image URL</Label>
                <Input
                  id="prod-image"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                  data-ocid="admin.input"
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-md border border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
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

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <PasswordGate onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
