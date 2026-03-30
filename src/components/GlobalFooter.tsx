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
    <footer className="bg-[#0F2B3C] text-white">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-bold text-lg mb-1">Radar OPME</p>
            <p className="text-sm text-white/50 mb-3">by DS Treinamentos</p>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Dados, ferramentas e inteligência para profissionais de OPME-DMI
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Plataforma</p>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/60 hover:text-[#00C2A8] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Ecossistema DS</p>
            <ul className="space-y-2.5">
              {ecosystemLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-[#00C2A8] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Contato</p>
            <ul className="space-y-2.5">
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-[#00C2A8] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>&copy; 2026 DS Treinamentos. Todos os direitos reservados.</p>
          <p>Radar OPME é parte do ecossistema DS Treinamentos</p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
