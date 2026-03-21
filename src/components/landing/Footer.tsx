import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-bold text-lg">NewsFlow</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A primeira plataforma brasileira de newsletters com inteligência artificial.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#funcionalidades" className="hover:text-accent transition-colors">Funcionalidades</a></li>
              <li><a href="#ferramentas" className="hover:text-accent transition-colors">Ferramentas</a></li>
              <li><a href="#analytics" className="hover:text-accent transition-colors">Analytics</a></li>
              <li><a href="#preço" className="hover:text-accent transition-colors">Preço</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 NewsFlow. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5 text-xs bg-card px-3 py-1.5 rounded-full border border-border">
            🇧🇷 Feito no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
