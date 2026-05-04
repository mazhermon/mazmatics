// import dynamic from 'next/dynamic'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { AppContextProvider } from '../context/appContext'

type Props = {
  children: React.ReactNode
}

// const DynamicSunSprite = dynamic(
//   () => import('../components/characters/sunSprite'),
//   {
//     ssr: false,
//   }
// )

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <AppContextProvider>
        <a href="#main-content" className="skipLink">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </AppContextProvider>
    </>
  )
}
