import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import PriceDashboard from "./pages/PriceDashboard";
import ToolsLibrary from "./pages/ToolsLibrary";
import IntelligenceFeed from "./pages/IntelligenceFeed";
import BulletinReader from "./pages/BulletinReader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing — own Header/Footer */}
          <Route path="/" element={<Index />} />

          {/* Checkout — own layout (urgency bar, no global nav) */}
          <Route path="/assinar" element={<Checkout />} />
          <Route path="/checkout" element={<Navigate to="/assinar" replace />} />

          {/* Pages with global Navbar + Footer */}
          <Route element={<AppLayout />}>
            <Route path="/radar" element={<PriceDashboard />} />
            <Route path="/ferramentas" element={<ToolsLibrary />} />
            <Route path="/boletins" element={<IntelligenceFeed />} />
            <Route path="/boletins/:id" element={<BulletinReader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
