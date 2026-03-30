import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Radar, ClipboardList, Sparkles,
  BookOpen, CheckSquare, GraduationCap,
  Settings, ChevronLeft, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const COLLAPSE_KEY = "radaropme_sidebar_collapsed";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  action?: "agent";
  badge?: { text: string; color: string; bg: string };
  magenta?: boolean;
}

const sections: { label: string; items: NavItem[] }[] = [
  {
    label: "Dados & Tecnologia",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Radar de preços", icon: Radar, path: "/radar" },
      { label: "Procedimentos", icon: ClipboardList, path: "/procedimentos" },
      { label: "Deb.ai", icon: Sparkles, action: "agent", magenta: true, badge: { text: "IA", color: "var(--ds-magenta)", bg: "rgba(192,0,126,0.15)" } },
    ],
  },
  {
    label: "Informação & Regulação",
    items: [
      { label: "Boletins", icon: BookOpen, path: "/boletins", badge: { text: "4", color: "var(--ds-blue)", bg: "rgba(5,89,181,0.12)" } },
    ],
  },
  {
    label: "Educação & Auditoria",
    items: [
      { label: "Ferramentas", icon: CheckSquare, path: "/ferramentas" },
      { label: "Área de membros", icon: GraduationCap, path: "/membros", badge: { text: "Novo", color: "#059669", bg: "rgba(16,185,129,0.1)" } },
    ],
  },
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

  useEffect(() => { localStorage.setItem(COLLAPSE_KEY, String(collapsed)); }, [collapsed]);

  const initials = user?.name ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "U";

  const isActive = (item: NavItem) => {
    if (item.action === "agent") return isAgentOpen;
    if (!item.path) return false;
    if (item.path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(item.path);
  };

  const handleClick = (item: NavItem) => {
    if (item.action === "agent") { onAgentToggle(); onMobileClose(); }
    else if (item.path) { navigate(item.path); onMobileClose(); }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 shrink-0" style={{ borderBottom: "1px solid var(--border-default)" }}>
        {!collapsed && <Link to="/dashboard" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Radar OPME</Link>}
        {collapsed && <Link to="/dashboard" className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>RO</Link>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1 rounded transition-colors"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
          aria-label={collapsed ? "Expandir" : "Recolher"}
          title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          <ChevronLeft size={18} className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Sections */}
      <nav className="flex-1 overflow-y-auto py-2">
        {sections.map((section, sIdx) => (
          <div key={section.label}>
            {sIdx > 0 && <div className="mx-3 my-2 h-px" style={{ backgroundColor: "var(--border-default)", opacity: 0.5 }} />}
            {!collapsed && (
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-medium uppercase" style={{ letterSpacing: "0.08em", color: "var(--text-tertiary)", opacity: 0.6 }}>
                  {section.label}
                </span>
              </div>
            )}
            {collapsed && sIdx > 0 && null}

            <div className="px-2 space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item);
                const isMagenta = item.magenta;
                const activeColor = isMagenta ? "var(--ds-magenta)" : "var(--ds-blue)";
                const activeBg = isMagenta ? "rgba(192,0,126,0.12)" : "rgba(5,89,181,0.12)";
                const hoverBg = isMagenta ? "rgba(192,0,126,0.06)" : "rgba(0,0,0,0.04)";

                return (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item)}
                    className={`flex items-center gap-3 rounded-sm transition-all duration-150 w-full text-left ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-[10px]"}`}
                    style={{
                      backgroundColor: active ? activeBg : "transparent",
                      color: active ? activeColor : isMagenta ? "var(--ds-magenta)" : "var(--text-secondary)",
                      borderLeft: collapsed ? "none" : active ? `3px solid ${activeColor}` : "3px solid transparent",
                      fontWeight: active ? 500 : 400,
                      fontSize: "14px",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = hoverBg; if (!isMagenta) e.currentTarget.style.color = "var(--text-primary)"; }}}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; if (!isMagenta) e.currentTarget.style.color = "var(--text-secondary)"; }}}
                    title={collapsed ? item.label : undefined}
                    aria-label={item.label}
                  >
                    <div className="relative shrink-0">
                      <item.icon size={20} />
                      {collapsed && item.badge && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: item.badge.color }} />
                      )}
                    </div>
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.badge.bg, color: item.badge.color, lineHeight: 1 }}>
                            {item.badge.text}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-2" style={{ borderTop: "1px solid var(--border-default)" }}>
        {/* Settings */}
        {(() => {
          const active = location.pathname === "/configuracoes";
          return (
            <Link
              to="/configuracoes"
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-sm transition-all duration-150 ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-[10px]"}`}
              style={{
                backgroundColor: active ? "rgba(5,89,181,0.12)" : "transparent",
                color: active ? "var(--ds-blue)" : "var(--text-tertiary)",
                fontSize: "14px",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}}
              title={collapsed ? "Configurações" : undefined}
              aria-label="Configurações"
            >
              <Settings size={20} className="shrink-0" />
              {!collapsed && <span>Configurações</span>}
            </Link>
          );
        })()}

        {/* User */}
        <div className={`flex items-center gap-2.5 rounded-sm py-2 mt-1 ${collapsed ? "justify-center px-2" : "px-3"}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-medium text-white" style={{ backgroundColor: "var(--ds-blue)" }}>
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{user?.name}</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-tertiary)" }}>Plano Fundador</p>
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
      <aside className="hidden lg:flex flex-col shrink-0 transition-all duration-200"
        style={{ width: collapsed ? 64 : 240, backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border-default)" }}>
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
