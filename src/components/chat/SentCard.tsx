import { Check, RotateCcw } from 'lucide-react'
import { CategoryTag } from './CategoryTag.tsx'
import type { SentRegistration } from './types.ts'

const dateFormat = new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium', timeStyle: 'short' })

interface SentCardProps {
    readonly data: SentRegistration
    readonly onRestart: () => void
}

export function SentCard({ data, onRestart }: SentCardProps) {
    return (
        <div className="sent" role="status">
            <div className="sent-icon">
                <Check size={20} strokeWidth={2.75} />
            </div>
            <strong>{data.demo ? 'Registro simulado (modo demo)' : 'Interés registrado'}</strong>
            <p>
                {data.demo
                    ? 'Configura las variables de entorno para que llegue a Google Sheets.'
                    : 'Admisión te escribirá al correo que dejaste.'}
            </p>
            <dl>
                <div>
                    <dt>Nombre</dt>
                    <dd>{data.nombre}</dd>
                </div>
                <div className="sent-wide">
                    <dt>Correo</dt>
                    <dd>{data.correo}</dd>
                </div>
                <div>
                    <dt>Consulta</dt>
                    <dd>
                        <CategoryTag category={data.tipo} />
                    </dd>
                </div>
                <div>
                    <dt>Fecha y hora</dt>
                    <dd>{dateFormat.format(data.at)}</dd>
                </div>
            </dl>
            <button type="button" className="choice" onClick={onRestart}>
                <RotateCcw size={15} strokeWidth={2.25} /> Registrar otra persona
            </button>
        </div>
    )
}
