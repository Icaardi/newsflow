import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Stethoscope, ClipboardCheck,
  FileText, Settings, ChevronLeft, LogOut, Sparkles,
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

interface Props {
  mobileOpen: boolean;
  onMobileClose: () => void;
  isAgentOpen: boolean;
  onAgentToggle: () => void;
}

export default function AppSidebar({ mobileOpen, onMobileClose, isAgentOpen, onAgentToggle }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  const initials = user?.name ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "U";

  const NavItem = ({ icon: Icon, label, path, active, onClick }: { icon: React.ElementType; label: string; path?: string; active: boolean; onClick?: () => void }) => {
    const cls = `flex items-center gap-3 rounded-sm transition-all duration-150 ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"}`;
    const style = {
      backgroundColor: active ? "rgba(5, 89, 181, 0.12)" : "transparent",
      color: active ? "var(--ds-blue)" : "var(--text-secondary)",
      borderLeft: collapsed ? "none" : active ? "3px solid var(--ds-blue)" : "3px solid transparent",
      fontWeight: active ? 500 : 400,
      fontSize: "14px",
    };
    const handlers = {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { if (!active) { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--text-primary)"; }},
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }},
    };

    if (onClick) {
      return (
        <button className={`${cls} w-full`} style={style} onClick={onClick} title={collapsed ? label : undefined} aria-label={label} {...handlers}>
          <Icon size={20} className="shrink-0" />
          {!collapsed && <span>{label}</span>}
        </button>
      );
    }

    return (
      <Link to={path!} onClick={onMobileClose} className={cls} style={style} title={collapsed ? label : undefined} aria-label={label} {...handlers}>
        <Icon size={20} className="shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

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
          return <NavItem key={item.path} icon={item.icon} label={item.label} path={item.path} active={active} />;
        })}

        {/* Deb.ai — special item */}
        <button
          className={`flex items-center gap-3 rounded-sm transition-all duration-150 w-full ${collapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5"}`}
          style={{
            backgroundColor: isAgentOpen ? "rgba(192, 0, 126, 0.12)" : "transparent",
            color: isAgentOpen ? "var(--ds-magenta)" : "var(--ds-magenta)",
            borderLeft: collapsed ? "none" : isAgentOpen ? "3px solid var(--ds-magenta)" : "3px solid transparent",
            fontWeight: isAgentOpen ? 500 : 400,
            fontSize: "14px",
          }}
          onMouseEnter={(e) => { if (!isAgentOpen) e.currentTarget.style.backgroundColor = "rgba(192, 0, 126, 0.08)"; }}
          onMouseLeave={(e) => { if (!isAgentOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
          onClick={() => { onAgentToggle(); onMobileClose(); }}
          title={collapsed ? "Deb.ai — Assistente IA" : undefined}
          aria-label="Deb.ai — Assistente IA"
        >
          <Sparkles size={20} className="shrink-0" />
          {!collapsed && (
            <>
              <span>Deb.ai</span>
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(192, 0, 126, 0.15)", color: "var(--ds-magenta)", lineHeight: 1 }}
              >
                IA
              </span>
            </>
          )}
        </button>
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
      <aside
        className="hidden lg:flex flex-col shrink-0 transition-all duration-200"
        style={{ width: collapsed ? 64 : 240, backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border-default)" }}
      >
        <SidebarContent />
      </aside>

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
