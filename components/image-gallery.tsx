"use client"

import Image from "next/image"
import { useState } from "react"

const images = [
  {
    src: "https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Boxeador entrenando con guantes en el gimnasio",
    title: "ENTRENÁ CON INTENSIDAD",
  },
  {
    src: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Entrenamiento funcional con pesas",
    title: "SUPERÁ TUS LÍMITES",
  },
  {
    src: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Clase de boxing y fitness",
    title: "FITBOX DE VERDAD",
  },
  {
    src: "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Equipamiento moderno del gimnasio",
    title: "EQUIPAMIENTO PREMIUM",
  },
]

export function ImageGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[200px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            <span className="text-foreground">VIVÍ LA</span>{" "}
            <span className="text-[#8B5CF6] text-glow-violet">EXPERIENCIA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instalaciones de primer nivel, equipamiento moderno y un ambiente que te motiva a dar lo mejor de vos.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                relative group overflow-hidden rounded-2xl cursor-pointer
                ${index === 0 ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-[16/10]'}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`
                  object-cover transition-all duration-700
                  ${hoveredIndex === index ? 'scale-110' : 'scale-100'}
                `}
              />
              
              {/* Overlay */}
              <div className={`
                absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent
                transition-opacity duration-500
                ${hoveredIndex === index ? 'opacity-90' : 'opacity-60'}
              `} />
              
              {/* Colored border on hover */}
              <div className={`
                absolute inset-0 border-2 rounded-2xl transition-all duration-500
                ${hoveredIndex === index 
                  ? 'border-[#8B5CF6] shadow-[inset_0_0_30px_rgba(139,92,246,0.2)]' 
                  : 'border-transparent'
                }
              `} />

              {/* Title */}
              <div className={`
                absolute bottom-0 left-0 right-0 p-6 md:p-8
                transition-all duration-500
                ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}
              `}>
                <h3 
                  className="text-2xl md:text-3xl font-bold text-foreground uppercase"
                  style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
                >
                  {image.title}
                </h3>
                <div className={`
                  h-1 rounded-full mt-3 transition-all duration-500
                  ${hoveredIndex === index ? 'w-24 bg-[#CCFF00]' : 'w-12 bg-[#8B5CF6]'}
                `} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
