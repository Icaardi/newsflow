import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Bell, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import SearchModal from "./SearchModal";

export default function Navbar({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) {
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen((p) => !p); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-profile-menu]")) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  return (
    <>
      <nav className="h-14 flex items-center justify-between px-4 lg:px-6 shrink-0 border-b" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-default)" }}>
        {/* Left */}
        <div className="flex items-center gap-3">
          {isLoggedIn && onMobileMenuToggle && (
            <button onClick={onMobileMenuToggle} className="lg:hidden p-1.5" style={{ color: "var(--text-secondary)" }} aria-label="Menu">
              <Menu size={20} />
            </button>
          )}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-baseline gap-1.5">
            <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Radar OPME</span>
            <span className="text-[10px] hidden sm:inline" style={{ color: "var(--text-tertiary)" }}>by DS</span>
          </Link>
        </div>

        {/* Center — search */}
        {isLoggedIn && (
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-md text-xs max-w-xs w-64 transition-colors"
            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)", border: "1px solid var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
          >
            <Search size={13} />
            <span className="flex-1 text-left">Buscar...</span>
            <kbd className="text-[10px] font-mono-metric px-1 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)" }}>Ctrl+K</kbd>
          </button>
        )}

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {isLoggedIn && (
            <button onClick={() => setSearchOpen(true)} className="sm:hidden p-1.5 rounded-md" style={{ color: "var(--text-tertiary)" }} aria-label="Buscar">
              <Search size={18} />
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: "var(--text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
            aria-label={theme === "light" ? "Modo escuro" : "Modo claro"}
            title={theme === "light" ? "Modo escuro" : "Modo claro"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <button className="relative p-1.5 rounded-md transition-colors" style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                aria-label="Notificações" title="Notificações"
              >
                <Bell size={18} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: "var(--ds-magenta)" }}>3</span>
              </button>

              {/* Profile */}
              <div className="relative" data-profile-menu>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-md transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                  onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "rgba(5,89,181,0.12)", color: "var(--ds-blue)" }}>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-md py-1 z-50 shadow-card-hover" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
                    <p className="px-3 py-2 text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{user?.name}</p>
                    <p className="px-3 pb-2 text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>{user?.email}</p>
                    <div style={{ borderTop: "1px solid var(--border-default)" }} />
                    <button onClick={() => { logout(); setProfileOpen(false); navigate("/"); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                      style={{ color: "var(--text-tertiary)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--danger)"; e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <LogOut size={14} /> Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
              >Entrar</Link>
              <Link to="/assinar" className="text-sm font-semibold px-4 py-1.5 rounded-md text-white transition-all"
                style={{ backgroundColor: "var(--ds-magenta)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
              >Assinar</Link>
            </div>
          )}
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
