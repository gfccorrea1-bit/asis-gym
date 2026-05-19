"use client"

import { useState, useRef } from "react"

const videos = [
  {
    id: "4944394",
    title: "MOVETE Y DESCARGÁ",
    poster: "https://images.pexels.com/videos/4944394/pictures/preview-0.jpg",
  },
  {
    id: "4367572",
    title: "TE SEGUIMOS EN TODO MOMENTO",
    poster: "https://images.pexels.com/videos/4367572/pictures/preview-0.jpg",
  },
  {
    id: "3694919",
    title: "VIBRÁ CON GENTE DE BUENA ENERGÍA",
    poster: "https://images.pexels.com/videos/3694919/pictures/preview-0.jpg",
  },
  {
    id: "18941351",
    title: "SUPERÁ TUS LÍMITES",
    poster: "https://images.pexels.com/videos/18941351/pictures/preview-0.jpg",
  },
]

function VideoCard({ video, large }: { video: typeof videos[0]; large?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${large ? "aspect-[4/5] md:aspect-auto md:row-span-2" : "aspect-[16/10]"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={video.poster}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? "scale-110" : "scale-100"}`}
      >
        <source
          src={`https://videos.pexels.com/video-files/${video.id}/${video.id}-hd_1920_1080_25fps.mp4`}
          type="video/mp4"
        />
        <source
          src={`https://videos.pexels.com/video-files/${video.id}/${video.id}-hd_1280_720_25fps.mp4`}
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${hovered ? "opacity-80" : "opacity-60"}`} />

      {/* Border glow on hover */}
      <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 ${hovered ? "border-[#7B00FF] shadow-[inset_0_0_30px_rgba(123,0,255,0.2)]" : "border-transparent"}`} />

      {/* Play indicator */}
      <div className={`absolute top-4 right-4 transition-all duration-300 ${hovered ? "opacity-0" : "opacity-60"}`}>
        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 ${hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-85"}`}>
        <h3
          className="text-xl md:text-3xl font-bold text-white uppercase"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
        >
          {video.title}
        </h3>
        <div className={`h-1 rounded-full mt-3 transition-all duration-500 ${hovered ? "w-24 bg-[#C8FF00]" : "w-12 bg-[#7B00FF]"}`} />
      </div>
    </div>
  )
}

export function ImageGallery() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            <span className="text-foreground">EL LUGAR</span>{" "}
            <span className="text-[#8B5CF6]">ES ESTE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pasá el mouse por cada video y conocé lo que te espera en ÁSIS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} large={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
