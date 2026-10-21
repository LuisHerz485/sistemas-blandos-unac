import { describe, expect, it } from 'vitest'
import { classify, normalize } from './classifier.ts'

describe('normalize', () => {
    it('quita tildes, signos y espacios extra', () => {
        expect(normalize('  ¿Mañana   Pensión ÁÉÍ?  ')).toBe('manana pension aei')
    })
})

describe('classify', () => {
    it.each([
        ['¿Qué documentos necesito para postular?', 'Requisitos'],
        ['necesito mi certificado de secundaria?', 'Requisitos'],
        ['¿Qué piden para matricularme?', 'Requisitos'],
        ['¿Tienen turno noche?', 'Horarios'],
        ['¿Cuánto dura la carrera?', 'Horarios'],
        ['¿A qué hora empiezan las clases?', 'Horarios'],
        ['¿Puedo estudiar los sábados?', 'Horarios'],
        ['¿Cuánto cuesta la pensión?', 'Costos'],
        ['¿Hay becas o descuentos?', 'Costos'],
        ['¿Cuánto es la matrícula?', 'Costos'],
    ] as const)('"%s" → %s', (question, expected) => {
        expect(classify(question).category).toBe(expected)
    })

    it.each(['Buenos días', 'quiero estudiar software', 'hola'])(
        'devuelve null cuando no hay señales: "%s"',
        (question) => {
            const result = classify(question)
            expect(result.category).toBeNull()
            expect(result.confidence).toBe(0)
        },
    )

    it('la confianza está entre 0 y 1', () => {
        const { confidence } = classify('¿Cuánto cuesta la pensión mensual?')
        expect(confidence).toBeGreaterThan(0)
        expect(confidence).toBeLessThanOrEqual(1)
    })
})
