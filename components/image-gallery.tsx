"use client"

import Image from "next/image"
import { useState } from "react"

const images = [
  {
    src: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona entrenando con intensidad",
    title: "MOVETE Y DESCARGÁ",
  },
  {
    src: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Entrenador guiando a un alumno",
    title: "TE SEGUIMOS EN TODO MOMENTO",
  },
  {
    src: "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Grupo entrenando junto con energía",
    title: "VIBRÁ CON GENTE DE BUENA ENERGÍA",
  },
  {
    src: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Atleta superando sus límites",
    title: "SUPERÁ TUS LÍMITES",
  },
]

export function ImageGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            Instalaciones pensadas para que entrenés en serio, con la gente y el ambiente que necesitás.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-[16/10]'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-700 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-90' : 'opacity-60'}`} />
              <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 ${hoveredIndex === index ? 'border-[#7B00FF] shadow-[inset_0_0_30px_rgba(123,0,255,0.2)]' : 'border-transparent'}`} />
              <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground uppercase" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}>
                  {image.title}
                </h3>
                <div className={`h-1 rounded-full mt-3 transition-all duration-500 ${hoveredIndex === index ? 'w-24 bg-[#C8FF00]' : 'w-12 bg-[#7B00FF]'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
