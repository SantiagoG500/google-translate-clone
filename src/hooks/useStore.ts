import { useReducer } from 'react'
import { Action, FromLanguage, Language, State } from '../types'
import { AUTO_LANGUAGE } from '../consts'

const initialState: State = {
  fromLang: 'auto',
  toLang: 'en',
  fromText: '',
  result: '',
  loading: false
}

const reducerLang = (state: State, action: Action) => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLang === AUTO_LANGUAGE) return state
    return {
      ...state,
      fromLang: state.toLang,
      toLang: state.fromLang
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLang: action.payload
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLang: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export const useStore = () => {
  const [{
    fromLang,
    toLang,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducerLang, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLang,
    toLang,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
