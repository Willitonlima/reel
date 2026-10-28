import { useState } from 'react'
import { Film } from 'lucide-react'

export default function Poster({ src, alt, className = '', label }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1E293B] to-[#131B2E] p-4 text-center text-slate-500 ${className}`}>
        <Film className="h-8 w-8" />
        {label && <span className="font-display text-sm text-slate-400">{label}</span>}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
