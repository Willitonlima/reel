import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar filmes…"
        aria-label="Buscar filmes"
        className="w-full rounded-full border border-white/10 bg-[#131B2E] py-2.5 pl-10 pr-10 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
      />
      {value && (
        <button onClick={() => onChange('')} aria-label="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#94A3B8] hover:text-white">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
