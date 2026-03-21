import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = ["Funcionalidades", "Ferramentas", "Analytics", "Preço"];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-bold text-lg text-foreground">NewsFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Logar</Link>
          </Button>
          <Button variant="default" size="sm" className="rounded-full" asChild>
            <Link to="/register">Criar conta</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border p-6 space-y-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Logar</Link>
            </Button>
            <Button variant="default" size="sm" className="rounded-full" asChild>
              <Link to="/register">Criar conta</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
