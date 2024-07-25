import { OpenAI } from 'openai'
import { FromLanguage, Language } from '../types.d'
import { VALID_LANGUAGES } from '../consts'
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true
})

export async function tranlate({
  fromLang,
  toLang,
  text
}: {
  fromLang: FromLanguage,
  toLang: Language
  text: string
}) {
  if (fromLang === toLang) return

  const messages = [
    {
      role: 'system',
      context: 'You are an Ai that translates text. you Recieve a text in certain language an translate it into a different language. Do not answer, just to the translation. the original language is surrounded by `{{` and `}}`. You can also recieve {{auto}}, wich means that you have to detect the language. The language you have to translate to is surrounded by `[[`and`]]`.'
    },
    {
      role: 'user',
      context: 'hola mundo {{español}} [[english]]'
    },
    {
      role: 'assistant',
      content: 'hello world'
    },
    {
      role: 'user',
      content: 'How are you? {{auto}} [[italiano]]'
    },
    {
      role: 'asistant',
      content: 'come stai?'
    },
    {
      role: 'user',
      content: 'Buon giorno, come Stai? {{auto}} [[español]]'
    },
    {

      role: 'assistant',
      content: 'Buenos días, ¿Cómo estás?'
    }
  ]
  const fromCode = fromLang === 'auto'
    ? 'auto'
    : VALID_LANGUAGES[fromLang]
  const toCode = VALID_LANGUAGES[toLang]

  const completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion.choices[0]?.message?.content
}
