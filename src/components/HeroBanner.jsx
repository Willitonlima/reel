import { Heart, Info, Star } from 'lucide-react'
import Poster from './Poster.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function HeroBanner({ movie, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(movie.id)
  return (
    <section className="relative h-[68vh] min-h-[460px] w-full overflow-hidden">
      <Poster src={movie.backdrop || movie.poster} alt={movie.title} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/60 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-14 sm:px-8">
        <span className="mb-3 w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">Nº 1 do momento</span>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight drop-shadow-lg sm:text-6xl">{movie.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-[#94A3B8]">
          <span className="flex items-center gap-1 font-semibold text-amber-400"><Star className="h-4 w-4 fill-amber-400" />{movie.rating.toFixed(1)}</span>
          <span>{movie.year}</span>
          {movie.genres[0] && <span>{movie.genres.slice(0, 2).join(' • ')}</span>}
        </div>
        <p className="mt-4 line-clamp-3 max-w-xl text-base text-slate-300">{movie.overview}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => onOpen(movie)} className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-2xl shadow-black/40 transition hover:bg-amber-600">
            <Info className="h-4 w-4" /> Ver Detalhes
          </button>
          <button onClick={() => toggleFavorite(movie)} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
            <Heart className={`h-4 w-4 ${fav ? 'fill-amber-400 text-amber-400 animate-pop' : ''}`} /> {fav ? 'Nos favoritos' : 'Favoritar'}
          </button>
        </div>
      </div>
    </section>
  )
}
