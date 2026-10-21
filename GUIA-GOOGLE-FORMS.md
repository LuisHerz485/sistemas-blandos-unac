# Guía: conectar el chatbot con Google Forms y Google Sheets

El chatbot clasifica la consulta (Requisitos, Horarios o Costos) y envía el
registro directamente al formulario. Google Sheets guarda cada envío con su
fecha y hora (columna **Marca temporal**). El formulario **no guarda la
conversación**, solo los datos del registro.

## 1. Crea el formulario

En <https://forms.google.com> crea un formulario en blanco llamado
**"Registro de interesados – Instituto Horizonte"** con estas 5 preguntas,
en este orden y **todas obligatorias**:

| #   | Pregunta (título exacto) | Tipo                     | Opciones / validación                                     |
| --- | ------------------------ | ------------------------ | --------------------------------------------------------- |
| 1   | Nombre                   | Respuesta corta          | —                                                         |
| 2   | Correo                   | Respuesta corta          | Validación de respuesta → Texto → Correo electrónico      |
| 3   | Tipo de consulta         | Opción múltiple          | `Requisitos` · `Horarios` · `Costos`                      |
| 4   | Mensaje                  | Párrafo                  | —                                                         |
| 5   | Autorización             | Casillas de verificación | `Autorizo el registro de mis datos para fines académicos` |

> Importante: las opciones de las preguntas 3 y 5 deben escribirse **exactamente**
> igual (mayúsculas y tildes incluidas). Si no coinciden, Google rechaza el envío
> sin avisar.

En **Configuración → Respuestas**:

- **Recopilar direcciones de correo electrónico:** No recopilar.
- **Limitar a 1 respuesta:** desactivado (no debe pedir iniciar sesión).

## 2. Vincúlalo con Google Sheets

Pestaña **Respuestas** → icono verde **Vincular con Hojas de cálculo** → _Crear
una hoja de cálculo nueva_. La hoja tendrá las columnas:

`Marca temporal | Nombre | Correo | Tipo de consulta | Mensaje | Autorización`

Para la evidencia: **Compartir → Cualquier persona con el enlace → Lector**.

## 3. Obtén los IDs de los campos (entry.XXXX)

1. En el formulario: menú **⋮ → Obtener enlace prellenado**.
2. Llena cada campo con algo reconocible (Nombre `N`, Correo `c@c.com`, elige
   `Requisitos`, Mensaje `M`, marca la autorización) y pulsa **Obtener enlace → Copiar**.
3. El enlace se ve así:

```
https://docs.google.com/forms/d/e/1FAIpQLSf...XYZ/viewform?usp=pp_url
  &entry.123456789=N
  &entry.987654321=c@c.com
  &entry.111222333=Requisitos
  &entry.444555666=M
  &entry.777888999=Autorizo+el+registro+de+mis+datos+para+fines+acad%C3%A9micos
```

- El texto entre `/d/e/` y `/viewform` es el **FORM_ID**.
- Cada `entry.NNNN` corresponde al campo que llenaste con ese valor.

## 4. Configura las variables de entorno

Los valores no van en el código: se leen de variables de entorno.

**En local:** copia `.env.example` como `.env.local` (este archivo no se sube a Git) y complétalo:

```bash
VITE_GOOGLE_FORM_ID=1FAIpQLSf...XYZ
VITE_GOOGLE_ENTRY_NOMBRE=entry.123456789
VITE_GOOGLE_ENTRY_CORREO=entry.987654321
VITE_GOOGLE_ENTRY_TIPO=entry.111222333
VITE_GOOGLE_ENTRY_MENSAJE=entry.444555666
VITE_GOOGLE_ENTRY_AUTORIZACION=entry.777888999
```

**En Netlify:** _Site configuration → Environment variables → Add a variable_, con los mismos
6 nombres y valores. Después vuelve a desplegar (_Deploys → Trigger deploy_), porque Vite
incrusta los valores al compilar.

Si falta alguna variable o tiene mal formato, el chatbot muestra **"Modo demo"** y no envía
nada. Estos valores son públicos (cualquiera puede verlos en el formulario de Google), así que
no son secretos; se usan variables para no mezclar configuración con código.

## 5. Prueba local

```bash
npm install
npm run dev
```

Abre el enlace que aparece, haz una consulta, pulsa **Registrar mi interés**,
completa el formulario y revisa que aparezca una fila nueva en Sheets.
Si cambias `.env.local`, reinicia `npm run dev`.

## 6. Publica en Netlify (plan gratuito)

Sube el proyecto a GitHub y en Netlify elige _Add new site → Import an existing project_.
`netlify.toml` ya define todo: antes de publicar Netlify ejecuta `npm run verify`
(tipos, lint, formato y pruebas) y, si algo falla, **no publica** y el sitio anterior sigue
en línea. Cada push a la rama principal despliega una nueva versión.

El sitio es 100 % estático (sin Functions), así que entra en el plan gratuito sin problema.

## Cómo clasifica el chatbot

`src/lib/classifier.ts` normaliza el texto (minúsculas, sin tildes) y suma pesos
por palabras clave de cada categoría:

- **Requisitos:** requisito, documento, DNI, partida, certificado, postular, examen…
- **Horarios:** horario, turno, mañana, tarde, noche, inicio, cuándo, cuánto dura…
- **Costos:** costo, cuesta, precio, pensión, cuota, beca, descuento, soles…

Gana la categoría con más puntos. Si nadie llega al mínimo o hay empate, el
bot pregunta "¿Sobre cuál de estos temas es?" en vez de adivinar. En el
formulario del chat, el tipo detectado ya viene marcado y el usuario puede
corregirlo antes de enviar. Para **Costos** el bot no da montos: deriva a
Admisión y ofrece registrar el interés.

### Preguntas por una carrera

`src/lib/programMatcher.ts` reconoce si la consulta nombra una carrera (por su nombre o por
palabras como "programación", "contador" o "PLC"). En ese caso el bot responde con una ficha:
de qué trata, duración, turnos con horario, qué se aprende y dónde se puede trabajar. Si además
pregunta por requisitos o costos, agrega esa respuesta debajo. "¿Qué carreras tienen?" muestra
la lista para elegir una. Los datos de cada carrera están en `src/data/programs.ts`.

En el registro, el tipo de consulta queda marcado solo si la pregunta trae uno de los tres temas;
el mensaje conserva la pregunta original, así que la carrera queda registrada en Sheets.

## Checklist de la actividad

- [ ] 5 registros ficticios (usa **Registrar otra persona** en el chat entre cada uno).
- [ ] Verificar fecha, hora y datos en Sheets.
- [ ] Probar el chatbot y el botón desde un celular.
- [ ] Capturas: chatbot, formulario y los 5 registros.
- [ ] Video de hasta 1 minuto con un envío completo.
- [ ] Para el análisis: en Sheets, _Insertar → Tabla dinámica_ con filas = Tipo de consulta y valores = CONTAR, luego _Insertar → Gráfico_.
