# 🎬 Reel — Catálogo de Filmes

Catálogo de filmes moderno e imersivo, com visual cinematográfico em Dark Mode inspirado em Letterboxd, Apple TV e HBO Max. Consome a API do TMDB e já abre funcionando em **modo demo** (12 filmes de exemplo) mesmo sem chave configurada.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![TMDB](https://img.shields.io/badge/API-TMDB-01B4E4?logo=themoviedatabase&logoColor=white)
![Lucide](https://img.shields.io/badge/Icons-lucide--react-F59E0B)

## ✨ Recursos

- **Hero Banner dinâmico** com o filme nº 1 da semana, backdrop panorâmico, nota e ações rápidas.
- **Busca com debounce de 400 ms** (hook `useDebounce`) — menos requisições, interface fluida.
- **Filtro por gênero** em pílulas deslizáveis: Todos, Ação, Sci-Fi, Drama, Animação, Comédia.
- **Abas "Catálogo Geral" e "Meus Favoritos"** com contador dinâmico.
- **Grid responsivo**: 1 coluna (mobile), 2 (tablet), 4 (desktop) e 5 (telas grandes).
- **Favoritos com Context API** e persistência automática no `localStorage`.
- **Modal de detalhes**: pôster, título original, duração, data, gêneros, sinopse, nota e trailer (embed do YouTube). Fecha por clique fora, botão `X` ou tecla `ESC`.
- **Skeleton loading**, estado de busca vazia e tratamento de erros de rede com "Tentar novamente".
- **Modo demo automático** quando `VITE_TMDB_API_KEY` não está definida.

## 🗂️ Estrutura

```text
src/
├── components/   Navbar, HeroBanner, SearchBar, GenreFilter, MovieGrid, MovieCard, MovieModal, MovieSkeleton, Poster
├── context/      FavoritesContext.jsx
├── hooks/        useDebounce.js
├── services/     api.js (TMDB + fallback) e mockData.js
├── App.jsx · index.css · main.jsx
```

## 🚀 Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/reel.git
cd reel

# 2. Instale as dependências
npm install

# 3. (Opcional) configure a chave do TMDB
cp .env.example .env

# 4. Rode em desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`. Para gerar a versão de produção: `npm run build` e `npm run preview`.

## 🔑 Como obter a chave gratuita do TMDB

1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/signup).
2. Acesse **Configurações → API** ([link direto](https://www.themoviedb.org/settings/api)) e solicite uma chave (tipo *Developer*, uso pessoal).
3. Copie a **API Key (v3 auth)**.
4. Cole no arquivo `.env`:
   ```env
   VITE_TMDB_API_KEY=sua_chave_aqui
   ```
5. Reinicie o `npm run dev`. O selo **Demo** some da barra de navegação quando a chave é detectada.

> ⚠️ Nunca faça commit do `.env` (já está no `.gitignore`). Como o Vite expõe variáveis `VITE_*` no bundle, para produção considere um proxy/back-end que guarde a chave.

## 🧭 Roadmap

- [ ] Paginação / scroll infinito
- [ ] Ordenação (popularidade, nota, data de lançamento)
- [ ] Página de elenco e equipe, filmes similares
- [ ] Listas personalizadas ("Quero ver", "Já vi") e avaliações próprias
- [ ] Autenticação e sincronização de favoritos na nuvem
- [ ] Rotas com React Router (URL compartilhável por filme)
- [ ] Busca com sugestões e histórico
- [ ] Testes (Vitest + Testing Library) e CI com GitHub Actions
- [ ] Migração para TypeScript e PWA offline

## 📄 Licença

MIT. Dados e imagens fornecidos por [TMDB](https://www.themoviedb.org/) — este produto usa a API do TMDB, mas não é endossado ou certificado por ela.
