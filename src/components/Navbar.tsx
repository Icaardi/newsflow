import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Radar de Preços", path: "/radar" },
  { label: "Ferramentas", path: "/ferramentas" },
  { label: "Boletins", path: "/boletins" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] h-16">
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
          <span className="font-bold text-lg text-[#0F2B3C]">Radar OPME</span>
          <span className="text-[11px] text-[#6B7280] font-normal hidden sm:inline">by DS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? "text-[#0F2B3C]"
                    : "text-[#6B7280] hover:text-[#0F2B3C] hover:bg-[#F8FAFB]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#00C2A8] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild size="sm" className="bg-[#00C2A8] hover:bg-[#00A892] text-white rounded-lg">
            <Link to="/assinar">Assinar</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#0F2B3C]"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-[#E5E7EB]"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-[#0F2B3C] bg-[#E6FAF7]"
                        : "text-[#6B7280] hover:bg-[#F8FAFB]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-[#00C2A8] hover:bg-[#00A892] text-white rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to="/assinar">Assinar</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
