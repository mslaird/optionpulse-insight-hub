
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import OptionsChain from "./pages/OptionsChain";
import Community from "./pages/Community";
import Challenges from "./pages/Challenges";
import Alerts from "./pages/Alerts";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import Achievements from "./pages/Achievements";
import Tools from "./pages/Tools";
import StockDetail from "./pages/StockDetail";
import LessonPage from "./components/education/LessonPage";
import Pricing from "./pages/Pricing";
import { AIAlertsProvider } from "./contexts/AIAlertsContext";
import { useEffect } from "react";
import { autoLoginAsTier } from "./utils/auth";

const queryClient = new QueryClient();

const App = () => {
  // Auto-login as Free user for demo purposes
  useEffect(() => {
    // Simulate user automatically logged in as Free tier
    autoLoginAsTier('Free');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AIAlertsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education/:id" element={<LessonPage />} />
              <Route path="/options-chain" element={<OptionsChain />} />
              <Route path="/community" element={<Community />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/stock/:ticker" element={<StockDetail />} />
              {/* Add redirect for journal route */}
              <Route path="/journal" element={<Navigate to="/tools?tab=journal" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AIAlertsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
