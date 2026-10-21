import { Check, LoaderCircle } from 'lucide-react'
import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { CATEGORIES, isCategory, type Category } from '../../lib/categories.ts'
import { submitInterest, type InterestRegistration } from '../../lib/submitInterest.ts'
import type { SentRegistration } from './types.ts'

interface FormValues {
    nombre: string
    correo: string
    tipo: Category | ''
    mensaje: string
    autorizo: boolean
}

type FormErrors = { [K in keyof FormValues]?: string | undefined }

type Status = 'idle' | 'sending' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: FormValues): FormErrors {
    const errors: FormErrors = {}
    if (values.nombre.trim().length < 3) {
        errors.nombre = 'Escribe un nombre (ficticio) de al menos 3 letras.'
    }
    if (!EMAIL_RE.test(values.correo.trim())) {
        errors.correo = 'Revisa el correo: debe tener el formato nombre@dominio.com.'
    }
    if (values.tipo === '') errors.tipo = 'Elige el tipo de consulta.'
    if (values.mensaje.trim().length < 5) errors.mensaje = 'Cuéntanos tu consulta en unas palabras.'
    if (!values.autorizo) errors.autorizo = 'Necesitamos tu autorización para registrar los datos.'
    return errors
}

interface RegisterFormProps {
    readonly category: Category | null
    readonly question: string
    readonly onSent: (data: SentRegistration) => void
}

export function RegisterForm({ category, question, onSent }: RegisterFormProps) {
    const id = useId()
    const [values, setValues] = useState<FormValues>({
        nombre: '',
        correo: '',
        tipo: category ?? '',
        mensaje: question,
        autorizo: false,
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [status, setStatus] = useState<Status>('idle')

    const clearError = (key: keyof FormValues) => {
        setErrors((current) =>
            current[key] === undefined ? current : { ...current, [key]: undefined },
        )
    }

    const setText =
        (key: 'nombre' | 'correo' | 'mensaje') =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target
            setValues((current) => ({ ...current, [key]: value }))
            clearError(key)
        }

    const setTipo = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (!isCategory(value)) return
        setValues((current) => ({ ...current, tipo: value }))
        clearError('tipo')
    }

    const setAutorizo = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setValues((current) => ({ ...current, autorizo: checked }))
        clearError('autorizo')
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const found = validate(values)
        setErrors(found)
        if (Object.values(found).some(Boolean) || values.tipo === '') {
            requestAnimationFrame(() => {
                form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
            })
            return
        }

        setStatus('sending')
        const data: InterestRegistration = {
            nombre: values.nombre.trim(),
            correo: values.correo.trim(),
            tipo: values.tipo,
            mensaje: values.mensaje.trim(),
        }
        try {
            const result = await submitInterest(data)
            onSent({ ...data, ...result })
        } catch {
            setStatus('error')
        }
    }

    const sending = status === 'sending'
    const errorId = (key: keyof FormValues) => (errors[key] ? `${id}-${key}-error` : undefined)

    return (
        <form
            className="reg"
            onSubmit={(event) => void handleSubmit(event)}
            noValidate
            aria-busy={sending}
        >
            <div className="reg-title">
                <strong>Registro de interesado</strong>
                <span>Usa datos ficticios para la prueba</span>
            </div>

            <div className="field">
                <label htmlFor={`${id}-nombre`}>Nombre</label>
                <input
                    id={`${id}-nombre`}
                    value={values.nombre}
                    onChange={setText('nombre')}
                    autoComplete="off"
                    placeholder="Ej. Ana Torres (ficticio)"
                    aria-invalid={Boolean(errors.nombre)}
                    aria-describedby={errorId('nombre')}
                    disabled={sending}
                />
                {errors.nombre && (
                    <p className="field-error" id={`${id}-nombre-error`}>
                        {errors.nombre}
                    </p>
                )}
            </div>

            <div className="field">
                <label htmlFor={`${id}-correo`}>Correo de prueba</label>
                <input
                    id={`${id}-correo`}
                    type="email"
                    inputMode="email"
                    value={values.correo}
                    onChange={setText('correo')}
                    autoComplete="off"
                    placeholder="ana.prueba@correo.com"
                    aria-invalid={Boolean(errors.correo)}
                    aria-describedby={errorId('correo')}
                    disabled={sending}
                />
                {errors.correo && (
                    <p className="field-error" id={`${id}-correo-error`}>
                        {errors.correo}
                    </p>
                )}
            </div>

            <fieldset className="field" aria-invalid={Boolean(errors.tipo)}>
                <legend>Tipo de consulta</legend>
                <div className="seg">
                    {CATEGORIES.map((cat) => (
                        <label key={cat} className="seg-opt" data-cat={cat}>
                            <input
                                type="radio"
                                name={`${id}-tipo`}
                                value={cat}
                                checked={values.tipo === cat}
                                onChange={setTipo}
                                disabled={sending}
                            />
                            <span>
                                <i aria-hidden="true" />
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
                {category !== null && values.tipo === category && (
                    <p className="field-hint">Detectado por el asistente. Puedes cambiarlo.</p>
                )}
                {errors.tipo && <p className="field-error">{errors.tipo}</p>}
            </fieldset>

            <div className="field">
                <label htmlFor={`${id}-mensaje`}>Mensaje</label>
                <textarea
                    id={`${id}-mensaje`}
                    rows={3}
                    value={values.mensaje}
                    onChange={setText('mensaje')}
                    aria-invalid={Boolean(errors.mensaje)}
                    aria-describedby={errorId('mensaje')}
                    disabled={sending}
                    maxLength={500}
                />
                {errors.mensaje && (
                    <p className="field-error" id={`${id}-mensaje-error`}>
                        {errors.mensaje}
                    </p>
                )}
            </div>

            <label className="consent" data-invalid={Boolean(errors.autorizo)}>
                <input
                    type="checkbox"
                    checked={values.autorizo}
                    onChange={setAutorizo}
                    disabled={sending}
                    aria-invalid={Boolean(errors.autorizo)}
                />
                <span className="consent-box" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                </span>
                <span>Autorizo el registro de mis datos para fines académicos.</span>
            </label>
            {errors.autorizo && <p className="field-error">{errors.autorizo}</p>}

            {status === 'error' && (
                <p className="form-error" role="alert">
                    No se pudo enviar. Revisa tu conexión a internet e inténtalo otra vez.
                </p>
            )}

            <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
                {sending ? (
                    <>
                        <LoaderCircle className="spin" size={18} strokeWidth={2.25} /> Enviando…
                    </>
                ) : (
                    'Registrar mi interés'
                )}
            </button>
        </form>
    )
}
