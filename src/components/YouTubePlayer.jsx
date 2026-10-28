import { useEffect, useRef } from 'react'

let youtubeApiPromise

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve, reject) => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.onerror = () => reject(new Error('Não foi possível carregar o player do YouTube.'))
      document.head.appendChild(script)
    })
  }

  return youtubeApiPromise
}

export default function YouTubePlayer({ videoKey, onError }) {
  const playerElement = useRef(null)

  useEffect(() => {
    let cancelled = false
    let player

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !playerElement.current) return
        player = new YT.Player(playerElement.current, {
          width: '100%',
          height: '100%',
          videoId: videoKey,
          playerVars: {
            autoplay: 1,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onError,
          },
        })
      })
      .catch(() => {
        if (!cancelled) onError()
      })

    return () => {
      cancelled = true
      player?.destroy()
    }
  }, [videoKey, onError])

  return (
    <div className="absolute inset-0">
      <div ref={playerElement} className="h-full w-full" />
    </div>
  )
}
