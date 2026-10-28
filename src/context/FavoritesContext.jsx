import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'reel:favorites'

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)) } catch { /* storage indisponível */ }
  }, [favorites])

  const isFavorite = useCallback((id) => favorites.some((m) => m.id === id), [favorites])
  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => (prev.some((m) => m.id === movie.id) ? prev.filter((m) => m.id !== movie.id) : [movie, ...prev]))
  }, [])

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites, isFavorite, toggleFavorite])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>')
  return ctx
}
