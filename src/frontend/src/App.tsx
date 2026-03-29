import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Policies from "./pages/Policies";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manage",
  component: Admin,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const shopRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/shop",
  component: Shop,
});

const productDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/shop/$productId",
  component: ProductDetail,
});

const aboutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/about",
  component: About,
});

const signupRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/signup",
  component: Signup,
});

const contactRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/contact",
  component: Contact,
});

const policiesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/policies",
  component: Policies,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    shopRoute,
    productDetailRoute,
    aboutRoute,
    signupRoute,
    contactRoute,
    policiesRoute,
  ]),
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
