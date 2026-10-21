import { getProgram, PROGRAMS } from '../../data/programs.ts'
import { CATEGORIES, type Category } from '../../lib/categories.ts'
import { ANSWERS } from '../../lib/knowledge.ts'
import { CategoryTag } from './CategoryTag.tsx'
import { ProgramAnswer } from './ProgramAnswer.tsx'
import { RegisterForm } from './RegisterForm.tsx'
import { SentCard } from './SentCard.tsx'
import type { ChatMessage, SentRegistration } from './types.ts'

interface ChatMessageViewProps {
    readonly message: ChatMessage
    readonly onPick: (category: Category, pendingQuestion?: string) => void
    readonly onPickProgram: (programId: string) => void
    readonly onRegister: (category: Category | null, question: string) => void
    readonly onAnother: () => void
    readonly onSent: (id: number, data: SentRegistration) => void
    readonly onRestart: () => void
}

export function ChatMessageView({
    message,
    onPick,
    onPickProgram,
    onRegister,
    onAnother,
    onSent,
    onRestart,
}: ChatMessageViewProps) {
    if (message.from === 'user') {
        return (
            <div className="msg msg-user">
                <div className="bubble">{message.text}</div>
            </div>
        )
    }

    switch (message.type) {
        case 'text':
            return (
                <div className="msg msg-bot">
                    <div className="bubble">{message.text}</div>
                </div>
            )

        case 'choices':
            return (
                <div className="msg msg-bot">
                    <div className="bubble">{message.text}</div>
                    <div className="choice-row">
                        {CATEGORIES.map((cat) => (
                            <button
                                type="button"
                                key={cat}
                                className="choice"
                                data-cat={cat}
                                onClick={() => {
                                    onPick(cat, message.pendingQuestion)
                                }}
                            >
                                <i aria-hidden="true" />
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )

        case 'answer': {
            const answer = ANSWERS[message.category]
            return (
                <div className="msg msg-bot">
                    <div className="bubble bubble-answer">
                        <div className="answer-head">
                            <span className="answer-label">
                                {message.manual ? 'Tema elegido' : 'Consulta clasificada'}
                            </span>
                            <CategoryTag category={message.category} />
                        </div>
                        <p>{answer.intro}</p>
                        <ul>
                            {answer.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <p className="answer-note">{answer.note}</p>
                    </div>
                </div>
            )
        }

        case 'program': {
            const program = getProgram(message.programId)
            if (!program) return null
            return (
                <div className="msg msg-bot">
                    <ProgramAnswer program={program} />
                </div>
            )
        }

        case 'programs':
            return (
                <div className="msg msg-bot">
                    <div className="bubble">{message.text}</div>
                    <div className="choice-col">
                        {PROGRAMS.map((program) => (
                            <button
                                type="button"
                                key={program.id}
                                className="choice"
                                onClick={() => {
                                    onPickProgram(program.id)
                                }}
                            >
                                {program.name}
                            </button>
                        ))}
                    </div>
                </div>
            )

        case 'offer':
            return (
                <div className="msg msg-bot">
                    <div className="bubble">
                        {message.programName
                            ? `¿Quieres que Admisión te contacte sobre ${message.programName}?`
                            : '¿Quieres que Admisión te contacte?'}
                    </div>
                    <div className="choice-row">
                        <button
                            type="button"
                            className="choice choice-primary"
                            onClick={() => {
                                onRegister(message.category, message.question)
                            }}
                        >
                            Registrar mi interés
                        </button>
                        <button type="button" className="choice" onClick={onAnother}>
                            Tengo otra pregunta
                        </button>
                    </div>
                </div>
            )

        case 'form':
            return (
                <div className="msg msg-bot msg-wide">
                    {message.sent ? (
                        <SentCard data={message.sent} onRestart={onRestart} />
                    ) : (
                        <RegisterForm
                            category={message.category}
                            question={message.question}
                            onSent={(data) => {
                                onSent(message.id, data)
                            }}
                        />
                    )}
                </div>
            )
    }
}
