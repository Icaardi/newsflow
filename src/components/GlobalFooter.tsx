import { Link } from "react-router-dom";

const platformLinks = [
  { label: "Radar de Preços", path: "/radar" },
  { label: "Ferramentas", path: "/ferramentas" },
  { label: "Boletins", path: "/boletins" },
  { label: "Assinar", path: "/assinar" },
];

const ecosystemLinks = [
  { label: "DS Treinamentos", href: "#" },
  { label: "Medical Devices Summit", href: "#" },
];

const contactLinks = [
  { label: "contato@dstreinamentos.com.br", href: "mailto:contato@dstreinamentos.com.br" },
  { label: "LinkedIn", href: "#" },
];

const GlobalFooter = () => {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#080C15",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
              Radar OPME
            </p>
            <p className="text-sm mb-3" style={{ color: "var(--text-tertiary)" }}>
              by DS Treinamentos
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-tertiary)" }}>
              Dados, ferramentas e inteligência para profissionais de OPME-DMI
            </p>
          </div>

          {/* Platform */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              Plataforma
            </p>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              Ecossistema DS
            </p>
            <ul className="space-y-2.5">
              {ecosystemLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              Contato
            </p>
            <ul className="space-y-2.5">
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "var(--border-default)", color: "var(--text-tertiary)" }}
        >
          <p>&copy; 2026 DS Treinamentos. Todos os direitos reservados.</p>
          <p>Radar OPME é parte do ecossistema DS Treinamentos</p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
