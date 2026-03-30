import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Stethoscope, ClipboardCheck, FileText,
  Settings, ChevronLeft, Bell, Plus, LogOut, Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Radar de Preços", icon: BarChart3, path: "/radar" },
  { label: "Procedimentos", icon: Stethoscope, path: "/procedimentos" },
  { label: "Ferramentas", icon: ClipboardCheck, path: "/ferramentas" },
  { label: "Boletins", icon: FileText, path: "/boletins" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = user?.name ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "U";

  const SidebarContent = () => (
    <>
      <div className="p-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {!collapsed && (
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>Radar OPME</span>
          )}
          {collapsed && (
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>RO</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex transition-colors"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
        >
          <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: active ? "rgba(5, 89, 181, 0.15)" : "transparent",
                color: active ? "var(--ds-blue)" : "var(--text-tertiary)",
                borderLeft: active ? "3px solid var(--ds-blue)" : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-tertiary)";
                }
              }}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(5, 89, 181, 0.15)", color: "var(--ds-blue)" }}
          >
            <span className="text-sm font-bold">{initials}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{user?.name || "Usuário"}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-tertiary)" }}>{user?.email || ""}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-300 ${collapsed ? "w-[72px]" : "w-60"}`}
        style={{ backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border-default)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 flex flex-col"
            style={{ backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border-default)" }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 flex items-center justify-between px-6 shrink-0"
          style={{
            background: "var(--surface-glass)",
            backdropFilter: "blur(20px) saturate(1.5)",
            borderBottom: "1px solid var(--border-default)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
              style={{ color: "var(--text-secondary)" }}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/radar"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-medium text-white transition-all"
              style={{ backgroundColor: "var(--ds-blue)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-blue-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-blue)"; }}
            >
              <Plus size={16} />
              Novo Relatório
            </Link>
            <button
              className="relative transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <Bell size={20} />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: "var(--ds-magenta)" }}
              >
                3
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
