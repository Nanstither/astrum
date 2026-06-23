export type MissionKind = 'precursor' | 'mission' | 'spinoff'

export type MissionNode = {
  id: string
  year: string
  name: string
  agency: string
  result: string
  kind?: MissionKind
  /** Стиль линии от родителя к этому узлу */
  linkStyle?: 'solid' | 'dashed'
  children?: MissionNode[]
}

/**
 * Дерево от баллистической ракеты V-2 (пунктир — предшественник, не мирная программа)
 * к Спутнику-1 и ветвям миссий; отдельная ветка — гражданские «спин-оффы».
 */
export const missionTree: MissionNode = {
  id: 'v-2-1944',
  year: '1944',
  name: 'V-2 (A-4)',
  agency: 'Германия (Третий рейх)',
  kind: 'precursor',
  result:
    'Первая баллистическая ракета — инженерный предшественник, не мирная космическая программа',
  children: [
    {
      id: 'sputnik-1',
      year: '1957',
      name: 'Спутник-1',
      agency: 'СССР',
      kind: 'mission',
      linkStyle: 'dashed',
      result: 'Первый искусственный спутник Земли — начало космической эры',
      children: [
        {
          id: 'sputnik-2-1957',
          year: '1957',
          name: 'Спутник-2',
          agency: 'СССР',
          result: 'Первый полёт животного на орбиту — собака Лайка',
        },
        {
          id: 'gagarin-1961',
          year: '1961',
          name: 'Восток-1',
          agency: 'СССР',
          result: 'Первый полёт человека в космос — Юрий Гагарин',
          children: [
            {
              id: 'tereshkova-1963',
              year: '1963',
              name: 'Восток-6',
              agency: 'СССР',
              result: 'Первый женский космический полёт — Валентина Терешкова',
            },
            {
              id: 'spacewalk-1965',
              year: '1965',
              name: 'Восход-2',
              agency: 'СССР',
              result: 'Первый выход человека в открытый космос — Алексей Леонов',
            },
            {
              id: 'apollo-8-1968',
              year: '1968',
              name: 'Apollo 8',
              agency: 'NASA',
              result: 'Первый облёт Луны экипажем — подготовка к высадке',
              children: [
                {
                  id: 'apollo-11-1969',
                  year: '1969',
                  name: 'Apollo 11',
                  agency: 'NASA',
                  result: 'Первая высадка человека на Луну',
                  children: [
                    {
                      id: 'salyut-1971',
                      year: '1971',
                      name: 'Салют-1',
                      agency: 'СССР',
                      result: 'Первая орбитальная станция',
                      children: [
                        {
                          id: 'mir-1986',
                          year: '1986',
                          name: 'Мир',
                          agency: 'СССР',
                          result: 'Модульная станция — рекорды длительных экспедиций',
                          children: [
                            {
                              id: 'iss-1998',
                              year: '1998',
                              name: 'МКС',
                              agency: 'Международная',
                              result:
                                'Постоянная орбитальная станция — долговременное присутствие на орбите',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'luna-1-1959',
          year: '1959',
          name: 'Луна-1',
          agency: 'СССР',
          result: 'Первая аппаратура, достигшая окрестностей Луны',
          children: [
            {
              id: 'luna-3-1959',
              year: '1959',
              name: 'Луна-3',
              agency: 'СССР',
              result: 'Первые снимки обратной стороны Луны',
              children: [
                {
                  id: 'mariner-4-1965',
                  year: '1965',
                  name: 'Mariner 4',
                  agency: 'NASA',
                  result: 'Первые крупные снимки поверхности Марса с пролёта',
                  children: [
                    {
                      id: 'viking-1976',
                      year: '1976',
                      name: 'Viking',
                      agency: 'NASA',
                      result:
                        'Первая успешная посадка на Марс и передача данных с поверхности',
                      children: [
                        {
                          id: 'voyager-1977',
                          year: '1977',
                          name: 'Voyager',
                          agency: 'NASA',
                          result:
                            'Межпланетные зонды — внешние планеты и межзвёздное пространство',
                          children: [
                            {
                              id: 'perseverance-2021',
                              year: '2021',
                              name: 'Perseverance',
                              agency: 'NASA',
                              result: 'Марсоход и сбор образцов для будущей доставки на Землю',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'hubble-1990',
          year: '1990',
          name: 'Hubble',
          agency: 'NASA/ESA',
          result: 'Орбитальная обсерватория — революция в наблюдательной астрономии',
          children: [
            {
              id: 'jwst-2021',
              year: '2021',
              name: 'James Webb',
              agency: 'NASA/ESA',
              result: 'Инфракрасная обсерватория — ранняя Вселенная и экзопланеты',
            },
          ],
        },
        {
          id: 'falcon-9-2015',
          year: '2015',
          name: 'Falcon 9',
          agency: 'SpaceX',
          result: 'Первая успешная посадка ступени носителя — эра многоразовых запусков',
          children: [
            {
              id: 'crew-dragon-2020',
              year: '2020',
              name: 'Crew Dragon',
              agency: 'SpaceX/NASA',
              result: 'Коммерческий пилотируемый полёт к МКС из США',
            },
            {
              id: 'starlink-2019',
              year: '2019',
              name: 'Starlink',
              agency: 'SpaceX',
              result: 'Массовое спутниковое созвездие — глобальный интернет с орбиты',
            },
          ],
        },
        {
          id: 'artemis-2022',
          year: '2022',
          name: 'Artemis I',
          agency: 'NASA',
          result: 'Возобновление лунной программы — испытательный полёт Orion',
          children: [
            {
              id: 'chang-e-4-2019',
              year: '2019',
              name: 'Chang\'e 4',
              agency: 'КНР',
              result: 'Первая мягкая посадка на обратной стороне Луны',
            },
            {
              id: 'mars-future',
              year: '2030+',
              name: 'Марс (планы)',
              agency: 'Международная',
              result:
                'Подготовка пилотируемых миссий и посадочных систем для Красной планеты',
            },
          ],
        },
        {
          id: 'spinoffs-root',
          year: '1960+',
          name: 'На пользу Земле',
          agency: 'Разные',
          kind: 'spinoff',
          linkStyle: 'dashed',
          result:
            'Технологии космических программ, нашедшие гражданское применение — не сами миссии',
          children: [
            {
              id: 'temper-foam',
              year: '1966',
              name: 'Термопенопласт',
              agency: 'NASA',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result:
                'Амортизирующий материал для кресел и шлемов — позже матрасы и медицинские изделия',
            },
            {
              id: 'freeze-dried-food',
              year: '1960-е',
              name: 'Сублимационная сушка',
              agency: 'NASA',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result: 'Питание для длительных полётов — сегодня продукты быстрого приготовления',
            },
            {
              id: 'water-purification',
              year: '1970+',
              name: 'Очистка воды',
              agency: 'NASA',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result:
                'Системы регенерации воды на станциях — фильтры и технологии для быта и медицины',
            },
            {
              id: 'gnss-civilian',
              year: '1980+',
              name: 'Спутниковая навигация',
              agency: 'США / РФ / ЕС',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result: 'GPS, ГЛОНАСС и Galileo — геолокация, транспорт и точное время',
            },
            {
              id: 'cordless-tools',
              year: '1970-е',
              name: 'Беспроводные инструменты',
              agency: 'NASA / промышленность',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result:
                'Компактные аккумуляторные инструменты, изначально разрабатывавшиеся для космоса',
            },
            {
              id: 'earth-observation',
              year: '1972+',
              name: 'ДЗЗ для граждан',
              agency: 'NASA / ESA',
              kind: 'spinoff',
              linkStyle: 'dashed',
              result:
                'Спутниковые снимки — прогноз погоды, сельское хозяйство и мониторинг катастроф',
            },
          ],
        },
      ],
    },
  ],
}

export function getAllExpandableIds(root: MissionNode = missionTree): string[] {
  const ids: string[] = []

  function walk(node: MissionNode) {
    if (node.children?.length) {
      ids.push(node.id)
      node.children.forEach(walk)
    }
  }

  walk(root)
  return ids
}

export function flattenMissions(root: MissionNode = missionTree): MissionNode[] {
  const rows: MissionNode[] = []

  function walk(node: MissionNode) {
    rows.push(node)
    node.children?.forEach(walk)
  }

  walk(root)
  return rows
}

export function findMissionNode(
  id: string,
  root: MissionNode = missionTree,
): MissionNode | null {
  if (root.id === id) return root
  for (const child of root.children ?? []) {
    const found = findMissionNode(id, child)
    if (found) return found
  }
  return null
}

/** Цепочка id от корня до узла — для раскрытия ветки при выборе в таблице. */
export function getMissionPathIds(
  id: string,
  root: MissionNode = missionTree,
  trail: string[] = [],
): string[] | null {
  const nextTrail = [...trail, root.id]
  if (root.id === id) return nextTrail
  for (const child of root.children ?? []) {
    const found = getMissionPathIds(id, child, nextTrail)
    if (found) return found
  }
  return null
}

export function getAncestorIds(id: string): string[] {
  const path = getMissionPathIds(id)
  if (!path) return []
  return path.slice(0, -1)
}

function parseMissionYear(year: string): number {
  const value = Number.parseInt(year, 10)
  return Number.isFinite(value) ? value : 9999
}

export const missions = flattenMissions().sort(
  (a, b) => parseMissionYear(a.year) - parseMissionYear(b.year),
)

export function missionKindLabel(kind: MissionKind | undefined): string | null {
  if (kind === 'precursor') return 'Предшественник'
  if (kind === 'spinoff') return 'Гражданское применение'
  return null
}
