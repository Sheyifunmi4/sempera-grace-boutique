import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CollectionPage from "./pages/CollectionPage";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache product data so navigation & re-renders don't re-hit Supabase.
      staleTime: 5 * 60 * 1000, // 5 minutes "fresh" — served from cache, no network
      gcTime: 30 * 60 * 1000, // keep in memory 30 min
      // Auto-recover from transient errors (429 rate-limit, timeouts) instead of
      // dead-ending on "please try again".
      retry: 3,
      retryDelay: (attempt) =>
        // exponential backoff + jitter to avoid a thundering-herd retry storm
        Math.min(1000 * 2 ** attempt, 15000) + Math.floor(Math.random() * 1000),
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartDrawer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/collection/:slug" element={<CollectionPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
