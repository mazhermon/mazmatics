import { useEffect, useState } from 'react'

interface IUseUserLang {
  (): { userLang: string }
}

export const useUserLang: IUseUserLang = () => {
  const [lang, setLang] = useState<string>('')
  useEffect(() => {
    if (window !== undefined) {
      setLang(window.navigator.language)
    }
  }, [])

  return { userLang: lang }
}
