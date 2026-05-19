"use client"

import Image from "next/image"
import { useState } from "react"

const cards = [
  {
    src: "/images/gallery-movete.jpg",
    alt: "Hombre y mujer entrenando juntos en el gym",
    title: "MOVETE Y DESCARGÁ",
    desc: "Para todas las edades, todos los niveles.",
    accent: "#C8FF00",
  },
  {
    src: "/images/gallery-seguimos.jpg",
    alt: "Entrenadora guiando a una alumna con pesas",
    title: "TE SEGUIMOS EN TODO MOMENTO",
    desc: "Nuestros profes están con vos en cada rep.",
    accent: "#7B00FF",
  },
  {
    src: "/images/gallery-energia.jpg",
    alt: "Personas sonriendo y disfrutando en el gym",
    title: "VIBRÁ CON GENTE DE BUENA ENERGÍA",
    desc: "El ambiente que te hace volver.",
    accent: "#C8FF00",
  },
]

export function ImageGallery() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7B00FF]/8 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            <span className="text-white">EL LUGAR</span>{" "}
            <span className="text-[#7B00FF]">ES ESTE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Más de 14 años siendo el espacio donde la gente de Córdoba entrena de verdad.
          </p>
        </div>

        {/* Cards — 3 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{ aspectRatio: "3/4" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Foto */}
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className={`object-cover transition-transform duration-700 ${hovered === i ? "scale-110" : "scale-100"}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Overlay base siempre visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Overlay de color al hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, ${card.accent}33 0%, transparent 60%)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              {/* Borde luminoso al hover */}
              <div
                className="absolute inset-0 rounded-2xl border-2 transition-all duration-500"
                style={{
                  borderColor: hovered === i ? card.accent : "transparent",
                  boxShadow: hovered === i ? `inset 0 0 30px ${card.accent}22` : "none",
                }}
              />

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Línea acento */}
                <div
                  className="h-0.5 rounded-full mb-4 transition-all duration-500"
                  style={{
                    background: card.accent,
                    width: hovered === i ? "60px" : "30px",
                  }}
                />

                <h3
                  className="text-white uppercase font-bold leading-tight mb-2"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-sm text-white/60 transition-all duration-500"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
