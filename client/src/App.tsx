import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useLoading } from "./contexts/LoadingContext";

function RouteChangeListener() {
  const [location] = useLocation();
  const { showLoading, hideLoading } = useLoading();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    // Only show loading if location actually changed (not on initial mount)
    if (previousLocation !== location) {
      console.log('[Loading] Route changed from', previousLocation, 'to', location);
      showLoading();
      // Hide loading after a delay to allow page to render
      const timer = setTimeout(() => {
        hideLoading();
        console.log('[Loading] Animation hidden');
      }, 1200);
      setPreviousLocation(location);
      return () => clearTimeout(timer);
    }
  }, [location, showLoading, hideLoading, previousLocation]);

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
