   import { useCallback, useEffect, useState } from 'react'
import { Calendar, Clock, ExternalLink, Heart, Play, Star, X } from 'lucide-react'
import Poster from './Poster.jsx'
   import YouTubePlayer from './YouTubePlayer.jsx'
   import { useFavorites } from '../context/FavoritesContext.jsx'
   import { getMovieDetails } from '../services/api.js'

const formatRuntime = (min) => (min ? `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, '0')}min` : '—')
const formatDate = (d) => (d ? new Date(`${d}T00:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—')

export default function MovieModal({ movie, onClose }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [details, setDetails] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [trailerLoadError, setTrailerLoadError] = useState(false)
  const handleTrailerError = useCallback(() => setTrailerLoadError(true), [])
  const m = { ...movie, ...(details || {}) }
  const fav = isFavorite(m.id)

  useEffect(() => {
    let cancelled = false
    setDetails(null)
    setPlaying(false)
    setTrailerLoadError(false)
    getMovieDetails(movie.id)
      .then((d) => !cancelled && d && setDetails(d))
      .catch(() => !cancelled && setTrailerLoadError(true))
    return () => { cancelled = true }
  }, [movie.id])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${m.title} trailer oficial`)}`
  const trailerUrl = m.trailerKey && !trailerLoadError
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(m.trailerKey)}`
    : searchUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm animate-fadeIn" onClick={onClose} role="dialog" aria-modal="true" aria-label={m.title}>
      <div className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#131B2E] shadow-2xl shadow-black/60 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 backdrop-blur transition hover:bg-black/80"><X className="h-5 w-5" /></button>
        <div className="grid gap-6 p-5 sm:grid-cols-[240px_1fr] sm:p-8">
          <Poster src={m.poster} alt={`Pôster de ${m.title}`} label={m.title} className="mx-auto aspect-[2/3] w-48 rounded-xl shadow-2xl shadow-black/50 sm:w-full" />
          <div className="min-w-0">
            <h2 className="pr-10 font-display text-3xl font-bold leading-tight">{m.title}</h2>
            {m.originalTitle !== m.title && <p className="mt-1 text-sm italic text-[#94A3B8]">Título original: {m.originalTitle}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#94A3B8]">
              <span className="flex items-center gap-1.5 font-semibold text-amber-400"><Star className="h-4 w-4 fill-amber-400" />{m.rating.toFixed(1)} <span className="font-normal text-[#94A3B8]">TMDB</span></span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{formatRuntime(m.runtime)}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(m.releaseDate)}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {m.genres.map((g) => <span key={g} className="rounded-full border border-white/10 bg-[#1E293B] px-3 py-1 text-xs text-slate-300">{g}</span>)}
            </div>
            <p className="mt-5 leading-relaxed text-slate-300">{m.overview}</p>
            <button onClick={() => toggleFavorite(m)} className={`mt-6 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${fav ? 'border border-amber-400/40 bg-amber-400/10 text-amber-400' : 'bg-amber-500 text-black hover:bg-amber-600'}`}>
              <Heart className={`h-4 w-4 ${fav ? 'fill-amber-400 animate-pop' : ''}`} />{fav ? 'Remover dos favoritos' : 'Favoritar'}
            </button>
          </div>
        </div>
        <div className="px-5 pb-5 sm:px-8 sm:pb-8">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0B0F17] ring-1 ring-white/10">
            {playing && m.trailerKey && !trailerLoadError ? (
              <YouTubePlayer videoKey={m.trailerKey} onError={handleTrailerError} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1E293B] to-[#0B0F17] text-center">
                {m.trailerKey && !trailerLoadError ? (
                  <button onClick={() => setPlaying(true)} className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-black shadow-2xl transition hover:scale-105 hover:bg-amber-600" aria-label="Assistir trailer"><Play className="ml-1 h-7 w-7 fill-black" /></button>
                ) : (
                  <a href={searchUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-600"><ExternalLink className="h-4 w-4" />Buscar trailer no YouTube</a>
                )}
                <p className="text-sm text-[#94A3B8]">
                  {m.trailerKey && !trailerLoadError
                    ? 'Assistir trailer'
                    : trailerLoadError
                      ? 'Não foi possível carregar o trailer'
                      : 'Trailer não encontrado'}
                </p>
              </div>
            )}
          </div>
          <a href={trailerUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#94A3B8] transition hover:text-amber-400">
            <ExternalLink className="h-4 w-4" />Abrir no YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
