import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import GenreFilter from './components/GenreFilter.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieModal from './components/MovieModal.jsx'
import useDebounce from './hooks/useDebounce.js'
import { useFavorites } from './context/FavoritesContext.jsx'
import { fetchMovies, getTrending } from './services/api.js'

export default function App() {
  const { favorites } = useFavorites()
  const [tab, setTab] = useState('catalog')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(null)
  const [selected, setSelected] = useState(null)
  const [hero, setHero] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const debouncedQuery = useDebounce(query.trim(), 400)

  useEffect(() => {
    getTrending().then(setHero).catch(() => setHero(null))
  }, [reloadKey])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchMovies({ query: debouncedQuery, genreId: genre })
      .then((r) => !cancelled && setMovies(r))
      .catch(() => !cancelled && setError('Verifique sua conexão ou sua chave do TMDB e tente novamente.'))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [debouncedQuery, genre, reloadKey])

  const visibleFavorites = useMemo(() => {
    const q = debouncedQuery.toLowerCase()
    return favorites.filter((m) => (!q || m.title.toLowerCase().includes(q) || m.originalTitle.toLowerCase().includes(q)) && (!genre || m.genreIds.includes(genre)))
  }, [favorites, debouncedQuery, genre])

  const isFav = tab === 'favorites'
  const showHero = !isFav && !debouncedQuery && genre === null && hero

  return (
    <div className="min-h-screen">
      <Navbar query={query} onQueryChange={setQuery} tab={tab} onTabChange={setTab} favoritesCount={favorites.length} />
      {showHero && <HeroBanner movie={hero} onOpen={setSelected} />}
      <main className="mx-auto max-w-[1600px] px-4 pb-20 pt-6 sm:px-8">
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold">{isFav ? 'Meus Favoritos' : debouncedQuery ? `Resultados para “${debouncedQuery}”` : 'Populares agora'}</h2>
          <GenreFilter selected={genre} onSelect={setGenre} />
        </div>
        <MovieGrid
          movies={isFav ? visibleFavorites : movies}
          loading={!isFav && loading}
          error={!isFav ? error : null}
          onRetry={() => setReloadKey((k) => k + 1)}
          onOpen={setSelected}
          isFavoritesTab={isFav}
        />
      </main>
      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
