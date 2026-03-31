import { Link, useLocation } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";

const titles: Record<string, string> = {
  "/configuracoes": "Configurações",
  "/procedimentos": "Procedimentos e Dispositivos",
};

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Página";

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}
        >
          <Construction size={32} />
        </div>
        <h1 className="font-display text-2xl font-normal mb-2" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Esta funcionalidade está em desenvolvimento
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors"
          style={{ color: "var(--ds-blue)", border: "1px solid rgba(5,89,181,0.3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5,89,181,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <ArrowLeft size={16} /> Voltar ao dashboard
        </Link>
      </div>
    </div>
  );
}
