import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import TechnologiesPage from './pages/TechnologiesPage'
import ExplorationPage from './pages/ExplorationPage'
import ContactsPage from './pages/ContactsPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="technologies" element={<TechnologiesPage />} />
          <Route path="exploration" element={<ExplorationPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
