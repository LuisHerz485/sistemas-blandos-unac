interface ClosingProps {
    readonly onOpenChat: () => void
}

export function Closing({ onOpenChat }: ClosingProps) {
    return (
        <section className="closing">
            <img
                src="/img/estudiantes.jpg"
                alt="Tres estudiantes conversando con sus laptops en una mesa"
                loading="lazy"
                decoding="async"
                width="1400"
                height="933"
            />
            <div className="wrap closing-inner">
                <h2>¿Tienes otra pregunta?</h2>
                <p>
                    Escríbela como te salga. Si el asistente no tiene la respuesta, te lo dice y te
                    conecta con Admisión.
                </p>
                <button type="button" className="btn btn-light btn-lg" onClick={onOpenChat}>
                    Abrir el asistente
                </button>
            </div>
        </section>
    )
}
