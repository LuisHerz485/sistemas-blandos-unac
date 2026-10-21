import { ArrowUp, MessageCircle, RotateCcw, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { getProgram, type Program } from '../../data/programs.ts'
import type { Category } from '../../lib/categories.ts'
import { classify, normalize } from '../../lib/classifier.ts'
import { isDemoMode } from '../../lib/config.ts'
import { QUICK_QUESTIONS } from '../../lib/knowledge.ts'
import { asksForProgramList, findProgram } from '../../lib/programMatcher.ts'
import { Logo } from '../Logo.tsx'
import { ChatMessageView } from './ChatMessageView.tsx'
import type { ChatMessage, ChatRequest, NewChatMessage, SentRegistration } from './types.ts'

let lastId = 0
const nextId = () => ++lastId

const withId = (message: NewChatMessage): ChatMessage => ({ ...message, id: nextId() })

const GREETING: readonly NewChatMessage[] = [
    {
        from: 'bot',
        type: 'text',
        text: 'Hola, soy el asistente de Admisión del Instituto Horizonte.',
    },
    {
        from: 'bot',
        type: 'choices',
        text: 'Pregúntame por requisitos, horarios, costos o por una carrera. La clasifico y te respondo.',
    },
]

const greeting = (): ChatMessage[] => GREETING.map(withId)

const isGreeting = (t: string) =>
    /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)\b/.test(t)
const isThanks = (t: string) => /\b(gracias|listo)\b/.test(t)
const wantsRegister = (t: string) =>
    /(registr|contact|llamen|escriban|inscribirme|me interesa)/.test(t)

interface ChatbotProps {
    readonly open: boolean
    readonly onOpenChange: (open: boolean) => void
    readonly request: ChatRequest | null
    /** En móvil, el botón flotante se oculta mientras la barra del hero es visible. */
    readonly heroAskInView: boolean
}

export function Chatbot({ open, onOpenChange, request, heroAskInView }: ChatbotProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(greeting)
    const [typing, setTyping] = useState(false)
    const [draft, setDraft] = useState('')
    const [lastQuestion, setLastQuestion] = useState('')
    const [category, setCategory] = useState<Category | null>(null)

    const panelRef = useRef<HTMLElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const launcherRef = useRef<HTMLButtonElement>(null)
    const timers = useRef<number[]>([])

    const push = useCallback((...items: NewChatMessage[]) => {
        setMessages((current) => [...current, ...items.map(withId)])
    }, [])

    const botSays = useCallback(
        (items: NewChatMessage[], delay = 520) => {
            setTyping(true)
            const timer = window.setTimeout(() => {
                setTyping(false)
                push(...items)
            }, delay)
            timers.current.push(timer)
        },
        [push],
    )

    useEffect(() => {
        const pending = timers.current
        return () => {
            pending.forEach((t) => {
                clearTimeout(t)
            })
        }
    }, [])

    const openForm = useCallback(
        (cat: Category | null, question: string) => {
            // Solo un formulario activo a la vez.
            setMessages((current) => current.filter((m) => !(m.type === 'form' && !m.sent)))
            botSays(
                [
                    {
                        from: 'bot',
                        type: 'text',
                        text: 'Perfecto. Completa estos datos y Admisión te contactará.',
                    },
                    { from: 'bot', type: 'form', category: cat, question },
                ],
                380,
            )
        },
        [botSays],
    )

    const answer = useCallback(
        (cat: Category, question: string, manual = false) => {
            setCategory(cat)
            botSays(
                [
                    { from: 'bot', type: 'answer', category: cat, manual },
                    { from: 'bot', type: 'offer', category: cat, question },
                ],
                640,
            )
        },
        [botSays],
    )

    // La ficha de la carrera ya incluye duración y turnos. Si además pregunta por
    // requisitos o costos, se agrega esa respuesta debajo.
    const answerProgram = useCallback(
        (program: Program, question: string, cat: Category | null) => {
            setCategory(cat)
            const extra: NewChatMessage[] =
                cat === 'Requisitos' || cat === 'Costos'
                    ? [{ from: 'bot', type: 'answer', category: cat, manual: false }]
                    : []
            botSays(
                [
                    { from: 'bot', type: 'program', programId: program.id },
                    ...extra,
                    {
                        from: 'bot',
                        type: 'offer',
                        category: cat,
                        question,
                        programName: program.name,
                    },
                ],
                680,
            )
        },
        [botSays],
    )

    const handleText = useCallback(
        (raw: string) => {
            const text = raw.trim()
            if (!text) return
            push({ from: 'user', type: 'text', text })
            const t = normalize(text)
            const result = classify(text)
            const program = findProgram(text)

            if (program) {
                setLastQuestion(text)
                answerProgram(program, text, result.category)
                return
            }
            if (asksForProgramList(text)) {
                botSays([
                    {
                        from: 'bot',
                        type: 'programs',
                        text: 'Tenemos cinco carreras de 3 años. Elige una para ver de qué trata, sus turnos y horarios.',
                    },
                ])
                return
            }
            if (result.category) {
                setLastQuestion(text)
                answer(result.category, text)
                return
            }
            if (wantsRegister(t)) {
                openForm(category, lastQuestion || text)
                return
            }
            if (isThanks(t)) {
                botSays([
                    {
                        from: 'bot',
                        type: 'text',
                        text: 'Con gusto. Si tienes otra duda, aquí estoy.',
                    },
                ])
                return
            }
            if (isGreeting(t)) {
                botSays([
                    { from: 'bot', type: 'choices', text: '¡Hola! ¿Sobre qué quieres saber?' },
                ])
                return
            }
            setLastQuestion(text)
            botSays([
                {
                    from: 'bot',
                    type: 'choices',
                    text: 'No estoy seguro de qué tipo de consulta es. ¿Sobre cuál de estos temas es?',
                    pendingQuestion: text,
                },
            ])
        },
        [answer, answerProgram, botSays, category, lastQuestion, openForm, push],
    )

    const pickProgram = useCallback(
        (programId: string) => {
            const program = getProgram(programId)
            if (!program) return
            const question = `Quiero saber sobre ${program.name}`
            push({ from: 'user', type: 'text', text: program.name })
            setLastQuestion(question)
            answerProgram(program, question, null)
        },
        [answerProgram, push],
    )

    const pickCategory = useCallback(
        (cat: Category, pendingQuestion?: string) => {
            if (pendingQuestion !== undefined) {
                push({ from: 'user', type: 'text', text: cat })
                answer(cat, pendingQuestion, true)
                return
            }
            const question = QUICK_QUESTIONS[cat]
            push({ from: 'user', type: 'text', text: question })
            setLastQuestion(question)
            answer(cat, question)
        },
        [answer, push],
    )

    const restart = useCallback(() => {
        timers.current.forEach((t) => {
            clearTimeout(t)
        })
        timers.current = []
        setTyping(false)
        setCategory(null)
        setLastQuestion('')
        setMessages(greeting())
        requestAnimationFrame(() => inputRef.current?.focus())
    }, [])

    const markSent = useCallback((id: number, data: SentRegistration) => {
        setMessages((current) =>
            current.map((m) => (m.id === id && m.type === 'form' ? { ...m, sent: data } : m)),
        )
    }, [])

    // Las órdenes de la página se procesan una vez por nonce. Los handlers se
    // leen desde una ref para no reprocesar la orden cuando cambian.
    const handlers = useRef({ handleText, pickCategory, openForm, push, category, lastQuestion })
    useEffect(() => {
        handlers.current = { handleText, pickCategory, openForm, push, category, lastQuestion }
    })

    useEffect(() => {
        if (request === null) return
        const h = handlers.current
        const { command } = request
        switch (command.type) {
            case 'ask':
                h.handleText(command.text)
                break
            case 'category':
                h.pickCategory(command.category)
                break
            case 'register': {
                h.push({ from: 'user', type: 'text', text: 'Quiero registrar mi interés' })
                const cat = command.category ?? h.category
                const question = command.category
                    ? QUICK_QUESTIONS[command.category]
                    : h.lastQuestion
                h.openForm(cat, question)
                break
            }
        }
    }, [request])

    // Baja hasta el final, salvo que la respuesta no quepa: entonces deja la
    // última pregunta del usuario arriba para leer la respuesta desde su inicio.
    useEffect(() => {
        const body = scrollRef.current
        if (!body) return
        const userMessages = body.querySelectorAll<HTMLElement>('.msg-user')
        const lastUser = userMessages[userMessages.length - 1]
        const bottom = body.scrollHeight - body.clientHeight
        const top =
            lastUser && body.scrollHeight - lastUser.offsetTop > body.clientHeight
                ? Math.min(lastUser.offsetTop - 12, bottom)
                : bottom
        body.scrollTo({ top, behavior: 'smooth' })
    }, [messages, typing])

    // `inert` saca el panel cerrado del orden de tabulación y del lector de pantalla.
    useEffect(() => {
        if (panelRef.current) panelRef.current.inert = !open
    }, [open])

    useEffect(() => {
        if (!open) return
        const focusTimer = window.setTimeout(() => {
            inputRef.current?.focus({ preventScroll: true })
        }, 120)
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(false)
                launcherRef.current?.focus()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => {
            clearTimeout(focusTimer)
            window.removeEventListener('keydown', onKey)
        }
    }, [open, onOpenChange])

    const submitDraft = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleText(draft)
        setDraft('')
    }

    return (
        <>
            <div
                className="chat-scrim"
                data-open={open}
                onClick={() => {
                    onOpenChange(false)
                }}
                aria-hidden="true"
            />
            <section
                ref={panelRef}
                className="chat"
                data-open={open}
                role="dialog"
                aria-modal="false"
                aria-label="Asistente de Admisión"
            >
                <header className="chat-head">
                    <span className="chat-grabber" aria-hidden="true" />
                    <div className="chat-avatar">
                        <Logo mark />
                    </div>
                    <div className="chat-title">
                        <strong>Asistente de Admisión</strong>
                        <span>
                            <i className="dot-live" aria-hidden="true" />
                            Responde al instante
                        </span>
                    </div>
                    <button
                        type="button"
                        className="icon-btn"
                        onClick={restart}
                        aria-label="Reiniciar conversación"
                        title="Reiniciar"
                    >
                        <RotateCcw size={18} strokeWidth={2} />
                    </button>
                    <button
                        type="button"
                        className="icon-btn"
                        onClick={() => {
                            onOpenChange(false)
                        }}
                        aria-label="Cerrar asistente"
                    >
                        <X size={20} strokeWidth={2} />
                    </button>
                </header>

                {isDemoMode && (
                    <p className="chat-demo">
                        Modo demo: los registros no se envían hasta configurar las variables{' '}
                        <code>VITE_GOOGLE_*</code>.
                    </p>
                )}

                <div className="chat-body" ref={scrollRef} aria-live="polite">
                    {messages.map((message) => (
                        <ChatMessageView
                            key={message.id}
                            message={message}
                            onPick={pickCategory}
                            onPickProgram={pickProgram}
                            onRegister={(cat, question) => {
                                push({ from: 'user', type: 'text', text: 'Registrar mi interés' })
                                openForm(cat, question)
                            }}
                            onAnother={() => {
                                botSays(
                                    [
                                        {
                                            from: 'bot',
                                            type: 'choices',
                                            text: 'Claro, cuéntame tu otra consulta o elige un tema.',
                                        },
                                    ],
                                    300,
                                )
                            }}
                            onSent={markSent}
                            onRestart={restart}
                        />
                    ))}
                    {typing && (
                        <div className="msg msg-bot" aria-label="El asistente está escribiendo">
                            <div className="bubble typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    )}
                </div>

                <form className="chat-composer" onSubmit={submitDraft}>
                    <label className="sr-only" htmlFor="chat-input">
                        Escribe tu consulta
                    </label>
                    <input
                        id="chat-input"
                        ref={inputRef}
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value)
                        }}
                        placeholder="Escribe tu consulta…"
                        autoComplete="off"
                        maxLength={400}
                    />
                    <button
                        className="send-btn"
                        type="submit"
                        disabled={!draft.trim()}
                        aria-label="Enviar"
                    >
                        <ArrowUp size={20} strokeWidth={2.25} />
                    </button>
                </form>
            </section>

            <button
                type="button"
                ref={launcherRef}
                className="launcher"
                data-open={open}
                data-hero={heroAskInView}
                onClick={() => {
                    onOpenChange(!open)
                }}
                aria-expanded={open}
                aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de Admisión'}
            >
                <span className="launcher-icon" data-show={!open}>
                    <MessageCircle size={24} strokeWidth={2} />
                </span>
                <span className="launcher-icon" data-show={open}>
                    <X size={24} strokeWidth={2} />
                </span>
                <span className="launcher-label">Pregunta a Admisión</span>
            </button>
        </>
    )
}
