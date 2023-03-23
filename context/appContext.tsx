import React, { createContext } from 'react'
import { useUserLang } from './services/useUserLang'

export interface IAppState {
  userLang?: string
  mathsWord?: string
}

const initialState = {
  userLang: '',
  mathsWord: '',
}

export const AppContext = createContext<IAppState>(initialState)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { userLang } = useUserLang()
  const mathsWord = userLang === 'en-US' ? 'math' : 'maths'

  const value = { userLang, mathsWord }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
