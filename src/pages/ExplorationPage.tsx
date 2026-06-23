import { useCallback, useMemo, useRef, useState } from 'react'
import SeoHead from '../components/seo/SeoHead'
import { Link } from 'react-router-dom'
import MissionTree from '../components/exploration/MissionTree'
import { publicAsset } from '../utils/publicAsset'
import {
  getAllExpandableIds,
  getAncestorIds,
  missionKindLabel,
  missionTree,
  missions,
} from '../data/exploration'

export default function ExplorationPage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(getAllExpandableIds(missionTree)),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)

  const expandedSet = useMemo(() => expandedIds, [expandedIds])

  const toggleBranch = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectMission = useCallback((id: string, scrollToRow = false) => {
    setSelectedId(id)
    setExpandedIds((prev) => {
      const next = new Set(prev)
      for (const ancestorId of getAncestorIds(id)) {
        next.add(ancestorId)
      }
      return next
    })

    if (!scrollToRow) return

    const row = tableScrollRef.current?.querySelector<HTMLTableRowElement>(
      `[data-mission-id="${id}"]`,
    )
    if (row) {
      row.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <SeoHead
        title="Исследования космоса"
        description="Хронология космических миссий и открытий: от первого спутника до современных телескопов и планов освоения Луны и Марса."
        path="/exploration"
      />

      <article className="page exploration-page">
        <div className="container">
          <div className="page-intro">
            <header className="page-header">
              <p className="page-kicker">Исследования</p>
              <h1>Исследования космоса</h1>
              <p className="page-lead">
                История космонавтики — это цепочка смелых экспериментов, каждый из
                которых расширял границы возможного для человечества.
              </p>
              <p className="page-intro-text">
                От баллистической ракеты V-2 до орбитальных обсерваторий и коммерческих
                пилотируемых полётов — миссии образуют разветвлённую сеть. Отдельно
                отмечены технологии, которые космос дал повседневной жизни на Земле.
                Ниже — интерактивное дерево и полная таблица.
              </p>
            </header>

            <div className="brutal-frame page-intro-media">
              <img
                src={publicAsset('/images/features/exploration.png')}
                alt="Астронавты проводят исследования на поверхности Луны"
                width={720}
                height={480}
              />
            </div>
          </div>

          <section className="page-prose">
            <h2>Как читать хронологию</h2>
            <p>
              Дерево начинается с ракеты <strong>V-2</strong> (пунктирная связь — военный
              предшественник, не мирная программа) и переходит к «Спутнику-1». Ветви расходятся
              по пилотируемым полётам, автоматическим станциям, телескопам и коммерческим
              запускам. Отдельная ветка «На пользу Земле» — технологии, пришедшие в быт и
              промышленность.
            </p>
            <p>
              Все ветки раскрыты по умолчанию. Скрывать и показывать их можно кнопками
              «+» и «−» на узлах — клик по самому узлу только подсвечивает миссию в
              таблице, без прокрутки страницы. В таблице клик по-прежнему прокручивает
              к выбранной строке.
            </p>
          </section>

          <section className="exploration-timeline">
            <h2>Дерево миссий</h2>
            <p className="page-prose-inline">
              Раскрытые ветки слева направо: от V-2 и Спутника — к миссиям и гражданским
              «спин-оффам». Пунктир — предшественник или побочное применение, не сама миссия.
            </p>

            <div className="brutal-frame exploration-tree-panel" data-tour="mission-tree">
              <MissionTree
                root={missionTree}
                expandedIds={expandedSet}
                selectedId={selectedId}
                onToggle={toggleBranch}
                onSelect={selectMission}
              />
            </div>
          </section>

          <section className="exploration-missions">
            <h2>Хронология ключевых миссий</h2>
            <p className="page-prose-inline">
              Полный список узлов дерева: выберите строку, чтобы подсветить миссию на схеме
              и автоматически раскрыть путь к ней.
            </p>

            <div className="brutal-block exploration-table-panel">
              <div className="exploration-table-scroll" ref={tableScrollRef}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Год</th>
                      <th scope="col">Миссия</th>
                      <th scope="col">Агентство</th>
                      <th scope="col">Тип</th>
                      <th scope="col">Результат</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((mission) => (
                      <tr
                        key={mission.id}
                        data-mission-id={mission.id}
                        className={selectedId === mission.id ? 'is-selected' : undefined}
                        onClick={() => selectMission(mission.id, true)}
                      >
                        <td>{mission.year}</td>
                        <td>{mission.name}</td>
                        <td>{mission.agency}</td>
                        <td className={mission.kind === 'spinoff' ? 'mission-type-spinoff' : mission.kind === 'precursor' ? 'mission-type-precursor' : undefined}>
                          {missionKindLabel(mission.kind) ?? 'Миссия'}
                        </td>
                        <td>{mission.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="page-cards">
            <section className="brutal-block page-card">
              <h2>Что дальше</h2>
              <ul className="bullet-list">
                <li>
                  Программа Artemis и возвращение экипажей на Луну в 2020-х годах.
                </li>
                <li>
                  Развитие орбитальных и лунных инфраструктур для длительных экспедиций.
                </li>
                <li>
                  Подготовка пилотируемых миссий к Марсу и испытание систем жизнеобеспечения.
                </li>
                <li>
                  Поиск экзопланет, анализ их атмосфер и изучение ранней Вселенной.
                </li>
              </ul>
            </section>

            <section className="brutal-block page-card">
              <h2>Узнать больше</h2>
              <p>
                Технологии, без которых невозможны эти миссии, собраны в разделе{' '}
                <Link to="/technologies">технологий</Link>. Карьерные направления отрасли —
                на странице <Link to="/opportunities">возможностей</Link>.
              </p>
              <p>
                Вопросы по материалам и предложения тем — на странице{' '}
                <Link to="/contacts">контактов</Link>.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
