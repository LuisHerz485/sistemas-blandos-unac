const STEPS = [
    {
        title: 'Pregunta',
        text: 'Escribe tu duda como la dirías. El asistente detecta si es sobre requisitos, horarios o costos.',
    },
    {
        title: 'Registra tu interés',
        text: 'Deja tu nombre, correo y consulta. Solo se guarda si marcas la autorización.',
    },
    {
        title: 'Admisión te contacta',
        text: 'Recibes la información vigente por correo, incluida la que el asistente no puede darte.',
    },
] as const

export function Steps() {
    return (
        <section className="section section-tint" id="admision">
            <div className="wrap">
                <div className="section-head">
                    <h2>Postular toma tres pasos</h2>
                    <p>El asistente responde lo que sabe y Admisión completa el resto contigo.</p>
                </div>
                <ol className="steps">
                    {STEPS.map((step, index) => (
                        <li key={step.title}>
                            <span className="step-n">{index + 1}</span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
