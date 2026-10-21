// Las etiquetas deben coincidir EXACTAMENTE con las opciones de
// "Tipo de consulta" en Google Forms.
export const CATEGORIES = ['Requisitos', 'Horarios', 'Costos'] as const

export type Category = (typeof CATEGORIES)[number]

export function isCategory(value: string): value is Category {
    return (CATEGORIES as readonly string[]).includes(value)
}
