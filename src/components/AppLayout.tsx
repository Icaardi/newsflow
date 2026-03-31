import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";
import GlobalFooter from "./GlobalFooter";
import RadarAgent from "./RadarAgent";
import { useAuth } from "@/contexts/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col h-screen">
        <Navbar onMobileMenuToggle={isLoggedIn ? () => setMobileOpen((p) => !p) : undefined} />

        <div className="flex flex-1 overflow-hidden">
          {isLoggedIn && (
            <AppSidebar
              mobileOpen={mobileOpen}
              onMobileClose={() => setMobileOpen(false)}
              isAgentOpen={isAgentOpen}
              onAgentToggle={() => setIsAgentOpen((p) => !p)}
            />
          )}

          <main className="flex-1 overflow-y-auto">
            <Outlet />
            {!isLoggedIn && <GlobalFooter />}
          </main>
        </div>
      </div>

      {isLoggedIn && (
        <RadarAgent isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
      )}
    </>
  );
}
