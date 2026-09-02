'use client'

import { useState } from 'react'
import YouTube from 'react-youtube'

interface VideoPlayerProps {
  youtubeId: string
}

export default function VideoPlayer({ youtubeId }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const option = {
    width: '100%',
    height: '250',
  }

  const Player = () => {
    return (
      <div className="fixed bottom-2 right-2 w-[300px] z-50 bg-[#1e293b] rounded-lg shadow-xl overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-center p-2 bg-[#0f111a]">
          <h3 className="text-sm font-semibold text-white mb-0 mt-0">Trailer</h3>
          <button
            onClick={handleVideoPlayer}
            className="text-white hover:text-red-500 bg-transparent border-none cursor-pointer font-bold px-2"
          >
            X
          </button>
        </div>
        <YouTube
          videoId={youtubeId}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
        />
      </div>
    )
  }

  const ButtonOpenTrailer = () => {
    return (
      <button
        onClick={handleVideoPlayer}
        className="fixed bottom-5 right-5 w-auto bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg rounded-full px-4 py-2 border-none cursor-pointer font-semibold transition-all duration-300 z-50"
      >
        Tonton Trailer
      </button>
    )
  }

  // We fall back to standard CSS since tailwind isn't configured for this project!
  // Wait, I should write standard CSS or inline styles for this project.
  return isOpen ? (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', width: '320px', zIndex: 50, backgroundColor: 'var(--card-bg)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', border: '1px solid var(--card-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', backgroundColor: '#0f111a' }}>
        <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#fff' }}>Trailer</h3>
        <button onClick={handleVideoPlayer} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
      </div>
      <YouTube
        videoId={youtubeId}
        onReady={(event) => event.target.pauseVideo()}
        opts={{ width: '100%', height: '200' }}
      />
    </div>
  ) : (
    <button
      onClick={handleVideoPlayer}
      style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
        backgroundColor: 'var(--primary)', color: '#fff', border: 'none',
        padding: '0.75rem 1.5rem', borderRadius: '999px', cursor: 'pointer',
        fontWeight: 'bold', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
        transition: 'var(--transition)'
      }}
    >
      Tonton Trailer
    </button>
  )
}
