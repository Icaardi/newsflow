import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import PriceDashboard from "./pages/PriceDashboard";
import ProceduresTable from "./pages/ProceduresTable";
import DeviceReport from "./pages/DeviceReport";
import ToolsLibrary from "./pages/ToolsLibrary";
import IntelligenceFeed from "./pages/IntelligenceFeed";
import BulletinReader from "./pages/BulletinReader";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing — own Header/Footer */}
            <Route path="/" element={<Index />} />

            {/* Checkout — own layout */}
            <Route path="/assinar" element={<Checkout />} />
            <Route path="/checkout" element={<Navigate to="/assinar" replace />} />

            {/* Pages with global Navbar + Footer */}
            <Route element={<AppLayout />}>
              {/* Public */}
              <Route path="/radar" element={<PriceDashboard />} />
              <Route path="/procedimentos" element={<ProceduresTable />} />
              <Route path="/dispositivo/:id" element={<DeviceReport />} />
              <Route path="/ferramentas" element={<ToolsLibrary />} />
              <Route path="/boletins" element={<IntelligenceFeed />} />
              <Route path="/boletins/:id" element={<BulletinReader />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cadastro" element={<Navigate to="/register" replace />} />

              {/* Protected */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/configuracoes" element={<ProtectedRoute><Placeholder /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
