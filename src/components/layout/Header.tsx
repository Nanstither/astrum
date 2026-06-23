import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTour } from '../../context/TourContext'
import { SITE_NAME, navLinks } from '../../data/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { startTour } = useTour()

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label={`${SITE_NAME} — на главную`}>
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.2" />
              <ellipse cx="16" cy="16" rx="14" ry="4" stroke="currentColor" strokeWidth="1" transform="rotate(-25 16 16)" />
            </svg>
          </span>
          <span className="logo-text">A S T R U M</span>
        </Link>

        <nav className="main-nav" aria-label="Основная навигация">
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="btn btn-outline header-tour"
          onClick={() => {
            setMenuOpen(false)
            startTour()
          }}
        >
          Запустить тур
        </button>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
