"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    prefix: "+",
    value: 6000,
    suffix: "",
    label: "personas nos eligieron",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    prefix: "",
    value: 14,
    suffix: " años",
    label: "haciendo lo que amamos",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" fill="#7B00FF" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    prefix: "100%",
    value: null,
    suffix: "",
    label: "buena energía",
  },
]

function AnimatedNumber({ value, prefix, suffix }: { value: number | null; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (value === null) return
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

  if (value === null) {
    return (
      <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas)' }}>
        {prefix}
      </div>
    )
  }

  return (
    <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas)' }}>
      {prefix}{value === 0 ? count.toLocaleString("es-AR") : count.toLocaleString("es-AR")}{suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#8B5CF6]/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent" />
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
            <span className="text-[#8B5CF6]">HABLAN</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sumate a la familia <strong className="text-[#8B5CF6]">ÁSIS</strong>. Dejanos tus datos y nos comunicamos con vos a la brevedad por WhatsApp. <strong className="text-white">Sentirte bien depende de vos.</strong>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group text-center p-6 md:p-8 rounded-2xl bg-background/50 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8B5CF6]/20 transition-all duration-500">
                {stat.icon}
              </div>
              <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="mt-2 text-sm md:text-base text-muted-foreground tracking-wide font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8B5CF6] text-white font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:bg-[#7C3AED] transition-all duration-300"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
          >
            SUMATE A ÁSIS
          </a>
        </div>
      </div>
    </section>
  )
}
