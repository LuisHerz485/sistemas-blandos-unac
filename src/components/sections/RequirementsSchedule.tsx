import { TURN_HOURS, TURNS as TURN_NAMES } from '../../data/programs.ts'
import { ANSWERS } from '../../lib/knowledge.ts'

const TURNS = TURN_NAMES.map((turn) => ({ turn, hours: TURN_HOURS[turn] }))

export function RequirementsSchedule() {
    return (
        <section className="section" id="horarios">
            <div className="wrap info-grid">
                <div className="info-block">
                    <h2>Requisitos</h2>
                    <ul className="check-list">
                        {ANSWERS.Requisitos.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <p className="fine">{ANSWERS.Requisitos.note}</p>
                </div>
                <div className="info-block">
                    <h2>Horarios</h2>
                    <table className="turns">
                        <caption className="sr-only">Turnos de clase, lunes a viernes</caption>
                        <thead>
                            <tr>
                                <th scope="col">Turno</th>
                                <th scope="col">Horario</th>
                                <th scope="col">Días</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TURNS.map(({ turn, hours }) => (
                                <tr key={turn}>
                                    <th scope="row">{turn}</th>
                                    <td>{hours}</td>
                                    <td>Lun a vie</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="fine">{ANSWERS.Horarios.note}</p>
                </div>
            </div>
        </section>
    )
}
