import { Logo } from '../Logo.tsx'

export function SiteFooter() {
    return (
        <footer className="site-foot">
            <div className="wrap foot-row">
                <Logo />
                <p>
                    Sitio ficticio con fines académicos. Actividad grupal «Chatbot de matrícula con
                    registro de interesados», Facultad de Ingeniería Industrial y de Sistemas, UNAC.
                    No uses datos personales reales.
                </p>
            </div>
        </footer>
    )
}
