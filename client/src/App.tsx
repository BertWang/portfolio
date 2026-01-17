import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useEffect } from "react";
import { useLoading } from "./contexts/LoadingContext";

function RouteChangeListener() {
  const [location] = useLocation();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // Show loading when route changes
    showLoading();
    // Hide loading after a short delay to allow page to render
    const timer = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(timer);
  }, [location, showLoading, hideLoading]);

  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <RouteChangeListener />
      <Switch>
        {/* Multi-language routes */}
        <Route path="/" component={Home} />
        <Route path="/tw/*" component={Home} />
        <Route path="/jp/*" component={Home} />
        <Route path="/my/*" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <TooltipProvider>
          <Toaster />
          <LoadingSpinner />
          <Router />
        </TooltipProvider>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
