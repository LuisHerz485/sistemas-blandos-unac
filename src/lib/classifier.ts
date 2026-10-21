import { CATEGORIES, type Category } from './categories.ts'

// Clasificador de intención por palabras clave con pesos.
type Keyword = readonly [term: string, weight: number]

const KEYWORDS: Readonly<Record<Category, readonly Keyword[]>> = {
    Requisitos: [
        ['requisito', 3],
        ['documento', 3],
        ['dni', 3],
        ['partida', 3],
        ['certificado', 3],
        ['papeles', 3],
        ['necesito', 1],
        ['piden', 2],
        ['postular', 2],
        ['postulo', 2],
        ['inscrib', 2],
        ['inscripcion', 2],
        ['examen', 2],
        ['admision', 1],
        ['vacante', 2],
        ['foto', 2],
        ['secundaria', 2],
        ['edad', 2],
        ['estudios', 1],
        ['traslado', 2],
        ['que se necesita', 3],
        ['como ingreso', 3],
        ['ingresar', 2],
    ],
    Horarios: [
        ['horario', 3],
        [' hora', 2],
        ['turno', 3],
        ['manana', 2],
        ['tarde', 2],
        ['noche', 2],
        ['nocturno', 3],
        ['que dias', 3],
        ['lunes', 2],
        ['viernes', 2],
        ['sabado', 2],
        ['domingo', 2],
        ['clases', 1],
        ['cuando', 2],
        ['inicio', 2],
        ['empieza', 2],
        ['comienza', 2],
        ['fecha', 2],
        ['calendario', 3],
        ['duracion', 2],
        ['cuanto dura', 3],
        ['semestre', 1],
        ['trabajo y estudio', 3],
        ['trabajar', 1],
    ],
    Costos: [
        ['costo', 3],
        ['cuesta', 3],
        ['precio', 3],
        ['pago', 3],
        ['pagar', 3],
        ['pension', 3],
        ['mensualidad', 3],
        ['cuota', 3],
        ['cuanto', 2],
        ['soles', 3],
        ['s/', 3],
        ['beca', 3],
        ['descuento', 3],
        ['dinero', 2],
        ['caro', 2],
        ['barato', 2],
        ['financ', 2],
        ['credito', 2],
        ['matricula', 1],
        ['tarifa', 3],
    ],
}

// "cuánto dura" habla de tiempo, no de dinero.
const OVERRIDES: readonly (readonly [pattern: RegExp, category: Category, weight: number])[] = [
    [/cuanto (dura|tiempo)/, 'Horarios', 4],
]

const MIN_SCORE = 2

export type Scores = Record<Category, number>

export interface ClassifyResult {
    /** null cuando no hay señales suficientes o hay empate. */
    readonly category: Category | null
    readonly confidence: number
    readonly scores: Scores
}

export function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[¿?¡!.,;:]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function classify(text: string): ClassifyResult {
    const t = ` ${normalize(text)} `
    const scores: Scores = { Requisitos: 0, Horarios: 0, Costos: 0 }

    for (const category of CATEGORIES) {
        for (const [term, weight] of KEYWORDS[category]) {
            if (t.includes(term)) scores[category] += weight
        }
    }
    for (const [pattern, category, weight] of OVERRIDES) {
        if (pattern.test(t)) {
            scores[category] += weight
            if (category !== 'Costos') scores.Costos = Math.max(0, scores.Costos - 2)
        }
    }

    const [first, second] = [...CATEGORIES].sort((a, b) => scores[b] - scores[a])
    if (first === undefined || second === undefined) {
        return { category: null, confidence: 0, scores }
    }
    const best = scores[first]
    const runnerUp = scores[second]
    if (best < MIN_SCORE || best === runnerUp) {
        return { category: null, confidence: 0, scores }
    }
    const confidence = Math.min(1, (best - runnerUp) / best + 0.25)
    return { category: first, confidence, scores }
}
