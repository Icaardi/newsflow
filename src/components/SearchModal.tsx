import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BarChart3, Stethoscope, FileText, Layers } from "lucide-react";

/* Search data — same source as PriceDashboard & Procedures */
const devices = [
  { id: 1, name: "Stent farmacológico (DES)", category: "Stents Coronários" },
  { id: 2, name: "Stent convencional (BMS)", category: "Stents Coronários" },
  { id: 3, name: "Prótese total cimentada", category: "Próteses de Quadril" },
  { id: 4, name: "Prótese total não-cimentada", category: "Próteses de Quadril" },
  { id: 5, name: "Prótese total primária", category: "Próteses de Joelho" },
  { id: 6, name: "Prótese unicompartimental", category: "Próteses de Joelho" },
  { id: 7, name: "Marcapasso bicameral", category: "Marcapassos" },
  { id: 8, name: "Marcapasso unicameral", category: "Marcapassos" },
  { id: 9, name: "Parafuso pedicular (unidade)", category: "Fixadores de Coluna" },
  { id: 10, name: "Cage intervertebral PEEK", category: "Fixadores de Coluna" },
  { id: 11, name: "Haste de fixação (par)", category: "Fixadores de Coluna" },
  { id: 12, name: "Tela de polipropileno (hérnia)", category: "Telas e Membranas" },
  { id: 13, name: "Tela biológica", category: "Telas e Membranas" },
];

const procedures = [
  { name: "Angioplastia coronária com stent", path: "/procedimentos" },
  { name: "Artroplastia total de quadril", path: "/procedimentos" },
  { name: "Artrodese de coluna lombar", path: "/procedimentos" },
  { name: "Artroplastia total de joelho", path: "/procedimentos" },
  { name: "Implante de marcapasso definitivo", path: "/procedimentos" },
];

const categories = [
  "Stents Coronários", "Próteses de Quadril", "Próteses de Joelho",
  "Marcapassos", "Fixadores de Coluna", "Telas e Membranas",
];

const bulletins = [
  { id: "001", title: "RDC 665/2022: O que muda na prática para gestores hospitalares" },
  { id: "002", title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro" },
  { id: "003", title: "Os 5 erros mais comuns em auditorias de OPME" },
  { id: "004", title: "Rastreabilidade digital de DMI: modelo europeu" },
];

interface SearchResult {
  type: "device" | "procedure" | "category" | "bulletin";
  label: string;
  path: string;
  icon: React.ElementType;
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose(); else onClose(); // toggle handled by parent
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const out: SearchResult[] = [];

    for (const d of devices) {
      if (d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)) {
        out.push({ type: "device", label: d.name, path: `/dispositivo/${d.id}`, icon: BarChart3 });
      }
    }
    for (const p of procedures) {
      if (p.name.toLowerCase().includes(q)) {
        out.push({ type: "procedure", label: p.name, path: p.path, icon: Stethoscope });
      }
    }
    for (const c of categories) {
      if (c.toLowerCase().includes(q)) {
        out.push({ type: "category", label: c, path: "/radar", icon: Layers });
      }
    }
    for (const b of bulletins) {
      if (b.title.toLowerCase().includes(q)) {
        out.push({ type: "bulletin", label: b.title, path: `/boletins/${b.id}`, icon: FileText });
      }
    }
    return out.slice(0, 10);
  }, [query]);

  const typeLabels: Record<string, string> = {
    device: "Dispositivos",
    procedure: "Procedimentos",
    category: "Categorias",
    bulletin: "Boletins",
  };

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[560px] overflow-hidden"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: "16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 h-14" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <Search size={18} style={{ color: "var(--text-tertiary)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar dispositivo, procedimento ou boletim..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)" }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "Enter" && results.length > 0) handleSelect(results[0].path);
                }}
              />
              <kbd className="hidden sm:inline text-[10px] font-mono-metric px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)" }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="max-h-[360px] overflow-y-auto py-2">
                {results.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: "var(--text-tertiary)" }}>
                    Nenhum resultado para "{query}"
                  </p>
                ) : (
                  (() => {
                    let lastType = "";
                    return results.map((r, i) => {
                      const showHeader = r.type !== lastType;
                      lastType = r.type;
                      return (
                        <div key={`${r.type}-${i}`}>
                          {showHeader && (
                            <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
                              {typeLabels[r.type]}
                            </p>
                          )}
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
                            style={{ color: "var(--text-primary)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            onClick={() => handleSelect(r.path)}
                          >
                            <r.icon size={16} style={{ color: "var(--ds-blue)" }} />
                            <span className="truncate">{r.label}</span>
                          </button>
                        </div>
                      );
                    });
                  })()
                )}
              </div>
            )}

            {!query.trim() && (
              <div className="py-6 text-center">
                <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                  Digite para buscar dispositivos, procedimentos ou boletins
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
