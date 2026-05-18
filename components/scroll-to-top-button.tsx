"use client"

export function ScrollToTopButton() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-bold rounded-xl uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:scale-105"
      style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.15em' }}
    >
      Quiero Empezar
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}
