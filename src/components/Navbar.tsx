import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "Radar de Preços", path: "/radar" },
  { label: "Procedimentos", path: "/procedimentos" },
  { label: "Ferramentas", path: "/ferramentas" },
  { label: "Boletins", path: "/boletins" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Ctrl+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-16 border-b"
        style={{ background: "var(--surface-glass)", backdropFilter: "blur(20px) saturate(1.5)", borderColor: "var(--border-default)" }}
      >
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
            <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Radar OPME</span>
            <span className="text-[11px] font-normal hidden sm:inline" style={{ color: "var(--text-tertiary)" }}>by DS</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.path);
              return (
                <Link key={link.path} to={link.path}
                  className="relative px-3.5 py-2 text-sm font-medium rounded-sm transition-colors"
                  style={{ color: active ? "var(--ds-blue)" : "var(--text-secondary)" }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--ds-blue)" }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-sm text-sm transition-colors"
              style={{ color: "var(--text-tertiary)", border: "1px solid var(--border-default)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <Search size={15} />
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="hidden lg:inline text-[10px] font-mono-metric px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                Ctrl+K
              </kbd>
            </button>

            {isLoggedIn ? (
              /* Profile dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 h-9 px-3 rounded-sm transition-colors"
                  style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                  onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.borderColor = "var(--border-default)"; }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(5,89,181,0.15)", color: "var(--ds-blue)" }}>
                    <User size={14} />
                  </div>
                  <span className="text-sm hidden lg:inline" style={{ color: "var(--text-primary)" }}>
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-md py-1 z-50"
                      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                    >
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                      >
                        <LayoutDashboard size={15} /> Meu Dashboard
                      </Link>
                      <Link to="/configuracoes" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                      >
                        <Settings size={15} /> Configurações
                      </Link>
                      <div className="my-1" style={{ borderTop: "1px solid var(--border-default)" }} />
                      <button onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm w-full text-left transition-colors"
                        style={{ color: "var(--text-tertiary)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--danger)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
                      >
                        <LogOut size={15} /> Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Visitor: Entrar + Assinar */
              <>
                <Link to="/login" className="h-9 px-4 text-sm font-medium flex items-center transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  Entrar
                </Link>
                <Link to="/assinar"
                  className="inline-flex items-center justify-center h-9 px-5 text-sm font-semibold text-white rounded-sm transition-all duration-200"
                  style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 20px var(--ds-magenta-glow)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
                >
                  Assinar
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2" style={{ color: "var(--text-secondary)" }}>
              <Search size={20} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2" style={{ color: "var(--text-primary)" }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-b"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-default)" }}
            >
              <div className="px-5 py-4 space-y-1">
                {navLinks.map((link) => {
                  const active = location.pathname.startsWith(link.path);
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-sm text-sm font-medium transition-colors"
                      style={{ color: active ? "var(--ds-blue)" : "var(--text-secondary)", backgroundColor: active ? "rgba(5,89,181,0.1)" : "transparent" }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 rounded-sm text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Meu Dashboard
                      </Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                        className="block w-full text-left px-3 py-2.5 rounded-sm text-sm font-medium" style={{ color: "var(--danger)" }}>
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)}
                        className="block text-center px-4 py-2.5 rounded-sm text-sm font-medium" style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}>
                        Entrar
                      </Link>
                      <Link to="/assinar" onClick={() => setMobileOpen(false)}
                        className="block text-center px-4 py-2.5 text-sm font-semibold text-white rounded-sm" style={{ backgroundColor: "var(--ds-magenta)" }}>
                        Assinar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
