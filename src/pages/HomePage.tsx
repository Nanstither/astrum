import { Link } from 'react-router-dom'
import SeoHead from '../components/seo/SeoHead'
import HeroSection from '../components/home/HeroSection'
import HomeScrollSnap from '../components/home/HomeScrollSnap'
import { SITE_NAME, SITE_URL } from '../data/site'

const features = [
  {
    to: '/opportunities',
    title: 'Возможности',
    paragraphs: [
      'Космическая отрасль открывает карьерные пути в инженерии, науке о данных, проектировании аппаратов и управлении миссиями. На Astrum собраны направления, которые помогут понять, с чего начать путь в космонавтике.',
      'Вы узнаете о ролях в госкорпорациях и частных компаниях, стажировках, образовательных программах и навыках, которые ценят работодатели. Материалы ориентированы на студентов, выпускников и тех, кто рассматривает смену профессии.',
    ],
    image: '/images/features/opportunities.png',
    alt: 'Астронавт выходит в открытый космос на фоне Земли',
  },
  {
    to: '/technologies',
    title: 'Технологии',
    paragraphs: [
      'Современный космос держится на ракетных двигателях, микроэлектронике, системах связи и новых материалах. В разделе технологий мы разбираем ключевые решения простым языком — от стартовых комплексов до спутниковых группировок.',
      'Здесь же — обзор перспективных направлений: многоразовые носители, автономные роботы, термозащита и технологии жизнеобеспечения для длительных полётов. Каждая тема связана с реальными проектами и практическим применением на Земле.',
    ],
    image: '/images/features/technologies.png',
    alt: 'Запуск ракеты Falcon 9 с космодрома',
  },
  {
    to: '/exploration',
    title: 'Исследования',
    paragraphs: [
      'История освоения космоса — это цепочка смелых миссий, от первых спутников до посадок на другие небесные тела. Мы собираем хронологию запусков, научные открытия и планы агентств на ближайшие десятилетия.',
      'В материалах — орбитальные станции, телескопы, межпланетные аппараты и программы по возвращению на Луну. Раздел помогает увидеть, как отдельные миссии складываются в общую картину исследования Солнечной системы.',
    ],
    image: '/images/features/exploration.png',
    alt: 'Астронавты проводят исследования на поверхности Луны',
  },
]

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Информационная платформа о космосе, технологиях и будущем человечества.',
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/technologies`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <SeoHead
        title="Astrum — открой вселенную новых возможностей"
        description="Astrum — информационная платформа о космосе, технологиях и будущем человечества. Исследуйте возможности, технологии и миссии в интерактивном формате."
        path="/"
        schema={schema}
      />

      <HomeScrollSnap />

      <HeroSection />

      <section id="features" className="section features-section">
        <div className="container">
          <header className="section-header">
            <p className="section-kicker">Навигация по платформе</p>
            <h2>Что вас ждёт на Astrum</h2>
            <p className="section-lead">
              Три тематических раздела, страница о проекте и контакты — всё связано
              внутренними ссылками для удобного изучения космической тематики.
            </p>
          </header>

          <div className="features-list">
            {features.map((item, index) => (
              <article
                key={item.to}
                className={`feature-row ${
                  index % 2 === 0 ? 'feature-row--image-left' : 'feature-row--image-right'
                }`}
              >
                <div className="feature-row-media">
                  <div className="feature-frame">
                    <img src={item.image} alt={item.alt} width={560} height={350} loading="lazy" />
                  </div>
                </div>
                <div className="feature-row-content">
                  <div className="feature-panel">
                    <h3>{item.title}</h3>
                    {item.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                  <Link to={item.to} className="btn btn-primary">
                    Перейти в раздел
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="features-aside">
            <h3>Почему космос важен сегодня</h3>
            <ul className="check-list">
              <li>Спутниковые данные помогают прогнозировать погоду и климат.</li>
              <li>Космические технологии ускоряют развитие медицины и связи.</li>
              <li>Международные миссии объединяют учёных со всего мира.</li>
              <li>
                Подробнее о миссии платформы — на странице{' '}
                <Link to="/about">о проекте</Link>.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
