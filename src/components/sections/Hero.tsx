import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CATEGORIES } from '../../lib/categories.ts'
import type { ChatCommand } from '../chat/types.ts'

interface HeroProps {
    readonly onCommand: (command: ChatCommand) => void
    /** Avisa si la barra de consulta está en pantalla. */
    readonly onAskVisibilityChange: (visible: boolean) => void
}

export function Hero({ onCommand, onAskVisibilityChange }: HeroProps) {
    const [ask, setAsk] = useState('')
    const askRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const element = askRef.current
        if (!element || !('IntersectionObserver' in window)) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry) onAskVisibilityChange(entry.isIntersecting)
        })
        observer.observe(element)
        return () => {
            observer.disconnect()
        }
    }, [onAskVisibilityChange])

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const text = ask.trim()
        if (!text) return
        onCommand({ type: 'ask', text })
        setAsk('')
    }

    return (
        <section className="hero" id="inicio">
            <div className="wrap hero-grid">
                <div className="hero-copy">
                    <h1>Tu carrera técnica empieza con una pregunta.</h1>
                    <p className="hero-sub">
                        Cinco carreras de 3 años en el Callao, en turnos de mañana, tarde y noche.
                        Pregunta por requisitos, horarios o costos y deja tus datos para que
                        Admisión te contacte.
                    </p>

                    <form className="ask" ref={askRef} onSubmit={submit}>
                        <label htmlFor="ask-input" className="ask-label">
                            Pregunta a Admisión
                        </label>
                        <div className="ask-row">
                            <input
                                id="ask-input"
                                value={ask}
                                onChange={(event) => {
                                    setAsk(event.target.value)
                                }}
                                placeholder="Ej. ¿Qué documentos necesito para postular?"
                                autoComplete="off"
                                maxLength={400}
                            />
                            <button
                                className="send-btn send-btn-lg"
                                type="submit"
                                disabled={!ask.trim()}
                                aria-label="Enviar pregunta"
                            >
                                <ArrowUp size={22} strokeWidth={2.25} />
                            </button>
                        </div>
                        <div className="ask-chips" role="group" aria-label="Temas frecuentes">
                            {CATEGORIES.map((category) => (
                                <button
                                    type="button"
                                    key={category}
                                    className="choice"
                                    data-cat={category}
                                    onClick={() => {
                                        onCommand({ type: 'category', category })
                                    }}
                                >
                                    <i aria-hidden="true" />
                                    {category}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>

                <div className="hero-visual">
                    <img
                        src="/img/hero.jpg"
                        alt="Estudiante trabajando con una laptop en un laboratorio de electrónica"
                        width="1800"
                        height="1200"
                        decoding="async"
                    />
                    <div className="preview" aria-hidden="true">
                        <div className="preview-msg preview-user">
                            ¿Atienden en la noche? Trabajo de día.
                        </div>
                        <div className="preview-msg preview-bot">
                            <span className="cat-tag" data-cat="Horarios">
                                <i />
                                Horarios
                            </span>
                            Sí: turno noche de lunes a viernes, 18:30 a 22:30.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
