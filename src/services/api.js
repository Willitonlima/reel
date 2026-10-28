import { mockMovies } from './mockData.js'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p/'

export const isDemoMode = !API_KEY

export const GENRES = [
  { id: null, label: 'Todos' },
  { id: 28, label: 'Ação' },
  { id: 878, label: 'Sci-Fi' },
  { id: 18, label: 'Drama' },
  { id: 16, label: 'Animação' },
  { id: 35, label: 'Comédia' },
]

const GENRE_NAMES = {
  28: 'Ação', 12: 'Aventura', 16: 'Animação', 35: 'Comédia', 80: 'Crime', 99: 'Documentário', 18: 'Drama',
  10751: 'Família', 14: 'Fantasia', 36: 'História', 27: 'Terror', 10402: 'Música', 9648: 'Mistério',
  10749: 'Romance', 878: 'Sci-Fi', 10770: 'Cinema TV', 53: 'Suspense', 10752: 'Guerra', 37: 'Faroeste',
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export function normalizeMovie(m) {
  const genreIds = m.genre_ids || (m.genres || []).map((g) => g.id)
  return {
    id: m.id,
    title: m.title,
    originalTitle: m.original_title || m.title,
    overview: m.overview || 'Sinopse indisponível.',
    poster: m.poster_path ? `${IMG}w500${m.poster_path}` : null,
    backdrop: m.backdrop_path ? `${IMG}w1280${m.backdrop_path}` : null,
    rating: m.vote_average || 0,
    releaseDate: m.release_date || '',
    year: m.release_date ? m.release_date.slice(0, 4) : '—',
    genreIds,
    genres: (m.genres?.map((g) => g.name)) || genreIds.map((id) => GENRE_NAMES[id]).filter(Boolean),
    runtime: m.runtime || null,
    trailerKey: null,
  }
}

async function request(path, params = {}) {
  const qs = new URLSearchParams({ api_key: API_KEY, language: 'pt-BR', ...params })
  const res = await fetch(`${BASE_URL}${path}?${qs}`)
  if (!res.ok) throw new Error(`TMDB respondeu com status ${res.status}`)
  return res.json()
}

export async function fetchMovies({ query = '', genreId = null } = {}) {
  if (isDemoMode) {
    await wait(500)
    const q = query.toLowerCase()
    return mockMovies
      .map(normalizeMovie)
      .filter((m) => (!q || m.title.toLowerCase().includes(q) || m.originalTitle.toLowerCase().includes(q)) && (!genreId || m.genreIds.includes(genreId)))
  }
  let data
  if (query) data = await request('/search/movie', { query, include_adult: 'false' })
  else if (genreId) data = await request('/discover/movie', { with_genres: genreId, sort_by: 'popularity.desc' })
  else data = await request('/movie/popular')
  const list = data.results.map(normalizeMovie)
  return query && genreId ? list.filter((m) => m.genreIds.includes(genreId)) : list
}

export async function getTrending() {
  if (isDemoMode) return normalizeMovie(mockMovies[0])
  const data = await request('/trending/movie/week')
  const top = data.results.find((m) => m.backdrop_path) || data.results[0]
  return top ? normalizeMovie(top) : null
}

export async function getMovieDetails(id) {
  if (isDemoMode) {
    const m = mockMovies.find((x) => x.id === id)
    return m ? normalizeMovie(m) : null
  }
  const data = await request(`/movie/${id}`, { append_to_response: 'videos' })
  const movie = normalizeMovie(data)
  const youtubeVideos = data.videos?.results?.filter((v) => v.site === 'YouTube' && v.key) || []
  const trailer = youtubeVideos.find((v) => v.type === 'Trailer' && v.official)
    || youtubeVideos.find((v) => v.type === 'Trailer')
    || youtubeVideos.find((v) => v.type === 'Teaser' && v.official)
    || youtubeVideos.find((v) => v.type === 'Teaser')
  return { ...movie, trailerKey: trailer?.key || null }
}
