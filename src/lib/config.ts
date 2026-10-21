// Conexión con Google Forms → Google Sheets, leída de variables de entorno
// (ver .env.example y GUIA-GOOGLE-FORMS.md). Si falta algún valor o tiene un
// formato inválido, el chatbot funciona en "modo demo" y no envía nada.

export type FormField = 'nombre' | 'correo' | 'tipo' | 'mensaje' | 'autorizacion'

export interface GoogleFormConfig {
    readonly action: string
    readonly fields: Readonly<Record<FormField, string>>
    /** Debe coincidir EXACTAMENTE con el texto de la casilla en el formulario. */
    readonly consentText: string
}

export const CONSENT_TEXT = 'Autorizo el registro de mis datos para fines académicos'

const FORM_ID_RE = /^[\w-]{20,}$/
const ENTRY_RE = /^entry\.\d+$/

function readConfig(env: ImportMetaEnv): GoogleFormConfig | null {
    const formId = env.VITE_GOOGLE_FORM_ID?.trim()
    const fields = {
        nombre: env.VITE_GOOGLE_ENTRY_NOMBRE?.trim(),
        correo: env.VITE_GOOGLE_ENTRY_CORREO?.trim(),
        tipo: env.VITE_GOOGLE_ENTRY_TIPO?.trim(),
        mensaje: env.VITE_GOOGLE_ENTRY_MENSAJE?.trim(),
        autorizacion: env.VITE_GOOGLE_ENTRY_AUTORIZACION?.trim(),
    }

    if (!formId || !FORM_ID_RE.test(formId)) {
        console.warn(
            formId
                ? '[config] Modo demo: VITE_GOOGLE_FORM_ID tiene formato inválido (solo el ID, sin URL ni /viewform).'
                : '[config] Modo demo: VITE_GOOGLE_FORM_ID no llegó al build (¿falta la variable o no se volvió a desplegar?).',
        )
        return null
    }

    const invalid = Object.entries(fields).filter(([, v]) => !v || !ENTRY_RE.test(v))
    if (invalid.length > 0) {
        console.warn(
            `[config] Modo demo: revisa ${invalid.map(([k]) => k).join(', ')} (formato entry.123456).`,
        )
        return null
    }

    return {
        action: `https://docs.google.com/forms/d/e/${formId}/formResponse`,
        fields: fields as Record<FormField, string>,
        consentText: CONSENT_TEXT,
    }
}

export const GOOGLE_FORM = readConfig(import.meta.env)

export const isDemoMode = GOOGLE_FORM === null
