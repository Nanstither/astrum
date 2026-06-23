import { useCallback, useRef, useState } from 'react'
import SeoHead from '../components/seo/SeoHead'
import { Link } from 'react-router-dom'
import { publicAsset } from '../utils/publicAsset'
import CareerGraph from '../components/opportunities/CareerGraph'
import { careers, demandClass } from '../data/careers'

export default function OpportunitiesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)

  const highlightId = hoveredId ?? selectedId

  const selectCareer = useCallback((id: string) => {
    setSelectedId(id)
    const row = tableScrollRef.current?.querySelector<HTMLTableRowElement>(
      `[data-career-id="${id}"]`,
    )
    if (row) {
      row.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <SeoHead
        title="Возможности космической отрасли"
        description="Карьерные направления, профессии и перспективы развития в космической индустрии — обзор для студентов и молодых специалистов."
        path="/opportunities"
      />

      <article className="page opportunities-page">
        <div className="container">
          <div className="page-intro">
            <header className="page-header">
              <p className="page-kicker">Возможности</p>
              <h1>Возможности космической отрасли</h1>
              <p className="page-lead">
                Космос — это не только полёты астронавтов. Это тысячи профессий на
                Земле: от проектирования двигателей до анализа спутниковых снимков.
              </p>
              <p className="page-intro-text">
                Отрасль сочетает государственные программы и коммерческие компании:
                агентства задают долгосрочные миссии, а частный сектор ускоряет
                запуски, производство аппаратов и сервисы на орбите. Для специалиста
                важно понимать, где пересекаются инженерия, наука и наземная
                инфраструктура — именно там формируются устойчивые карьерные траектории.
              </p>
            </header>

            <div className="brutal-frame page-intro-media">
              <img
                src={publicAsset('/images/features/opportunities.png')}
                alt="Астронавт выходит в открытый космос на фоне Земли"
                width={720}
                height={480}
              />
            </div>
          </div>

          <section className="page-prose">
            <h2>Как устроена отрасль</h2>
            <p>
              Космическая индустрия опирается на цепочку: проектирование и испытания
              на Земле, вывод на орбиту, эксплуатация аппаратов и анализ полученных
              данных. Ракетостроение и спутниковые платформы связаны с наземными
              комплексами — без них невозможны ни пуск, ни устойчивая связь с орбитой.
            </p>
            <p>
              Научные миссии и подготовка экипажей дополняют инженерный контур:
              исследования задают требования к приборам, а полётные операции требуют
              точной координации инженеров, операторов и аналитиков. Коммерческий
              сектор всё чаще объединяет эти направления в единые продуктовые команды.
            </p>
          </section>

          <section className="opportunities-careers">
            <h2>Востребованные профессии</h2>
            <p className="page-prose-inline">
              Сначала — карта связей между направлениями. Наведите на узел графа или
              строку таблицы ниже, чтобы увидеть смежные специальности; клик по узлу
              прокрутит к профессии в таблице и закрепит подсветку строки.
            </p>

            <div className="opportunities-careers-grid">
              <div className="brutal-frame opportunities-graph-panel" data-tour="career-graph">
                <CareerGraph
                  highlightId={highlightId}
                  selectedId={selectedId}
                  onNodeHover={setHoveredId}
                  onNodeClick={selectCareer}
                />
              </div>

              <div className="brutal-block opportunities-table-panel">
                <div className="opportunities-table-scroll" ref={tableScrollRef}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Профессия</th>
                        <th scope="col">Направление</th>
                        <th scope="col">Спрос</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careers.map((row) => (
                        <tr
                          key={row.id}
                          data-career-id={row.id}
                          className={
                            selectedId === row.id
                              ? 'is-selected'
                              : hoveredId === row.id
                                ? 'is-active'
                                : undefined
                          }
                          onMouseEnter={() => setHoveredId(row.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => selectCareer(row.id)}
                        >
                          <td>{row.role}</td>
                          <td>{row.field}</td>
                          <td className={demandClass(row.demand)}>{row.demand}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="page-cards">
            <section className="brutal-block page-card">
              <h2>Как начать путь</h2>
              <ul className="bullet-list">
                <li>
                  Заложите базу: физика, математика и программирование — фундамент для
                  большинства инженерных и аналитических ролей в отрасли.
                </li>
                <li>
                  Следите за миссиями и технологиями на страницах{' '}
                  <Link to="/exploration">исследований</Link> и{' '}
                  <Link to="/technologies">технологий</Link> — это помогает понять,
                  какие навыки востребованы сейчас.
                </li>
                <li>
                  Выберите направление из таблицы и изучите смежные роли на графе:
                  карьера в космосе часто строится через междисциплинарные проекты.
                </li>
              </ul>
            </section>

            <section className="brutal-block page-card">
              <h2>Коммерческий космос</h2>
              <p>
                Частные компании развивают многоразовые носители, спутниковые
                созвездия и лунные программы, открывая новые рабочие места по всему миру.
              </p>
              <p>
                Спрос растёт на менеджеров проектов, инженеров серийного производства и
                специалистов по регулированию запусков. Коммерческий сектор работает
                быстрее госконтуров, но опирается на те же компетенции: надёжность,
                испытания и точная инженерия.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
