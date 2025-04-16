
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { AIAlertsProvider } from "./contexts/AIAlertsContext";

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="/stock/:ticker" element={<StockDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AIAlertsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
