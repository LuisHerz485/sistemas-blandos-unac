import type { Category } from './categories.ts'
import { GOOGLE_FORM } from './config.ts'

export interface InterestRegistration {
    readonly nombre: string
    readonly correo: string
    readonly tipo: Category
    readonly mensaje: string
}

export interface SubmitResult {
    readonly demo: boolean
    readonly at: Date
}

const TIMEOUT_MS = 10_000

const wait = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms)
    })

/**
 * Envía un registro al formulario de Google. Sheets agrega la "Marca temporal"
 * automáticamente. Google no permite leer la respuesta (no-cors), así que un
 * fetch que no lanza error se considera enviado.
 */
export async function submitInterest(data: InterestRegistration): Promise<SubmitResult> {
    if (GOOGLE_FORM === null) {
        await wait(800)
        console.info('[Modo demo] Registro que se enviaría a Google Forms:', data)
        return { demo: true, at: new Date() }
    }

    const { action, fields, consentText } = GOOGLE_FORM
    const body = new URLSearchParams({
        [fields.nombre]: data.nombre,
        [fields.correo]: data.correo,
        [fields.tipo]: data.tipo,
        [fields.mensaje]: data.mensaje,
        [fields.autorizacion]: consentText,
    })

    await fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    return { demo: false, at: new Date() }
}
