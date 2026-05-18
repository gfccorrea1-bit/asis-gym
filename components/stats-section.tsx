"use client"

import { useEffect, useState, useRef } from "react"
import { Dumbbell, Users, Clock, Trophy } from "lucide-react"

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "MIEMBROS ACTIVOS" },
  { icon: Dumbbell, value: 50, suffix: "+", label: "EQUIPOS DISPONIBLES" },
  { icon: Clock, value: 14, suffix: "hs", label: "HORARIO EXTENDIDO" },
  { icon: Trophy, value: 10, suffix: "+", label: "AÑOS DE EXPERIENCIA" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = value / (duration / 16)
          
          const animate = () => {
            start += increment
            if (start < value) {
              setCount(Math.floor(start))
              requestAnimationFrame(animate)
            } else {
              setCount(value)
            }
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas)' }}>
      {count}{suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#8B5CF6]/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            <span className="text-foreground">NÚMEROS QUE</span>{" "}
            <span className="text-[#8B5CF6] text-glow-violet">HABLAN</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos más que un gimnasio. Somos la familia ASIS, comprometidos con tu transformación.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group text-center p-6 md:p-8 rounded-2xl bg-background/50 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            >
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8B5CF6]/20 transition-all duration-500">
                <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-[#8B5CF6]" />
              </div>
              
              {/* Number */}
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              
              {/* Label */}
              <div className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl text-foreground mb-6">
            ¿Listo para ser parte de la familia?
          </p>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8B5CF6] text-white font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:bg-[#7C3AED] transition-all duration-300"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
          >
            SUMATE A ASIS GYM
          </a>
        </div>
      </div>
    </section>
  )
}
