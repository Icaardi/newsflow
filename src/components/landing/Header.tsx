import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E5E7EB] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-bold text-lg transition-colors ${scrolled ? "text-[#0F2B3C]" : "text-white"}`}>
            Radar OPME
          </span>
          <span className={`text-xs font-medium transition-colors ${scrolled ? "text-[#6B7280]" : "text-white/50"}`}>
            by DS Treinamentos
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-[#6B7280] hover:text-[#0F2B3C]" : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={scrolled ? "text-[#6B7280] hover:text-[#0F2B3C]" : "text-white/80 hover:text-white hover:bg-white/10"}
          >
            <Link to="/login">Entrar</Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-[#00C2A8] hover:bg-[#00A892] text-white"
            asChild
          >
            <Link to="/assinar">Assinar</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-[#0F2B3C]" : "text-white"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E7EB] p-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-[#6B7280] hover:text-[#0F2B3C]"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="sm" className="bg-[#00C2A8] hover:bg-[#00A892] text-white" asChild>
              <Link to="/assinar">Assinar</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
