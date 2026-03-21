import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, PenSquare, Sparkles, FileText, Users,
  DollarSign, Settings, ChevronLeft, Bell, Plus, LogOut, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Editor", icon: PenSquare, path: "/dashboard/editor" },
  { label: "Assistente IA", icon: Sparkles, path: "/dashboard/ai" },
  { label: "Edições", icon: FileText, path: "/dashboard/editions" },
  { label: "Assinantes", icon: Users, path: "/dashboard/subscribers" },
  { label: "Financeiro", icon: DollarSign, path: "/dashboard/financial" },
  { label: "Configurações", icon: Settings, path: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {!collapsed && <span className="font-bold text-sidebar-foreground">NewsFlow</span>}
          {collapsed && <span className="font-bold text-sidebar-foreground text-sm">NF</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-sidebar-primary text-sidebar-foreground border-l-[3px] border-sidebar-accent"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-primary/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon size={20} className={active ? "text-accent" : ""} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <span className="text-accent text-sm font-bold">LA</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Leonardo Augusto</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">leo@newsflow.com</p>
            </div>
          )}
          {!collapsed && (
            <Link to="/login" className="text-sidebar-foreground/50 hover:text-sidebar-foreground">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside
        className={`hidden lg:flex flex-col bg-sidebar transition-all duration-300 border-r border-sidebar-border ${
          collapsed ? "w-[72px]" : "w-60"
        }`}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar flex flex-col animate-slide-up border-r border-sidebar-border">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground">
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" asChild>
              <Link to="/dashboard/editor">
                <Plus size={16} />
                <span className="hidden sm:inline">Nova edição</span>
              </Link>
            </Button>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
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
