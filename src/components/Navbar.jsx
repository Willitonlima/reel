import { Clapperboard, Heart } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import { isDemoMode } from '../services/api.js'

export default function Navbar({ query, onQueryChange, tab, onTabChange, favoritesCount }) {
  const tabs = [
    { id: 'catalog', label: 'Catálogo Geral' },
    { id: 'favorites', label: 'Meus Favoritos', count: favoritesCount },
  ]
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0B0F17]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-6 w-6 text-amber-400" />
          <span className="font-display text-xl font-bold tracking-tight">Reel</span>
          {isDemoMode && <span className="ml-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">Demo</span>}
        </div>
        <nav className="order-3 flex w-full gap-1 rounded-full bg-[#131B2E] p-1 sm:order-none sm:w-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition sm:flex-none ${tab === t.id ? 'bg-amber-500 text-black' : 'text-[#94A3B8] hover:text-white'}`}
            >
              {t.id === 'favorites' && <Heart className="h-3.5 w-3.5" />}
              {t.label}
              {t.count !== undefined && (
                <span className={`min-w-5 rounded-full px-1.5 text-xs ${tab === t.id ? 'bg-black/20' : 'bg-white/10'}`}>{t.count}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="ml-auto min-w-[200px] flex-1 sm:max-w-sm">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>
      </div>
    </header>
  )
}
