interface LogoProps {
    /** Solo el símbolo, sin el nombre. */
    readonly mark?: boolean
}

// Marca: un sol naciendo sobre la línea del horizonte.
export function Logo({ mark = false }: LogoProps) {
    const symbol = (
        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="logo-mark">
            <rect width="32" height="32" rx="8" fill="var(--navy-800)" />
            <path d="M9 20a7 7 0 0 1 14 0z" fill="var(--sun)" />
            <rect x="6" y="21.5" width="20" height="2.5" rx="1.25" fill="#fff" />
        </svg>
    )
    if (mark) return symbol
    return (
        <span className="logo">
            {symbol}
            <span className="logo-text">
                <strong>Horizonte</strong>
                <small>Instituto Superior Tecnológico</small>
            </span>
        </span>
    )
}
