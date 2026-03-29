import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../backend";
import { useActor } from "./useActor";

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: {
      name: string;
      description: string;
      price: bigint;
      category: string;
      imageUrl: string;
      inStock: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addProduct(
        product.name,
        product.description,
        product.price,
        product.category,
        product.imageUrl,
        product.inStock,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: {
      id: bigint;
      name: string;
      description: string;
      price: bigint;
      category: string;
      imageUrl: string;
      inStock: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProduct(
        product.id,
        product.name,
        product.description,
        product.price,
        product.category,
        product.imageUrl,
        product.inStock,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useSetStock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, inStock }: { id: bigint; inStock: boolean }) => {
      if (!actor) throw new Error("No actor");
      return actor.setStock(id, inStock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
