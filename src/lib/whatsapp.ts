const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE ?? '573024158002'

export function whatsappUrl(prefill?: string) {
  const base = `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, '')}`
  if (!prefill?.trim()) return base
  return `${base}?text=${encodeURIComponent(prefill)}`
}

export const WHATSAPP_PHONE_DISPLAY = '+57 302 415 8002'
