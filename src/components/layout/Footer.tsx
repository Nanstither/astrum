import { Link } from 'react-router-dom'
import { SITE_NAME, footerLinks } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-logo">{SITE_NAME}</p>
          <p className="footer-tagline">
            Информационная платформа о космосе, технологиях и будущем человечества.
          </p>
        </div>

        <nav aria-label="Навигация в подвале">
          <h2 className="footer-heading">Разделы</h2>
          <ul className="footer-links">
            {footerLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Материалы</h2>
          <ul className="footer-links">
            <li>
              <Link to="/about">О миссии проекта</Link>
            </li>
            <li>
              <Link to="/technologies">Космические технологии</Link>
            </li>
            <li>
              <Link to="/contacts">Связаться с редакцией</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {year} {SITE_NAME}. Учебный SEO-проект о космосе.</p>
      </div>
    </footer>
  )
}
