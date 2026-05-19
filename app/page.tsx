"use client"

import { ProspectForm } from "@/components/prospect-form"
import { ImageGallery } from "@/components/image-gallery"
import { StatsSection } from "@/components/stats-section"
import { AsisLogo } from "@/components/asis-logo"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Instagram, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "#0D0D0D" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(123,0,255,0.2)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AsisLogo className="w-32 h-14" />

          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/asisgym"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-[#8B5CF6] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">@asisgym</span>
            </a>
            <a
              href="https://maps.google.com/?q=Av.Capdevila+2147"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-[#CCFF00] transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Av. Capdevila 2147</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="ÁSIS Gym"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        </div>

        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#8B5CF6]/25 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 -right-48 w-80 h-80 bg-[#CCFF00]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-sm font-semibold text-[#CCFF00] uppercase tracking-wider">
                  DESCUBRÍ TU ENERGÍA
                </span>
              </div>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 uppercase"
                style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
              >
                <span className="text-foreground">SENTIRTE</span>
                <br />
                <span className="text-[#CCFF00]" style={{ textShadow: '0 0 30px rgba(200,255,0,0.4)' }}>MEJOR QUE NUNCA</span>
                <br />
                <span className="text-[#8B5CF6]">DEPENDE DE VOS</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Dejanos tus datos y te contactamos por WhatsApp. <span className="text-white font-semibold">Sin vueltas.</span>
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas)' }}>+6000 PERSONAS</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">NOS ELIGIERON</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#8B5CF6]" style={{ fontFamily: 'var(--font-bebas)' }}>14 AÑOS</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">HACIENDO LO QUE AMAMOS</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas)' }}>250 M2</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Y +40 MÁQUINAS</div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <ProspectForm />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-xs uppercase tracking-widest">Conocenos</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#8B5CF6] to-transparent" />
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#8B5CF6]/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[200px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight text-foreground"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}
          >
            <span className="text-[#8B5CF6]">{'"'}SOMOS FAMILIA</span>
            <br />
            <span className="text-[#CCFF00]" style={{ textShadow: '0 0 30px rgba(200,255,0,0.4)' }}>SOMOS ENERGÍA{'"'}</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#8B5CF6]/50" />
            <AsisLogo className="w-28 h-12" />
            <div className="h-px w-12 bg-[#8B5CF6]/50" />
          </div>
        </div>
      </section>

      <ImageGallery />
      <StatsSection />

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#CCFF00]/10 rounded-full blur-[200px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-6 text-foreground"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}
          >
            ¿QUÉ ESTÁS <span className="text-[#CCFF00]" style={{ textShadow: '0 0 30px rgba(200,255,0,0.4)' }}>ESPERANDO?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Dejá tus datos arriba y uno de nuestros asesores te escribe por WhatsApp. <span className="text-white font-semibold">Hoy mismo.</span>
          </p>
          <ScrollToTopButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-[#8B5CF6]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <AsisLogo className="w-28 h-12" />

            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://www.instagram.com/asisgym" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#8B5CF6] transition-colors">
                <Instagram className="w-4 h-4" />@asisgym
              </a>
              <a href="https://maps.google.com/?q=Av.Capdevila+2147" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#CCFF00] transition-colors">
                <MapPin className="w-4 h-4" />Av. Capdevila 2147
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ASIS GYM.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
