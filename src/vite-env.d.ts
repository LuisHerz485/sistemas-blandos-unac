/// <reference types="vite/client" />

// Variables públicas (se incrustan en el bundle). No guardes secretos aquí.
interface ImportMetaEnv {
    readonly VITE_GOOGLE_FORM_ID?: string
    readonly VITE_GOOGLE_ENTRY_NOMBRE?: string
    readonly VITE_GOOGLE_ENTRY_CORREO?: string
    readonly VITE_GOOGLE_ENTRY_TIPO?: string
    readonly VITE_GOOGLE_ENTRY_MENSAJE?: string
    readonly VITE_GOOGLE_ENTRY_AUTORIZACION?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
