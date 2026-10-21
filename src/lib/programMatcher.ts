import { PROGRAMS, type Program } from '../data/programs.ts'
import { normalize } from './classifier.ts'

const LIST_RE = /\b(carreras|que (puedo )?estudiar|que ofrecen|programas|especialidades)\b/

/**
 * Busca qué carrera menciona el texto. Cada alias debe coincidir al inicio de
 * una palabra. Si varias carreras coinciden, gana la que suma el alias más
 * largo (el más específico); en empate no se elige ninguna.
 */
export function findProgram(text: string): Program | null {
    const padded = ` ${normalize(text)}`
    let best: Program | null = null
    let bestLength = 0
    let tie = false

    for (const program of PROGRAMS) {
        const longest = Math.max(
            0,
            ...program.aliases.filter((a) => padded.includes(` ${a}`)).map((a) => a.length),
        )
        if (longest > bestLength) {
            best = program
            bestLength = longest
            tie = false
        } else if (longest > 0 && longest === bestLength) {
            tie = true
        }
    }
    return tie ? null : best
}

/** true cuando el usuario pregunta qué carreras hay, sin nombrar una. */
export function asksForProgramList(text: string): boolean {
    return LIST_RE.test(normalize(text))
}
