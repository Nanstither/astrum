import { Outlet } from 'react-router-dom'
import { TourProvider } from '../../context/TourContext'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <TourProvider>
      <div className="app-shell">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TourProvider>
  )
}
