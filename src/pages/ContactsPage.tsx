import SeoHead from '../components/seo/SeoHead'
import { Link } from 'react-router-dom'
import { SITE_NAME, SITE_URL } from '../data/site'

const CONTACT_EMAIL = 'hello@astrum-cosmic.example.com'

export default function ContactsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Информационная платформа о космосе и технологиях.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: 'Russian',
    },
  }

  return (
    <>
      <SeoHead
        title="Контакты Astrum"
        description="Свяжитесь с редакцией Astrum: вопросы о проекте, предложения материалов и обратная связь по контенту о космосе."
        path="/contacts"
        schema={schema}
      />

      <article className="page contacts-page">
        <div className="container">
          <header className="contacts-intro page-header">
            <p className="page-kicker">Контакты</p>
            <h1>Контакты {SITE_NAME}</h1>
            <p className="page-lead">
              Мы открыты для вопросов, предложений и сотрудничества. Напишите нам —
              и мы ответим в течение нескольких рабочих дней.
            </p>
            <p className="page-intro-text">
              Astrum — информационный проект о космосе: мы не проводим набор на работу
              и не представляем космические агентства, но рады помочь с навигацией по
              материалам и учесть ваши замечания по контенту.
            </p>
          </header>

          <section className="page-prose">
            <h2>По каким вопросам писать</h2>
            <p>
              Напишите, если заметили неточность в тексте, хотите предложить тему для
              нового материала или уточнить формулировку в одном из разделов. Мы читаем
              каждое сообщение и стараемся отвечать по существу.
            </p>
            <p>
              Для срочных вопросов, связанных с карьерой или образованием в космической
              отрасли, рекомендуем опираться на официальные сайты агентств и учебных
              заведений — Astrum даёт обзорную информацию, а не консультации по
              поступлению или трудоустройству.
            </p>
          </section>

          <div className="page-cards contacts-cards" data-tour="contacts-cards">
            <section className="brutal-block page-card">
              <h2>Как с нами связаться</h2>
              <ul className="contact-list">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <strong>Тематика:</strong> космос, наука, образование
                </li>
                <li>
                  <strong>Язык:</strong> русский
                </li>
                <li>
                  <strong>Срок ответа:</strong> до 3 рабочих дней
                </li>
              </ul>

              <h3>Полезные ссылки</h3>
              <ul className="bullet-list">
                <li>
                  <Link to="/about">О проекте</Link>
                </li>
                <li>
                  <Link to="/opportunities">Возможности</Link>
                </li>
                <li>
                  <Link to="/technologies">Технологии</Link>
                </li>
                <li>
                  <Link to="/">Главная страница</Link>
                </li>
              </ul>
            </section>

            <section className="brutal-block page-card">
              <h2>Форма обратной связи</h2>
              <p className="contacts-form-note">
                Форма пока демонстрационная: отправка не подключена к серверу. Вы можете
                написать напрямую на email выше.
              </p>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                  Имя
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label>
                  Сообщение
                  <textarea name="message" rows={5} required />
                </label>
                <button type="submit" className="btn btn-primary">
                  Отправить
                </button>
              </form>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
