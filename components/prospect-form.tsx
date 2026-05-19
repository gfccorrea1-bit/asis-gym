"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, Loader2, Zap } from "lucide-react"

const referralOptions = [
  { value: "por_conocido", label: "Por un conocido" },
  { value: "vivo_cerca", label: "Vivo cerca y conozco el gym" },
  { value: "redes_sociales", label: "Por redes sociales" },
  { value: "google_maps", label: "Google Maps" },
  { value: "ex_cliente", label: "Ya fui cliente antes" },
]

function ProspectFormInner() {
  const searchParams = useSearchParams()
  const vendedor = searchParams.get("ref") || "directo"

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre_apellido: "",
    telefono: "",
    como_nos_conociste: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!formData.nombre_apellido || !formData.telefono || !formData.como_nos_conociste) {
      setError("Por favor completá todos los campos")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: insertError } = await supabase
        .from("prospectos")
        .insert([{ ...formData, vendedor }])

      if (insertError) throw insertError
      setIsSuccess(true)
    } catch (err) {
      console.error("Error al registrar:", err)
      setError("Hubo un error al enviar tus datos. Por favor intentá de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="glass rounded-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 
          className="text-3xl md:text-4xl font-bold mb-4 text-primary text-glow-neon uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          GRACIAS POR TU TIEMPO!
        </h3>
        <p className="text-lg text-muted-foreground mb-2">
          En breve nos comunicamos con vos!
        </p>
        <p className="text-2xl font-bold text-foreground">
          Estás a un paso de tu mejor decisión
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Completá tus datos</span>
        </div>
        <h3 
          className="text-2xl md:text-3xl font-bold text-foreground uppercase"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
        >
          EMPEZÁ HOY MISMO
        </h3>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="nombre" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Nombre y Apellido
        </Label>
        <Input
          id="nombre"
          placeholder="Tu nombre completo"
          value={formData.nombre_apellido}
          onChange={(e) => setFormData({ ...formData, nombre_apellido: e.target.value })}
          required
          className="h-14 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/30 text-lg placeholder:text-muted-foreground/50 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Teléfono / WhatsApp
        </Label>
        <Input
          id="telefono"
          type="tel"
          placeholder="Ej: 11 1234-5678"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          required
          className="h-14 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/30 text-lg placeholder:text-muted-foreground/50 rounded-xl"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          ¿Cómo nos conociste?
        </Label>
        <RadioGroup
          value={formData.como_nos_conociste}
          onValueChange={(value) => setFormData({ ...formData, como_nos_conociste: value })}
          className="grid gap-3"
        >
          {referralOptions.map((option) => (
            <label
              key={option.value}
              className={`
                flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300
                border border-border/50 bg-background/30
                hover:border-primary/50 hover:bg-primary/5
                ${formData.como_nos_conociste === option.value 
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(200,255,0,0.15)]" 
                  : ""
                }
              `}
            >
              <RadioGroupItem 
                value={option.value} 
                id={option.value}
                className="border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="text-foreground font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !formData.como_nos_conociste}
        className="w-full h-16 text-xl font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,255,0,0.4)] disabled:opacity-50 uppercase tracking-wider"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ENVIANDO...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-6 w-6" />
            QUIERO EMPEZAR
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Te contactaremos por WhatsApp para coordinar tu visita
      </p>
    </form>
  )
}

export function ProspectForm() {
  return (
    <Suspense fallback={
      <div className="glass rounded-2xl p-6 md:p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/2 mx-auto" />
          <div className="h-14 bg-white/10 rounded-xl" />
          <div className="h-14 bg-white/10 rounded-xl" />
          <div className="h-40 bg-white/10 rounded-xl" />
          <div className="h-16 bg-white/10 rounded-xl" />
        </div>
      </div>
    }>
      <ProspectFormInner />
    </Suspense>
  )
}
