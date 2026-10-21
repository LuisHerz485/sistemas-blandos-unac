import { ArrowRight } from 'lucide-react'

interface CostsProps {
    readonly onRequestCosts: () => void
}

export function Costs({ onRequestCosts }: CostsProps) {
    return (
        <section className="section costs" id="costos">
            <div className="wrap costs-grid">
                <div>
                    <h2>Costos: te los da Admisión, no un número inventado.</h2>
                    <p>
                        Matrícula, pensión y becas cambian cada periodo. Por eso el asistente no da
                        montos: registra tu consulta y Admisión te envía la información vigente.
                    </p>
                </div>
                <button type="button" className="btn btn-primary btn-lg" onClick={onRequestCosts}>
                    Pedir costos a Admisión <ArrowRight size={20} />
                </button>
            </div>
        </section>
    )
}
