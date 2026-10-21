import { PROGRAM_DEGREE, PROGRAM_DURATION, TURN_HOURS, type Program } from '../../data/programs.ts'

interface ProgramAnswerProps {
    readonly program: Program
}

export function ProgramAnswer({ program }: ProgramAnswerProps) {
    return (
        <div className="bubble bubble-answer program-answer">
            <div className="answer-head">
                <span className="answer-label">Carrera</span>
                <span className="program-tag">{program.name}</span>
            </div>
            <p>{program.description}</p>

            <dl className="answer-facts">
                <div>
                    <dt>Duración</dt>
                    <dd>{PROGRAM_DURATION}</dd>
                </div>
                <div>
                    <dt>Título</dt>
                    <dd>{PROGRAM_DEGREE}</dd>
                </div>
                <div className="answer-facts-wide">
                    <dt>Turnos (lunes a viernes)</dt>
                    {program.turns.map((turn) => (
                        <dd key={turn}>
                            {turn}: <span className="tabular">{TURN_HOURS[turn]}</span>
                        </dd>
                    ))}
                </div>
            </dl>

            <div>
                <p className="answer-subhead">Qué aprenderás</p>
                <ul>
                    {program.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                    ))}
                </ul>
            </div>

            <div>
                <p className="answer-subhead">Dónde puedes trabajar</p>
                <p>{program.careers.join(' · ')}</p>
            </div>

            <p className="answer-note">Información referencial de un instituto ficticio.</p>
        </div>
    )
}
