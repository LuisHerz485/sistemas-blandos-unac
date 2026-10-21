// Contenido referencial de un instituto ficticio.

export const TURNS = ['Mañana', 'Tarde', 'Noche'] as const

export type Turn = (typeof TURNS)[number]

export const TURN_HOURS: Readonly<Record<Turn, string>> = {
    Mañana: '8:00 – 13:00',
    Tarde: '14:00 – 19:00',
    Noche: '18:30 – 22:30',
}

export const PROGRAM_DURATION = '3 años (6 semestres)'
export const PROGRAM_DEGREE = 'Profesional Técnico'

export interface Program {
    readonly id: string
    readonly name: string
    /** Resumen de una línea para la lista de carreras. */
    readonly summary: string
    /** Explicación de qué trata la carrera, para el chatbot. */
    readonly description: string
    readonly topics: readonly string[]
    readonly careers: readonly string[]
    readonly turns: readonly Turn[]
    /**
     * Palabras con las que el chatbot reconoce la carrera, sin tildes y en
     * minúsculas. Coinciden al inicio de una palabra ("contab" → "contabilidad").
     */
    readonly aliases: readonly string[]
    readonly img: string
    readonly alt: string
}

export const PROGRAMS: readonly [Program, ...Program[]] = [
    {
        id: 'software',
        name: 'Desarrollo de Software',
        summary:
            'Aplicaciones web y móviles, bases de datos y APIs. Proyectos reales desde el primer semestre.',
        description:
            'Aprendes a construir aplicaciones web y móviles de principio a fin: desde la base de datos hasta la interfaz que usa la gente.',
        topics: [
            'Programación con JavaScript, TypeScript y Python',
            'Bases de datos SQL',
            'Desarrollo web y móvil',
            'APIs y trabajo en equipo con Git',
        ],
        careers: ['Desarrollador web', 'Desarrollador móvil', 'Soporte de aplicaciones'],
        turns: ['Mañana', 'Noche'],
        aliases: [
            'software',
            'desarrollo de software',
            'programacion',
            'programador',
            'computacion',
            'informatica',
            'desarrollador',
        ],
        img: '/img/software.jpg',
        alt: 'Laptop con código abierto en un editor sobre un escritorio blanco',
    },
    {
        id: 'mecatronica',
        name: 'Mecatrónica Industrial',
        summary:
            'Automatización con PLC, sensores, neumática y mantenimiento de equipos de planta.',
        description:
            'Combina mecánica, electrónica e informática para automatizar procesos y mantener los equipos de una planta industrial.',
        topics: [
            'Controladores lógicos programables (PLC)',
            'Sensores y actuadores',
            'Neumática e hidráulica',
            'Mantenimiento de equipos industriales',
        ],
        careers: ['Técnico de automatización', 'Técnico de mantenimiento', 'Operador de planta'],
        turns: ['Mañana', 'Tarde'],
        aliases: ['mecatronica', 'automatizacion', 'plc', 'robotica', 'electronica'],
        img: '/img/mecatronica.jpg',
        alt: 'Estudiante revisando planos técnicos junto a herramientas y piezas mecánicas',
    },
    {
        id: 'enfermeria',
        name: 'Enfermería Técnica',
        summary: 'Atención básica de pacientes, primeros auxilios y apoyo en centros de salud.',
        description:
            'Te prepara para apoyar al equipo de salud en la atención y el cuidado de pacientes en clínicas, hospitales y postas.',
        topics: [
            'Cuidados básicos del paciente',
            'Primeros auxilios',
            'Bioseguridad',
            'Apoyo en procedimientos de salud',
        ],
        careers: ['Técnico en enfermería', 'Auxiliar en clínicas y postas', 'Cuidado domiciliario'],
        turns: ['Mañana', 'Tarde'],
        aliases: ['enfermeria', 'enfermera', 'enfermero', 'salud'],
        img: '/img/enfermeria.jpg',
        alt: 'Manos escribiendo en una laptop con un estetoscopio sobre la mesa',
    },
    {
        id: 'diseno',
        name: 'Diseño Gráfico Digital',
        summary: 'Identidad visual, ilustración, edición de video y piezas para redes.',
        description:
            'Aprendes a comunicar ideas con imágenes: logotipos, piezas para redes sociales, ilustración y video.',
        topics: [
            'Identidad visual y branding',
            'Ilustración digital',
            'Edición de video y animación básica',
            'Diseño para redes sociales',
        ],
        careers: ['Diseñador gráfico', 'Creador de contenido', 'Diseñador para agencias'],
        turns: ['Tarde', 'Noche'],
        aliases: ['diseno', 'grafico', 'disenador', 'ilustracion'],
        img: '/img/diseno.jpg',
        alt: 'Muestrarios de color y una tableta con bocetos sobre un escritorio',
    },
    {
        id: 'contabilidad',
        name: 'Contabilidad',
        summary: 'Registros contables, tributación y gestión financiera para empresas.',
        description:
            'Te forma para llevar las cuentas de una empresa: registros contables, impuestos, planillas y reportes financieros.',
        topics: [
            'Contabilidad general y de costos',
            'Tributación',
            'Planillas',
            'Software contable y Excel',
        ],
        careers: ['Asistente contable', 'Auxiliar de tributación', 'Asistente de finanzas'],
        turns: ['Mañana', 'Noche'],
        aliases: ['contabilidad', 'contador', 'contable', 'tributacion'],
        img: '/img/contabilidad.jpg',
        alt: 'Documentos tributarios, calculadora en un celular y un lapicero',
    },
]

export function getProgram(id: string): Program | undefined {
    return PROGRAMS.find((p) => p.id === id)
}
