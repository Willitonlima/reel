import { Heart, Star } from 'lucide-react'
import Poster from './Poster.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function MovieCard({ movie, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(movie.id)
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(movie)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(movie))}
      className="group mx-auto w-full max-w-sm cursor-pointer outline-none sm:max-w-none"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#131B2E] shadow-2xl shadow-black/40 ring-1 ring-white/5 transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus-visible:ring-2 group-focus-visible:ring-amber-400">
        <Poster src={movie.poster} alt={`Pôster de ${movie.title}`} label={movie.title} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-amber-400 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400" />{movie.rating.toFixed(1)}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(movie) }}
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={fav}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 backdrop-blur transition hover:bg-black/80"
        >
          <Heart key={String(fav)} className={`h-4 w-4 transition-colors ${fav ? 'fill-amber-400 text-amber-400 animate-pop' : 'text-white'}`} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">{movie.title}</h3>
          <p className="mt-0.5 text-xs text-[#94A3B8]">{movie.year}{movie.genres[0] ? ` • ${movie.genres[0]}` : ''}</p>
        </div>
      </div>
    </article>
  )
}
