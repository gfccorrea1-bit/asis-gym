import { ProspectForm } from "@/components/prospect-form"
import { ImageGallery } from "@/components/image-gallery"
import { StatsSection } from "@/components/stats-section"
import { AsisLogo } from "@/components/asis-logo"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Instagram, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AsisLogo className="w-10 h-10" />
            <span 
              className="text-xl font-bold text-[#8B5CF6] uppercase tracking-widest hidden sm:block"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              ASIS GYM
            </span>
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

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            poster="https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="https://videos.pexels.com/video-files/4761438/4761438-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 via-transparent to-[#CCFF00]/5" />
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#8B5CF6]/25 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 -right-48 w-80 h-80 bg-[#CCFF00]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Hero Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-8 animate-float">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider">
                  LLENATE DE ENERGÍA!
                </span>
              </div>

              {/* Main Headline */}
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 uppercase"
                style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
              >
                <span className="text-foreground">ESTÁS A</span>
                <br />
                <span className="text-[#CCFF00] text-glow-neon">UN PASO</span>
                <br />
                <span className="text-foreground">DE CAMBIAR</span>
                <br />
                <span className="text-[#8B5CF6] text-glow-violet">TU VIDA</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Sumate a la familia <span className="text-[#8B5CF6] font-semibold">ASIS GYM</span>. 
                Dejanos tus datos y te contactamos por WhatsApp a la brevedad. Sentirte bien depende de vos!.
              </p>

              {/* Stats Preview */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10">
                <div className="text-center">
                  <div 
                    className="text-4xl md:text-5xl font-bold text-[#CCFF00]" 
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    TE ACOMPAÑAMOS
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">DE VERDAD</div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-4xl md:text-5xl font-bold text-[#8B5CF6]" 
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    +40
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">MÁQUINAS</div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-4xl md:text-5xl font-bold text-[#CCFF00]" 
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    100%
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Compromiso</div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <ProspectForm />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-xs uppercase tracking-widest">Conocenos</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#8B5CF6] to-transparent" />
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#8B5CF6]/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[200px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight text-foreground"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}
          >
            <span className="text-[#8B5CF6]">{'"'}SI DUELE,</span>
            <br />
            <span className="text-[#CCFF00] text-glow-neon">ESTÁS CRECIENDO{'"'}</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#8B5CF6]/50" />
            <AsisLogo className="w-8 h-8" />
            <div className="h-px w-12 bg-[#8B5CF6]/50" />
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

      {/* Stats Section */}
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
            NO TE FALTA <span className="text-[#CCFF00] text-glow-neon">MOTIVACIÓN</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Te falta hacer que volver al gym sea más fácil. Dejá tus datos arriba y empezá hoy.
          </p>
          <ScrollToTopButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-[#8B5CF6]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <AsisLogo className="w-8 h-8" />
              <span 
                className="text-xl font-bold text-[#8B5CF6] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                ASIS GYM
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a 
                href="https://www.instagram.com/asisgym" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#8B5CF6] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @asisgym
              </a>
              <a 
                href="https://maps.google.com/?q=Av.Capdevila+2147" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#CCFF00] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Av. Capdevila 2147
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {"© "}{new Date().getFullYear()}{" ASIS GYM. Todos los derechos reservados."}
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
