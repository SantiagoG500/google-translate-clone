import { AUTO_LANGUAGE, VALID_LANGUAGES } from './consts'

export type Language = keyof typeof VALID_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLang: FromLanguage,
  toLang: Language,
  fromText: string,
  result: string,
  loading: boolean
}

export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
  | { type: 'INTERCHANGE_LANGUAGES' }

export enum SectionType {
  From = 'from',
  To = 'to'
}
