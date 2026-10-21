import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { PROGRAMS } from '../../data/programs.ts'

interface ProgramsProps {
    readonly onAsk: (question: string) => void
}

export function Programs({ onAsk }: ProgramsProps) {
    const [selectedId, setSelectedId] = useState(PROGRAMS[0].id)
    const active = PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0]

    return (
        <section className="section" id="carreras">
            <div className="wrap">
                <div className="section-head">
                    <h2>Carreras</h2>
                    <p>Elige una para ver de qué trata y en qué turnos se dicta.</p>
                </div>
                <div className="programs">
                    <ul
                        className="program-list"
                        role="tablist"
                        aria-label="Carreras"
                        aria-orientation="vertical"
                    >
                        {PROGRAMS.map((program) => {
                            const selected = program.id === active.id
                            return (
                                <li key={program.id} role="presentation">
                                    <button
                                        type="button"
                                        role="tab"
                                        id={`tab-${program.id}`}
                                        aria-controls="program-panel"
                                        aria-selected={selected}
                                        className="program-row"
                                        onClick={() => {
                                            setSelectedId(program.id)
                                        }}
                                        onMouseEnter={() => {
                                            setSelectedId(program.id)
                                        }}
                                    >
                                        <span className="program-name">{program.name}</span>
                                        <span className="program-turns">
                                            {program.turns.join(' · ')}
                                        </span>
                                        <ArrowRight
                                            className="program-arrow"
                                            size={20}
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <div className="program-inline" hidden={!selected}>
                                        <img
                                            src={program.img}
                                            alt={program.alt}
                                            loading="lazy"
                                            decoding="async"
                                            width="900"
                                            height="600"
                                        />
                                        <p>{program.summary}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div
                        className="program-panel"
                        id="program-panel"
                        role="tabpanel"
                        aria-labelledby={`tab-${active.id}`}
                    >
                        <div className="program-media">
                            {PROGRAMS.map((program) => (
                                <img
                                    key={program.id}
                                    src={program.img}
                                    alt={program.id === active.id ? program.alt : ''}
                                    data-active={program.id === active.id}
                                    loading="lazy"
                                    decoding="async"
                                    width="900"
                                    height="600"
                                />
                            ))}
                        </div>
                        <div className="program-detail">
                            <h3>{active.name}</h3>
                            <p>{active.summary}</p>
                            <dl>
                                <div>
                                    <dt>Duración</dt>
                                    <dd>3 años</dd>
                                </div>
                                <div>
                                    <dt>Turnos</dt>
                                    <dd>{active.turns.join(', ')}</dd>
                                </div>
                                <div>
                                    <dt>Título</dt>
                                    <dd>Profesional técnico</dd>
                                </div>
                            </dl>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => {
                                    onAsk(`Cuéntame sobre la carrera de ${active.name}`)
                                }}
                            >
                                Preguntar por esta carrera <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
