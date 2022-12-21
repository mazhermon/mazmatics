import dynamic from 'next/dynamic'
import { Navbar } from './navbar'
import { Footer } from './footer'

type Props = {
  children: React.ReactNode
}

const DynamicSunSprite = dynamic(
  () => import('../components/characters/sunSprite'),
  {
    ssr: false,
  }
)

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <DynamicSunSprite />
      <main>{children}</main>
      <Footer />
    </>
  )
}
