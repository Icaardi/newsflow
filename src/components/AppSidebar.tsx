import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Stethoscope, ClipboardCheck,
  FileText, Settings, ChevronLeft, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const COLLAPSE_KEY = "radaropme_sidebar_collapsed";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Radar de Preços", icon: BarChart3, path: "/radar" },
  { label: "Procedimentos", icon: Stethoscope, path: "/procedimentos" },
  { label: "Ferramentas", icon: ClipboardCheck, path: "/ferramentas" },
  { label: "Boletins", icon: FileText, path: "/boletins" },
];

const bottomItems = [
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
];

export default function AppSidebar({ mobileOpen, onMobileClose }: { mobileOpen: boolean; onMobileClose: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  const initials = user?.name ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "U";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 shrink-0" style={{ borderBottom: "1px solid var(--border-default)" }}>
        {!collapsed && (
          <Link to="/dashboard" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Radar OPME</Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1 rounded transition-colors"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
          aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
          title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          <ChevronLeft size={18} className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-sm transition-all duration-150 ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"}`}
              style={{
                backgroundColor: active ? "rgba(5, 89, 181, 0.12)" : "transparent",
                color: active ? "var(--ds-blue)" : "var(--text-secondary)",
                borderLeft: collapsed ? "none" : active ? "3px solid var(--ds-blue)" : "3px solid transparent",
                fontWeight: active ? 500 : 400,
                fontSize: "14px",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--text-primary)"; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-2 space-y-1" style={{ borderTop: "1px solid var(--border-default)" }}>
        {bottomItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-sm transition-all duration-150 ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"}`}
              style={{
                backgroundColor: active ? "rgba(5, 89, 181, 0.12)" : "transparent",
                color: active ? "var(--ds-blue)" : "var(--text-tertiary)",
                fontSize: "14px",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* User */}
        <div className={`flex items-center gap-2.5 rounded-sm py-2 ${collapsed ? "justify-center px-2" : "px-4"}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ backgroundColor: "rgba(5, 89, 181, 0.12)", color: "var(--ds-blue)" }}>
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{user?.name}</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-tertiary)" }}>{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="p-1 rounded transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--danger)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
              aria-label="Sair" title="Sair"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? 64 : 240,
          backgroundColor: "var(--bg-secondary)",
          borderRight: "1px solid var(--border-default)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 flex flex-col" style={{ backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border-default)" }}>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
