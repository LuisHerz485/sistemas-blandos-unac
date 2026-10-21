import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '../Logo.tsx'

const NAV = [
    { label: 'Carreras', href: '#carreras' },
    { label: 'Admisión', href: '#admision' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'Costos', href: '#costos' },
] as const

interface SiteHeaderProps {
    readonly onRegister: () => void
}

export function SiteHeader({ onRegister }: SiteHeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <header className="site-head">
            <div className="wrap head-row">
                <a href="#inicio" className="logo-link" aria-label="Instituto Horizonte, inicio">
                    <Logo />
                </a>
                <nav className="nav" id="nav-principal" data-open={menuOpen} aria-label="Principal">
                    {NAV.map(({ label, href }) => (
                        <a key={href} href={href} onClick={closeMenu}>
                            {label}
                        </a>
                    ))}
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                            closeMenu()
                            onRegister()
                        }}
                    >
                        Registrar mi interés
                    </button>
                </nav>
                <button
                    type="button"
                    className="icon-btn menu-btn"
                    onClick={() => {
                        setMenuOpen((value) => !value)
                    }}
                    aria-expanded={menuOpen}
                    aria-controls="nav-principal"
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
        </header>
    )
}
