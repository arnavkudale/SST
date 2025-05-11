import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext";
import SEO from '@/components/SEO';
import { Suspense, lazy, useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance';
import { performanceBudgetMonitor } from '@/lib/performance-budget';
import { initGA, trackPageView, trackPerformance } from '@/lib/analytics';
import PerformanceDashboard from './components/PerformanceDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { authManager } from './lib/auth';

// Initialize Google Analytics
if (process.env.NODE_ENV === 'production') {
  initGA(process.env.VITE_GA_MEASUREMENT_ID || '');
}

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/Login'));
const Cart = lazy(() => import('@/pages/Cart'));
const Account = lazy(() => import('@/pages/Account'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const ShippingPolicy = lazy(() => import('@/pages/shipping-policy'));
const ReturnPolicy = lazy(() => import('@/pages/return-policy'));
const CancellationAndRefund = lazy(() => import('@/pages/cancellation-and-refund'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const Navigation = () => {
  const isAdmin = authManager.isAdmin();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg font-semibold">Home</Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
            <Link to="/account" className="text-gray-600 hover:text-gray-900">Account</Link>
            {isAdmin && (
              <Link to="/performance" className="text-gray-600 hover:text-gray-900">
                Performance
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname);
    
    // Log route change performance
    const startTime = performance.now();
    performanceMonitor.logCustomMetric('RouteChange', startTime);
    
    // Check performance metrics
    const metrics = performanceMonitor.getMetrics();
    performanceBudgetMonitor.checkLCP(metrics.lcp);
    performanceBudgetMonitor.checkFID(metrics.fid);
    performanceBudgetMonitor.checkCLS(metrics.cls);
    
    // Track performance
    trackPerformance();
  }, [location]);

  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/cancellation-and-refund" element={<CancellationAndRefund />} />
              <Route 
                path="/performance" 
                element={
                  <ProtectedRoute>
                    <PerformanceDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    const metrics = performanceMonitor.getMetrics();
    console.log('Initial Performance Metrics:', metrics);
    
    // Check initial performance metrics
    performanceBudgetMonitor.checkLCP(metrics.lcp);
    performanceBudgetMonitor.checkFID(metrics.fid);
    performanceBudgetMonitor.checkCLS(metrics.cls);
    
    // Track initial performance
    trackPerformance();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <SEO />
            <Toaster />
            <Sonner />
            <Router>
              <AnimatedRoutes />
            </Router>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
