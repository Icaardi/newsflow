import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg text-[#0F2B3C]">Radar OPME</span>
            </div>
            <p className="text-sm text-[#6B7280]">by DS Treinamentos</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#6B7280]">
            <Link to="/radar" className="hover:text-[#00C2A8] transition-colors">Radar de Preços</Link>
            <Link to="/ferramentas" className="hover:text-[#00C2A8] transition-colors">Ferramentas</Link>
            <Link to="/boletins" className="hover:text-[#00C2A8] transition-colors">Boletins</Link>
            <Link to="/assinar" className="hover:text-[#00C2A8] transition-colors">Assinar</Link>
          </nav>
        </div>

        <div className="border-t border-[#E5E7EB] pt-6 space-y-2">
          <p className="text-xs text-[#6B7280]/70 text-center">
            Parte do ecossistema DS: DS Treinamentos &bull; Medical Devices Summit &bull; Radar OPME
          </p>
          <p className="text-xs text-[#6B7280]/50 text-center">
            &copy; 2026 DS Treinamentos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
