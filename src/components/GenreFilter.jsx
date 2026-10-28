import { GENRES } from '../services/api.js'

export default function GenreFilter({ selected, onSelect }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Gêneros">
      {GENRES.map((g) => {
        const active = selected === g.id
        return (
          <button
            key={g.label}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(g.id)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? 'border-amber-400 bg-amber-500 text-black' : 'border-white/10 bg-[#131B2E] text-[#94A3B8] hover:border-white/25 hover:text-white'}`}
          >
            {g.label}
          </button>
        )
      })}
    </div>
  )
}
