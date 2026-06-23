import { Link } from 'react-router-dom'
import { publicAsset } from '../../utils/publicAsset'

export default function HeroSection() {
  return (
    <section id="hero" className="hero" aria-label="Главный экран">
      <div className="hero-stars" aria-hidden="true" />

      <div className="hero-earth">
        <img
          src={publicAsset('/images/hero/earth-horizon.png')}
          alt="Вид Земли из космоса с атмосферным свечением на горизонте"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="hero-content">
        <img
          src={publicAsset('/images/hero/hero-text-backdrop.png')}
          alt=""
          aria-hidden="true"
          className="hero-content-bg"
          width={1200}
          height={800}
        />
        <div className="hero-content-inner">
        <p className="hero-tagline">
          Исследуй. Узнавай. Вдохновляйся.
        </p>
        <div className="hero-headings">
          <h1 className="hero-title">Открой вселенную</h1>
          <h2 className="hero-subtitle">новых возможностей</h2>
        </div>
        <p className="hero-desc">
          Astrum — информационная платформа о космосе, технологиях и будущем человечества.
          Погрузись в интерактивный опыт.
        </p>
        <Link to="/exploration" className="btn btn-primary hero-cta">
          Исследовать
        </Link>
        </div>
      </div>
    </section>
  )
}
