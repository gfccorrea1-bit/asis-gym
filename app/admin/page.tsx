"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const ADMIN_PASSWORD = "Aztek2029arg$$ie!"

type Prospecto = {
  id: string
  nombre_apellido: string
  telefono: string
  como_nos_conociste: string
  fecha_registro: string
  contactado: boolean
  vendedor: string
}

const origenLabel: Record<string, string> = {
  por_un_conocido: "👥 Por un conocido",
  vivo_cerca: "📍 Vive cerca",
  redes_sociales: "📱 Redes sociales",
  google_maps: "🗺️ Google Maps",
  ex_cliente: "🔄 Ya fue cliente",
}

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [prospectos, setProspectos] = useState<Prospecto[]>([])
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState<"todos" | "pendientes" | "contactados">("pendientes")
  const [actualizando, setActualizando] = useState<string | null>(null)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAutenticado(true)
      setError("")
    } else {
      setError("Contraseña incorrecta")
    }
  }

  const cargarProspectos = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("prospectos")
      .select("*")
      .order("fecha_registro", { ascending: false })

    if (!error && data) setProspectos(data)
    setLoading(false)
  }

  useEffect(() => {
    if (autenticado) cargarProspectos()
  }, [autenticado])

  const marcarContactado = async (id: string, valor: boolean) => {
    setActualizando(id)
    const supabase = createClient()
    await supabase.from("prospectos").update({ contactado: valor }).eq("id", id)
    setProspectos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, contactado: valor } : p))
    )
    setActualizando(null)
  }

  const abrirWhatsApp = (telefono: string, nombre: string) => {
    const numero = telefono.replace(/\D/g, "")
    const mensaje = encodeURIComponent(
      `Hola ${nombre.split(" ")[0]}! Te contactamos desde ÁSIS FITBOX 💪 Vimos que te interesó conocer más sobre el gym. ¿Cuándo podemos charlar?`
    )
    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank")
  }

  const filtrados = prospectos.filter((p) => {
    if (filtro === "pendientes") return !p.contactado
    if (filtro === "contactados") return p.contactado
    return true
  })

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // LOGIN
  if (!autenticado) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans, sans-serif",
      }}>
        <div style={{
          background: "#141414",
          border: "1px solid rgba(123,0,255,0.3)",
          borderRadius: 16,
          padding: "40px 32px",
          width: "100%",
          maxWidth: 380,
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              background: "#7B00FF",
              color: "white",
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 22,
              letterSpacing: 3,
              padding: "6px 16px",
              borderRadius: 8,
              display: "inline-block",
              marginBottom: 8,
            }}>ÁSIS</div>
            <div style={{ color: "#C8FF00", fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>PANEL DE VENDEDORES</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Ingresá la contraseña"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(123,0,255,0.3)",
                borderRadius: 8,
                padding: "10px 14px",
                color: "white",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {error && <div style={{ color: "#FF6B6B", fontSize: 12, marginTop: 6 }}>{error}</div>}
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              background: "#7B00FF",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px",
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 16,
              letterSpacing: 2,
              cursor: "pointer",
            }}
          >
            ENTRAR
          </button>
        </div>
      </div>
    )
  }

  // PANEL

  const exportarCSV = () => {
    const origenTexto: Record<string, string> = {
      por_un_conocido: "Por un conocido",
      vivo_cerca: "Vive cerca",
      redes_sociales: "Redes sociales",
      google_maps: "Google Maps",
      ex_cliente: "Ya fue cliente",
      por_conocido: "Por un conocido",
    }
    const headers = ["NOMBRE", "REGISTRADO", "TELÉFONO", "PROPIETARIO", "ORIGEN"]
    const rows = prospectos.map(p => [
      p.nombre_apellido,
      new Date(p.fecha_registro).toLocaleString("es-AR"),
      p.telefono,
      p.vendedor || "directo",
      origenTexto[p.como_nos_conociste] || p.como_nos_conociste,
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prospectos-asis-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", fontFamily: "DM Sans, sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ background: "#7B00FF", color: "white", fontFamily: "Bebas Neue, sans-serif", fontSize: 20, letterSpacing: 2, padding: "4px 12px", borderRadius: 6 }}>ÁSIS</div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Panel de prospectos</div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 24, color: "#C8FF00" }}>{prospectos.length}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>TOTAL</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 24, color: "#FF6B6B" }}>{prospectos.filter(p => !p.contactado).length}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>PENDIENTES</div>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 24, color: "#4ADE80" }}>{prospectos.filter(p => p.contactado).length}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>CONTACTADOS</div>
            </div>
<button onClick={cargarProspectos} style={{ background: "rgba(123,0,255,0.2)", border: "1px solid rgba(123,0,255,0.4)", color: "#7B00FF", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              ↻ Actualizar
            </button>
            <button onClick={exportarCSV} style={{ background: "rgba(200,255,0,0.15)", border: "1px solid rgba(200,255,0,0.4)", color: "#C8FF00", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              ↓ Exportar CSV
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["pendientes", "todos", "contactados"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                background: filtro === f ? "#7B00FF" : "rgba(255,255,255,0.05)",
                border: `1px solid ${filtro === f ? "#7B00FF" : "rgba(255,255,255,0.12)"}`,
                color: filtro === f ? "white" : "rgba(255,255,255,0.5)",
                borderRadius: 20,
                padding: "6px 16px",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "capitalize",
                letterSpacing: 0.5,
              }}
            >
              {f === "pendientes" ? "🔴 Pendientes" : f === "contactados" ? "✅ Contactados" : "Todos"}
            </button>
          ))}
        </div>

        {/* Tabla */}
        {loading ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: 60 }}>Cargando prospectos...</div>
        ) : filtrados.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 60 }}>No hay prospectos en esta categoría</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtrados.map((p) => (
              <div key={p.id} style={{
                background: "#141414",
                border: `1px solid ${p.contactado ? "rgba(74,222,128,0.2)" : "rgba(123,0,255,0.2)"}`,
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.nombre_apellido}</div>
                  <div style={{ color: "#C8FF00", fontSize: 13, marginBottom: 4 }}>📞 {p.telefono}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{origenLabel[p.como_nos_conociste] || p.como_nos_conociste}</div>
                  <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(123,0,255,0.15)", border: "1px solid rgba(123,0,255,0.3)", borderRadius: 20, padding: "2px 10px" }}>
                    <span style={{ color: "#C8FF00", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>VENDEDOR</span>
                    <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{p.vendedor || "directo"}</span>
                  </div>
                </div>

                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, minWidth: 120, textAlign: "center" }}>
                  {formatFecha(p.fecha_registro)}
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => abrirWhatsApp(p.telefono, p.nombre_apellido)}
                    style={{
                      background: "#25D366",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    💬 WhatsApp
                  </button>

                  <button
                    onClick={() => marcarContactado(p.id, !p.contactado)}
                    disabled={actualizando === p.id}
                    style={{
                      background: p.contactado ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${p.contactado ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.15)"}`,
                      color: p.contactado ? "#4ADE80" : "rgba(255,255,255,0.5)",
                      borderRadius: 8,
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                      minWidth: 120,
                    }}
                  >
                    {actualizando === p.id ? "..." : p.contactado ? "✅ Contactado" : "Marcar contactado"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
