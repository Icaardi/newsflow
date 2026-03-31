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

const GlobalFooter = () => (
  <footer className="border-t" style={{ backgroundColor: "#0A1725", borderColor: "rgba(255,255,255,0.08)" }}>
    <div className="max-w-7xl mx-auto px-5 py-14 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-bold text-lg mb-1 text-white">Radar OPME</p>
          <p className="text-sm mb-3 text-white/40">by DS Treinamentos</p>
          <p className="text-sm leading-relaxed max-w-xs text-white/40">Dados, ferramentas e inteligência para profissionais de OPME-DMI</p>
        </div>

        {[
          { title: "Plataforma", links: platformLinks.map((l) => ({ ...l, isLink: true })) },
          { title: "Ecossistema DS", links: ecosystemLinks.map((l) => ({ ...l, path: l.href, isLink: false })) },
          { title: "Contato", links: contactLinks.map((l) => ({ ...l, path: l.href, isLink: false })) },
        ].map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/30">{section.title}</p>
            <ul className="space-y-2.5">
              {section.links.map((l) => (
                <li key={l.label}>
                  {l.isLink ? (
                    <Link to={l.path} className="text-sm text-white/50 hover:text-white/80 transition-colors">{l.label}</Link>
                  ) : (
                    <a href={l.path} className="text-sm text-white/50 hover:text-white/80 transition-colors">{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/25" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p>&copy; 2026 DS Treinamentos. Todos os direitos reservados.</p>
        <p>Radar OPME é parte do ecossistema DS Treinamentos</p>
      </div>
    </div>
  </footer>
);

export default GlobalFooter;
