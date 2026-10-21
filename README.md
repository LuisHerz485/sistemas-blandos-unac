# Instituto Horizonte · Chatbot de matrícula

Landing page de un instituto ficticio con un chatbot que clasifica consultas
(**Requisitos**, **Horarios** o **Costos**) y registra interesados en Google Forms → Google Sheets.
Actividad grupal FIIS – UNAC.

## Requisitos

- Node.js 22 (ver `.nvmrc`; mínimo 20.19)
- npm

## Uso

```bash
npm install
cp .env.example .env.local   # completa los valores del Google Form
npm run dev                  # http://localhost:5173
```

Sin `.env.local` el chatbot funciona en **modo demo** (no envía nada).
La configuración del formulario está en [GUIA-GOOGLE-FORMS.md](GUIA-GOOGLE-FORMS.md).

## Scripts

| Script              | Qué hace                                            |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                              |
| `npm run build`     | Verifica tipos y compila a `dist/`                  |
| `npm run preview`   | Sirve `dist/` como en producción                    |
| `npm run typecheck` | Solo verificación de tipos                          |
| `npm run lint`      | ESLint (cero warnings permitidos)                   |
| `npm run format`    | Formatea con Prettier                               |
| `npm run test`      | Pruebas con Vitest                                  |
| `npm run verify`    | Tipos + lint + formato + pruebas (lo corre Netlify) |

## Estructura

```
src/
├── main.tsx                  # Punto de entrada
├── App.tsx                   # Composición de la página y estado del chat
├── styles.css                # Tokens de diseño y estilos
├── vite-env.d.ts             # Tipos de las variables de entorno
├── components/
│   ├── Logo.tsx
│   ├── chat/                 # Chatbot, mensajes, formulario de registro
│   └── sections/             # Secciones de la landing
├── data/programs.ts          # Carreras (contenido referencial)
└── lib/
    ├── categories.ts         # Categorías válidas (coinciden con Google Forms)
    ├── classifier.ts         # Clasificador de intención (+ classifier.test.ts)
    ├── knowledge.ts          # Respuestas que el bot puede dar
    ├── config.ts             # Lee y valida las variables VITE_GOOGLE_*
    └── submitInterest.ts     # Envío a Google Forms
```

## Despliegue (Netlify, plan gratuito)

`netlify.toml` define el build (`npm run verify && npm run build`), la carpeta `dist`, Node 22,
cabeceras de seguridad (CSP estricta, HSTS, anti-clickjacking) y caché de larga duración para los
archivos con hash. Las variables `VITE_GOOGLE_*` se configuran en el panel de Netlify.
