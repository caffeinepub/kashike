# Kashike — Catalog-Only Product Detail Page

## Current State
The site has a Shop page with product cards showing "Add to Cart" buttons. There is no product detail page — clicking a product does nothing. A CartDrawer, useCart hook, and CartProvider exist for e-commerce functionality. The Header shows a shopping cart icon with item count.

## Requested Changes (Diff)

### Add
- New `ProductDetail` page at route `/shop/$productId` that shows: full product image, product name, category badge, price, detailed description, and an "Out of Stock" indicator if applicable. No purchase options.
- Navigation breadcrumb on ProductDetail: Home → Shop → Product Name

### Modify
- `ProductCard.tsx`: Remove "Add to Cart" button and `useCart` usage. Make the entire card a clickable link navigating to `/shop/$productId`. Keep image, name, category, price, description preview.
- `Header.tsx`: Remove `ShoppingCart` icon, `useCart` import, `totalItems`, `openCart`. Remove Heart/wishlist icon too (not needed for catalog). Keep Search icon (non-functional placeholder is fine).
- `App.tsx`: Remove `CartProvider`, `CartDrawer` import/usage, add `productDetailRoute` at `/shop/$productId`. Remove CartDrawer from layout.
- `Shop.tsx`: Remove any cart-related imports. Keep category filter and product grid.
- `/manage` (Admin.tsx): No changes needed — product management stays the same.

### Remove
- `CartDrawer` usage from layout (file can remain but must not be rendered)
- `useCart` from all visible components
- All "Add to Cart", "Buy Now" UI from product cards

## Implementation Plan
1. Create `src/frontend/src/pages/ProductDetail.tsx` — fetches product by ID from backend using `getProduct(id)`, displays full premium layout, back navigation
2. Edit `App.tsx` — add productDetailRoute, remove CartProvider and CartDrawer from layout
3. Edit `ProductCard.tsx` — replace button with link navigation, remove cart functionality
4. Edit `Header.tsx` — remove cart icon and useCart dependency
5. Validate build
