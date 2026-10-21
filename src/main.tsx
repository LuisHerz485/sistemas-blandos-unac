import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/hanken-grotesk'
import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root en index.html')

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
