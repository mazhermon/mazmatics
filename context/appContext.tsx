import React, { createContext } from 'react'
import { useUserLang } from './services/useUserLang'

export interface IAppState {
  userLang?: string
}

const initialState = {
  userLang: '',
}

export const AppContext = createContext<IAppState>(initialState)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { userLang } = useUserLang()

  const value = { userLang }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
