import SeoHead from '../components/seo/SeoHead'
import { Link } from 'react-router-dom'
import { technologies, techStatusClass } from '../data/technologies'
import { publicAsset } from '../utils/publicAsset'

export default function TechnologiesPage() {
  return (
    <>
      <SeoHead
        title="Космические технологии"
        description="Обзор современных космических технологий: ракеты, спутники, связь, материалы и перспективные разработки для освоения космоса."
        path="/technologies"
      />

      <article className="page technologies-page">
        <div className="container">
          <div className="page-intro">
            <header className="page-header">
              <p className="page-kicker">Технологии</p>
              <h1>Космические технологии будущего</h1>
              <p className="page-lead">
                От двигателей до бортовых компьютеров — инженерные решения определяют,
                как далеко человечество сможет зайти за пределы Земли.
              </p>
              <p className="page-intro-text">
                Современный космос строится на связке аппаратных и программных
                систем: носители выводят полезную нагрузку, спутники собирают и
                передают данные, наземные комплексы обеспечивают управление. Часть
                технологий уже работает в серии, другие проходят испытания на орбите
                и в лабораториях.
              </p>
            </header>

            <div className="brutal-frame page-intro-media">
              <img
                src={publicAsset('/images/features/technologies.png')}
                alt="Запуск ракеты Falcon 9 с космодрома"
                width={720}
                height={480}
              />
            </div>
          </div>

          <section className="page-prose">
            <h2>Из чего состоит технологический стек</h2>
            <p>
              Ракетостроение задаёт доступ на орбиту: двигатели, топливные системы,
              конструкции и средства управления пуском. Спутниковый сегмент отвечает
              за связь, навигацию, наблюдение и научные измерения. Между ними —
              материалы, электроника и программное обеспечение, без которых ни один
              аппарат не выдержит вакуум, перепады температур и радиацию.
            </p>
            <p>
              В последние годы отрасль смещается к многоразовости, миниатюризации и
              обработке данных прямо на борту. Это снижает стоимость миссий и ускоряет
              получение результатов — от прогноза погоды до мониторинга инфраструктуры
              и подготовки пилотируемых программ.
            </p>
          </section>

          <section className="technologies-key">
            <h2>Ключевые направления</h2>
            <p className="page-prose-inline">
              Таблица ниже — ориентир по направлениям и стадии внедрения. Статус
              отражает общий уровень зрелости технологии в отрасли, а не конкретный
              проект или компанию.
            </p>

            <div className="brutal-block technologies-table-panel" data-tour="tech-table">
              <div className="brutal-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Технология</th>
                      <th scope="col">Применение</th>
                      <th scope="col">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technologies.map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.use}</td>
                        <td className={techStatusClass(row.status)}>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="page-cards">
            <section className="brutal-block page-card">
              <h2>Тренды отрасли</h2>
              <ul className="bullet-list">
                <li>
                  Миниатюризация спутников и стандартизация платформ — орбита становится
                  доступнее для университетов, стартапов и научных групп.
                </li>
                <li>
                  Многоразовые носители и серийное производство снижают цену запуска и
                  ускоряют вывод созвездий связи и наблюдения.
                </li>
                <li>
                  Автономные бортовые системы и ИИ-обработка данных уменьшают задержку
                  между измерением на орбите и решением на Земле.
                </li>
                <li>
                  Международные лунные и марсианские программы стимулируют разработку
                  жизнеобеспечения, посадочных систем и использования местных ресурсов.
                </li>
              </ul>
            </section>

            <section className="brutal-block page-card">
              <h2>Связанные материалы</h2>
              <p>
                Технологии напрямую связаны с профессиями и миссиями: инженерные
                решения воплощают специалисты из разных направлений, а каждая миссия
                проверяет системы в реальных условиях.
              </p>
              <ul className="bullet-list">
                <li>
                  <Link to="/opportunities">Возможности</Link> — какие роли стоят за
                  ракетами, спутниками и наземной инфраструктурой.
                </li>
                <li>
                  <Link to="/exploration">Исследования</Link> — хронология миссий и
                  планы агентств на ближайшие десятилетия.
                </li>
                <li>
                  <Link to="/">Главная</Link> — обзор разделов платформы Astrum.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
