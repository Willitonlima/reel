import { CloudOff, Heart, SearchX } from 'lucide-react'
import MovieCard from './MovieCard.jsx'
import MovieSkeleton from './MovieSkeleton.jsx'

function Message({ icon: Icon, title, text, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#131B2E]"><Icon className="h-9 w-9 text-amber-400" /></div>
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-[#94A3B8]">{text}</p>
      {action}
    </div>
  )
}

export default function MovieGrid({ movies, loading, error, onRetry, onOpen, isFavoritesTab }) {
  if (error) {
    return (
      <Message icon={CloudOff} title="Não foi possível carregar os filmes" text={error}
        action={<button onClick={onRetry} className="mt-5 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-600">Tentar novamente</button>} />
    )
  }
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => <MovieSkeleton key={i} />)}
      </div>
    )
  }
  if (!movies.length) {
    return isFavoritesTab
      ? <Message icon={Heart} title="Nenhum favorito por aqui" text="Toque no coração de qualquer filme para guardá-lo na sua lista." />
      : <Message icon={SearchX} title="Nenhum filme encontrado" text="Tente outro título ou limpe os filtros para ver todo o catálogo." />
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      {movies.map((m) => <MovieCard key={m.id} movie={m} onOpen={onOpen} />)}
    </div>
  )
}
