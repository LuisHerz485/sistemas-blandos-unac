import type { Category } from '../../lib/categories.ts'
import type { InterestRegistration, SubmitResult } from '../../lib/submitInterest.ts'

export type SentRegistration = InterestRegistration & SubmitResult

export type ChatMessage =
    | { readonly id: number; readonly from: 'user'; readonly type: 'text'; readonly text: string }
    | { readonly id: number; readonly from: 'bot'; readonly type: 'text'; readonly text: string }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'choices'
          readonly text: string
          /** Pregunta original que el bot no pudo clasificar. */
          readonly pendingQuestion?: string
      }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'answer'
          readonly category: Category
          /** true cuando el usuario eligió el tema a mano. */
          readonly manual: boolean
      }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'program'
          /** id de una carrera de PROGRAMS. */
          readonly programId: string
      }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'programs'
          readonly text: string
      }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'offer'
          /** null cuando la consulta es sobre una carrera sin un tema claro. */
          readonly category: Category | null
          readonly question: string
          /** Nombre de la carrera consultada, si la hay. */
          readonly programName?: string
      }
    | {
          readonly id: number
          readonly from: 'bot'
          readonly type: 'form'
          readonly category: Category | null
          readonly question: string
          readonly sent?: SentRegistration
      }

/** Un mensaje antes de recibir su id. */
export type NewChatMessage = ChatMessage extends infer M
    ? M extends ChatMessage
        ? Omit<M, 'id'>
        : never
    : never

/** Órdenes que la página envía al chatbot. */
export type ChatCommand =
    | { readonly type: 'ask'; readonly text: string }
    | { readonly type: 'category'; readonly category: Category }
    | { readonly type: 'register'; readonly category?: Category }

/** Una orden con un identificador único, para poder repetir la misma orden. */
export interface ChatRequest {
    readonly command: ChatCommand
    readonly nonce: number
}
