const FACTS = [
    { label: 'Inscripciones', value: 'Hasta el 28 de febrero' },
    { label: 'Inicio de clases', value: 'Marzo de 2027' },
    { label: 'Duración', value: '3 años · 6 semestres' },
] as const

export function AdmissionBand() {
    return (
        <section className="band" aria-label="Fechas de admisión">
            <div className="wrap band-row">
                {FACTS.map(({ label, value }) => (
                    <div key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                    </div>
                ))}
                <p className="band-note">Fechas referenciales de un instituto ficticio.</p>
            </div>
        </section>
    )
}
