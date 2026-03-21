# NewsFlow — Frontend

Interface web da **NewsFlow**, plataforma brasileira de newsletters profissionais com apoio de IA. Este repositório contém apenas o **frontend** (SPA): landing page, fluxos de login/cadastro e painel do expert (dashboard). A integração com API, banco de dados e autenticação real será feita em etapas junto ao backend.

---

## Visão geral

O objetivo deste frontend é oferecer uma base **visual e de navegação** alinhada ao produto: marketing na página inicial, autenticação e área logada com sidebar, métricas e listagens. Os dados exibidos hoje são **estáticos ou mockados**; formulários não chamam API e o login redireciona de forma simplificada para o dashboard.

Outro desenvolvedor (por exemplo, backend) pode usar este README para subir o projeto, entender a stack e saber **onde plugar** chamadas HTTP, sessão e variáveis de ambiente.

---

## Tecnologias

| Área | Tecnologia |
|------|------------|
| Runtime / build | [Node.js](https://nodejs.org/), [Vite 5](https://vitejs.dev/) |
| Linguagem | [TypeScript 5](https://www.typescriptlang.org/) |
| UI | [React 18](https://react.dev/) |
| Roteamento | [React Router 6](https://reactrouter.com/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/), [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| Componentes | [shadcn/ui](https://ui.shadcn.com/) (baseado em [Radix UI](https://www.radix-ui.com/)) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Formulários / validação | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [@hookform/resolvers](https://github.com/react-hook-form/resolvers) |
| Dados assíncronos (preparado) | [TanStack Query (React Query) v5](https://tanstack.com/query) — `QueryClient` já envolve a aplicação em `App.tsx` |
| Gráficos | [Recharts](https://recharts.org/) |
| Animações | [Framer Motion](https://www.framer.com/motion/) |
| Temas (infra) | [next-themes](https://github.com/pacocoursey/next-themes) (presente nas dependências; uso pode ser expandido) |
| Testes unitários | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/react) |
| Testes E2E (configurado) | [Playwright](https://playwright.dev/) — pasta `e2e/` reservada |
| Lint | [ESLint 9](https://eslint.org/) |

**Não incluso ainda (planejado para integração):** cliente HTTP dedicado (p. ex. `fetch` encapsulado ou axios), SDK do **Supabase** para auth — ver secção [Autenticação](#autenticação).

---

## Pré-requisitos

- **Node.js** 18+ (recomendado LTS atual)
- **npm** (vem com o Node)

---

## Instalação e execução

```bash
# Clonar o repositório e entrar na pasta do projeto
cd NewsFlow

# Instalar dependências
npm install

# Ambiente de desenvolvimento (servidor Vite)
npm run dev
```

O app sobe por padrão em **`http://localhost:8080`** (configurado em `vite.config.ts`). O servidor escuta em todas as interfaces (`host: "::"`) para facilitar testes em rede local.

### Outros scripts

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Servir o build localmente para validação |
| `npm run build:dev` | Build em modo `development` |
| `npm run lint` | Executar ESLint |
| `npm test` | Rodar testes unitários (Vitest, uma execução) |
| `npm run test:watch` | Vitest em modo watch |

Testes E2E: `npx playwright test` (requer `npx playwright install` na primeira vez, se ainda não instalou os browsers).

---

## Estrutura de pastas

```
NewsFlow/
├── public/                 # Arquivos estáticos (favicon, robots.txt, etc.)
├── e2e/                    # Testes Playwright (opcional)
├── src/
│   ├── assets/             # Imagens (logo, hero, avatars, depoimentos, …)
│   ├── components/
│   │   ├── dashboard/      # Layout do painel (sidebar, header)
│   │   ├── landing/        # Seções da home (Hero, Pricing, FAQ, …)
│   │   └── ui/             # Componentes shadcn/ui reutilizáveis
│   ├── hooks/              # Hooks React (ex.: toast, mobile)
│   ├── lib/                # Utilitários (ex.: `cn()` para classes Tailwind)
│   ├── pages/              # Páginas por rota (Index, Login, Register, Dashboard, NotFound)
│   ├── test/               # Config e testes Vitest
│   ├── App.tsx             # Rotas e providers (QueryClient, Tooltip, Toasters)
│   ├── main.tsx            # Entrada React
│   └── index.css           # Tokens de design (CSS variables) + Tailwind
├── components.json         # Configuração shadcn/ui
├── tailwind.config.ts
├── vite.config.ts          # Alias `@` → `./src`
└── index.html
```

**Alias de importação:** `@/components/...`, `@/lib/...`, etc., conforme `vite.config.ts` e `tsconfig`.

---

## Estado atual dos dados (mock)

- **Landing (`/`):** textos, depoimentos, preços e métricas de exemplo são **fixos no código** dos componentes em `components/landing/`.
- **Login / Registro:** envio de formulário **não** chama API; o login usa `window.location.href = "/dashboard"` como atalho de desenvolvimento.
- **Dashboard (`/dashboard`):** cards, gráfico (Recharts) e tabela usam **arrays estáticos** definidos em `pages/Dashboard.tsx`.
- **Menu lateral:** aponta para rotas como `/dashboard/editor`, `/dashboard/subscribers`, etc.; **essas rotas ainda não estão declaradas** em `App.tsx` — ao clicar, o utilizador cai em 404 até as páginas e rotas serem criadas.

Qualquer integração com backend deve **substituir** esses mocks por chamadas assíncronas (idealmente via TanStack Query + funções em uma camada `src/api/` ou `src/services/` a criar).

---

## Como integrar o backend

### 1. Variáveis de ambiente

Crie um ficheiro **`.env.local`** (não commitar segredos) na raiz do projeto. O Vite expõe apenas variáveis prefixadas com `VITE_`:

```env
# Exemplo — ajustar ao contrato real da API
VITE_API_BASE_URL=https://api.seudominio.com
```

Aceda no código com `import.meta.env.VITE_API_BASE_URL`.

### 2. Camada de API

Recomenda-se introduzir uma pasta, por exemplo:

- `src/lib/api-client.ts` — instância de `fetch` (ou axios) com `baseURL`, headers e tratamento de erros 401.
- `src/api/` ou `src/services/` — uma função por recurso: `auth.ts`, `newsletters.ts`, `subscribers.ts`, etc.

O **TanStack Query** já está disponível: envolva as chamadas em `useQuery` / `useMutation` e invalide caches após mutações.

### 3. Áreas funcionais (alinhamento com o produto)

| Área | Onde no frontend | Notas de integração |
|------|------------------|---------------------|
| Autenticação | `pages/Login.tsx`, `pages/Register.tsx` | Trocar submit por Supabase Auth ou API; guardar sessão e proteger rotas |
| Dashboard / métricas | `pages/Dashboard.tsx` | Substituir dados mock por endpoints de analytics |
| Editor de newsletter | Rota prevista: `/dashboard/editor` | Criar página + integração WYSIWYG / API de conteúdo |
| Assistente IA | `/dashboard/ai` | Chat ou fluxo de briefing ligado ao backend de IA |
| Edições | `/dashboard/editions` | Lista CRUD de edições |
| Assinantes | `/dashboard/subscribers` | Lista, filtros, export |
| Financeiro | `/dashboard/financial` | Pagamentos, MRR, saques |
| Configurações | `/dashboard/settings` | Dados da newsletter e da conta |

Adicione as rotas em `App.tsx` e, se necessário, um **layout wrapper** com `DashboardLayout` para todas as sub-rotas do painel.

### 4. CORS e proxy em desenvolvimento

Se a API estiver noutro origin, configure CORS no servidor ou use `server.proxy` no `vite.config.ts` durante o dev para redirecionar `/api` para o backend.

---

## Autenticação

A autenticação **ainda não está implementada** no código. A decisão do projeto é utilizar **[Supabase](https://supabase.com/)** para login (e.g. e-mail/senha, OAuth como Google), gestão de sessão e, se aplicável, Row Level Security no Postgres.

Passos típicos no frontend:

1. Instalar `@supabase/supabase-js` e configurar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
2. Criar um cliente Supabase singleton (ex.: `src/lib/supabase.ts`).
3. Substituir o fluxo mock em `Login` / `Register` por `signInWithPassword`, `signUp`, etc.
4. Proteger rotas do dashboard com um componente que verifique a sessão (e redirecione para `/login` se não autenticado).

Até lá, o fluxo atual serve apenas para **demonstração de UI**.

---

## Status do projeto

| Item | Estado |
|------|--------|
| Design system (cores, tipografia, componentes shadcn) | Pronto |
| Landing page e secções de marketing | Pronto |
| Páginas Login e Registro (UI) | Pronto (sem API) |
| Dashboard principal (UI + dados mock) | Pronto |
| Rotas completas do painel (editor, edições, etc.) | Pendente |
| Integração com API / Supabase | Pendente |
| Testes automatizados além do exemplo | Pendente / a expandir |

---

## Desenvolvedor

**Breno Miranda (Icardi)**

---

## Licença

Este repositório é **privado** (`"private": true` no `package.json`). Ajuste a licença conforme a política da equipa ou da empresa.
