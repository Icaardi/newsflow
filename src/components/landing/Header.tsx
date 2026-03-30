import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Solução", href: "#solucao" },
  { label: "Expert", href: "#expert" },
  { label: "Planos", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16"
      style={{
        background: scrolled ? "var(--surface-glass)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-default)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-lg transition-colors" style={{ color: "var(--text-primary)" }}>
            Radar OPME
          </span>
          <span className="text-xs font-medium transition-colors" style={{ color: "var(--text-tertiary)" }}>
            by DS Treinamentos
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium px-3 py-1.5 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            Entrar
          </Link>
          <Link
            to="/assinar"
            className="text-sm font-semibold px-5 py-1.5 rounded-sm text-white transition-all"
            style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 16px var(--ds-magenta-glow)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
          >
            Assinar
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ color: "var(--text-primary)" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden p-6 space-y-4" style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-default)" }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/login" className="text-sm text-center py-2" style={{ color: "var(--text-secondary)" }}>Entrar</Link>
            <Link to="/assinar" className="text-sm font-semibold text-center py-2 rounded-sm text-white" style={{ backgroundColor: "var(--ds-magenta)" }}>Assinar</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
