import { useCallback, useState } from 'react'
import { Chatbot } from './components/chat/Chatbot.tsx'
import type { ChatCommand, ChatRequest } from './components/chat/types.ts'
import { AdmissionBand } from './components/sections/AdmissionBand.tsx'
import { Closing } from './components/sections/Closing.tsx'
import { Costs } from './components/sections/Costs.tsx'
import { Hero } from './components/sections/Hero.tsx'
import { Programs } from './components/sections/Programs.tsx'
import { RequirementsSchedule } from './components/sections/RequirementsSchedule.tsx'
import { SiteFooter } from './components/sections/SiteFooter.tsx'
import { SiteHeader } from './components/sections/SiteHeader.tsx'
import { Steps } from './components/sections/Steps.tsx'

export function App() {
    const [chatOpen, setChatOpen] = useState(false)
    const [request, setRequest] = useState<ChatRequest | null>(null)
    const [heroAskInView, setHeroAskInView] = useState(true)

    const send = useCallback((command: ChatCommand) => {
        setChatOpen(true)
        setRequest({ command, nonce: Date.now() })
    }, [])

    return (
        <>
            <a className="skip" href="#contenido">
                Saltar al contenido
            </a>

            <SiteHeader
                onRegister={() => {
                    send({ type: 'register' })
                }}
            />

            <main id="contenido">
                <Hero onCommand={send} onAskVisibilityChange={setHeroAskInView} />
                <AdmissionBand />
                <Programs
                    onAsk={(text) => {
                        send({ type: 'ask', text })
                    }}
                />
                <Steps />
                <RequirementsSchedule />
                <Costs
                    onRequestCosts={() => {
                        send({ type: 'register', category: 'Costos' })
                    }}
                />
                <Closing
                    onOpenChat={() => {
                        setChatOpen(true)
                    }}
                />
            </main>

            <SiteFooter />

            <Chatbot
                open={chatOpen}
                onOpenChange={setChatOpen}
                request={request}
                heroAskInView={heroAskInView}
            />
        </>
    )
}
