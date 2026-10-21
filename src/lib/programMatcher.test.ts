import { describe, expect, it } from 'vitest'
import { asksForProgramList, findProgram } from './programMatcher.ts'

describe('findProgram', () => {
    it.each([
        ['¿De qué trata la carrera de Enfermería Técnica?', 'enfermeria'],
        ['Quiero estudiar programación', 'software'],
        ['¿Cuánto dura Desarrollo de Software?', 'software'],
        ['¿En qué turnos se dicta contabilidad?', 'contabilidad'],
        ['me gustaría ser contador', 'contabilidad'],
        ['info de mecatrónica', 'mecatronica'],
        ['¿Tienen diseño gráfico en la noche?', 'diseno'],
    ] as const)('"%s" → %s', (question, expected) => {
        expect(findProgram(question)?.id).toBe(expected)
    })

    it.each(['¿Cuánto cuesta la pensión?', '¿Qué requisitos piden?', 'hola'])(
        'no detecta carrera en "%s"',
        (question) => {
            expect(findProgram(question)).toBeNull()
        },
    )

    it('solo coincide al inicio de una palabra', () => {
        // "plc" no debe coincidir dentro de otra palabra.
        expect(findProgram('xplcx')).toBeNull()
    })
})

describe('asksForProgramList', () => {
    it.each(['¿Qué carreras tienen?', '¿Qué puedo estudiar?', 'programas que ofrecen'])(
        'detecta "%s"',
        (question) => {
            expect(asksForProgramList(question)).toBe(true)
        },
    )

    it('no se activa con otras preguntas', () => {
        expect(asksForProgramList('¿Cuánto cuesta la pensión?')).toBe(false)
    })
})
