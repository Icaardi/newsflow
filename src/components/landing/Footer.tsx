import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ backgroundColor: "#080C15", borderTop: "1px solid var(--border-default)" }} className="py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
        <div>
          <p className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>Radar OPME</p>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>by DS Treinamentos</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {[
            { label: "Radar de Preços", to: "/radar" },
            { label: "Ferramentas", to: "/ferramentas" },
            { label: "Boletins", to: "/boletins" },
            { label: "Assinar", to: "/assinar" },
          ].map((l) => (
            <Link
              key={l.to} to={l.to} className="transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="pt-6 space-y-2" style={{ borderTop: "1px solid var(--border-default)" }}>
        <p className="text-xs text-center" style={{ color: "var(--text-tertiary)" }}>Parte do ecossistema DS: DS Treinamentos &bull; Medical Devices Summit &bull; Radar OPME</p>
        <p className="text-xs text-center" style={{ color: "var(--text-tertiary)", opacity: 0.6 }}>&copy; 2026 DS Treinamentos. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
