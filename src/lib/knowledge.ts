import type { Category } from './categories.ts'

export interface Answer {
    readonly intro: string
    readonly items: readonly string[]
    readonly note: string
}

// Contenido que el asistente puede afirmar. Todo es referencial (institución
// ficticia). Costos: NO hay información oficial, así que se deriva a Admisión.
export const ANSWERS: Readonly<Record<Category, Answer>> = {
    Requisitos: {
        intro: 'Para postular se suele pedir lo siguiente:',
        items: [
            'Copia de DNI vigente',
            'Certificado de estudios de secundaria completa (o constancia de egreso)',
            'Partida de nacimiento',
            'Dos fotos tamaño carné, fondo blanco',
            'Ficha de inscripción llenada',
        ],
        note: 'Lista referencial. Admisión te confirma la lista final al contactarte.',
    },
    Horarios: {
        intro: 'Todas las carreras duran 3 años (6 semestres) y se dictan en tres turnos:',
        items: [
            'Mañana: lunes a viernes, 8:00 a 13:00',
            'Tarde: lunes a viernes, 14:00 a 19:00',
            'Noche: lunes a viernes, 18:30 a 22:30',
            'Inicio de clases 2027-I: marzo de 2027',
        ],
        note: 'Horarios referenciales; la disponibilidad de turno depende de cada carrera.',
    },
    Costos: {
        intro: 'No tengo información oficial de costos, así que no voy a darte montos que podrían no ser correctos.',
        items: [
            'El área de Admisión te envía matrícula, pensión y opciones de beca',
            'Te contactan por correo con la información vigente',
        ],
        note: 'Si registras tu interés, Admisión te escribe con los costos actualizados.',
    },
}

export const QUICK_QUESTIONS: Readonly<Record<Category, string>> = {
    Requisitos: '¿Qué requisitos piden para postular?',
    Horarios: '¿Qué horarios y turnos tienen?',
    Costos: '¿Cuánto cuesta la pensión?',
}
