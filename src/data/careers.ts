export type Demand = 'Высокий' | 'Средний' | 'Низкий'

export type FieldSlug =
  | 'rockets'
  | 'satellites'
  | 'science'
  | 'flights'
  | 'ground'
  | 'data'
  | 'commercial'

export type Career = {
  id: string
  role: string
  field: string
  fieldSlug: FieldSlug
  demand: Demand
}

export type CareerLink = {
  source: string
  target: string
}

export type FieldMeta = {
  slug: FieldSlug
  label: string
  shortLabel: string
  hubId: string
  color: string
}

export const fieldMeta: FieldMeta[] = [
  { slug: 'rockets', label: 'Ракетостроение', shortLabel: 'Ракеты', hubId: 'field:rockets', color: '#7c6cff' },
  { slug: 'satellites', label: 'Спутники и связь', shortLabel: 'Спутники', hubId: 'field:satellites', color: '#5ecfff' },
  { slug: 'science', label: 'Наука', shortLabel: 'Наука', hubId: 'field:science', color: '#9b8fff' },
  { slug: 'flights', label: 'Полёты и подготовка', shortLabel: 'Полёты', hubId: 'field:flights', color: '#ff8f6b' },
  { slug: 'ground', label: 'Наземная инфраструктура', shortLabel: 'Наземная', hubId: 'field:ground', color: '#6ee7b7' },
  { slug: 'data', label: 'Данные и ПО', shortLabel: 'Данные', hubId: 'field:data', color: '#fbbf24' },
  { slug: 'commercial', label: 'Коммерческий сектор', shortLabel: 'Коммерция', hubId: 'field:commercial', color: '#f472b6' },
]

export const fieldColorBySlug = Object.fromEntries(
  fieldMeta.map((f) => [f.slug, f.color]),
) as Record<FieldSlug, string>

export const careers: Career[] = [
  { id: 'rocket-designer', role: 'Инженер-конструктор', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Высокий' },
  { id: 'propulsion-engineer', role: 'Инженер по двигателям', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Высокий' },
  { id: 'avionics-engineer', role: 'Инженер бортовых систем', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Высокий' },
  { id: 'structural-analyst', role: 'Инженер-прочнист', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Средний' },
  { id: 'thermal-engineer', role: 'Инженер теплозащиты', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Средний' },
  { id: 'launch-ops', role: 'Специалист по пускам', field: 'Ракетостроение', fieldSlug: 'rockets', demand: 'Средний' },

  { id: 'satellite-designer', role: 'Конструктор спутников', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Высокий' },
  { id: 'payload-engineer', role: 'Инженер полезной нагрузки', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Высокий' },
  { id: 'rf-engineer', role: 'Инженер радиосвязи', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Высокий' },
  { id: 'gnss-specialist', role: 'Специалист по навигации', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Средний' },
  { id: 'constellation-planner', role: 'Планировщик орбитальных группировок', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Средний' },
  { id: 'ttc-operator', role: 'Оператор наземных станций', field: 'Спутники и связь', fieldSlug: 'satellites', demand: 'Средний' },

  { id: 'astrophysicist', role: 'Астрофизик-исследователь', field: 'Наука', fieldSlug: 'science', demand: 'Средний' },
  { id: 'planetary-scientist', role: 'Планетолог', field: 'Наука', fieldSlug: 'science', demand: 'Средний' },
  { id: 'space-medicine', role: 'Специалист по космической медицине', field: 'Наука', fieldSlug: 'science', demand: 'Средний' },
  { id: 'materials-scientist', role: 'Материаловед', field: 'Наука', fieldSlug: 'science', demand: 'Средний' },
  { id: 'lab-technician', role: 'Лаборант исследовательской лаборатории', field: 'Наука', fieldSlug: 'science', demand: 'Низкий' },
  { id: 'science-communicator', role: 'Научный популяризатор', field: 'Наука', fieldSlug: 'science', demand: 'Низкий' },

  { id: 'astronaut', role: 'Космонавт / астронавт', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Низкий' },
  { id: 'flight-controller', role: 'Оператор полётов', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Высокий' },
  { id: 'mission-planner', role: 'Планировщик миссий', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Средний' },
  { id: 'eva-specialist', role: 'Инструктор выходов в открытый космос', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Средний' },
  { id: 'life-support', role: 'Инженер систем жизнеобеспечения', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Средний' },
  { id: 'crew-trainer', role: 'Инструктор экипажей', field: 'Полёты и подготовка', fieldSlug: 'flights', demand: 'Средний' },

  { id: 'range-engineer', role: 'Инженер космодрома', field: 'Наземная инфраструктура', fieldSlug: 'ground', demand: 'Средний' },
  { id: 'antenna-tech', role: 'Техник антенных комплексов', field: 'Наземная инфраструктура', fieldSlug: 'ground', demand: 'Средний' },
  { id: 'facility-manager', role: 'Менеджер наземного комплекса', field: 'Наземная инфраструктура', fieldSlug: 'ground', demand: 'Средний' },
  { id: 'safety-officer', role: 'Инженер по безопасности пусков', field: 'Наземная инфраструктура', fieldSlug: 'ground', demand: 'Высокий' },
  { id: 'logistics-coord', role: 'Координатор логистики', field: 'Наземная инфраструктура', fieldSlug: 'ground', demand: 'Средний' },

  { id: 'data-scientist', role: 'Специалист по данным', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Высокий' },
  { id: 'remote-sensing', role: 'Аналитик дистанционного зондирования', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Высокий' },
  { id: 'gis-specialist', role: 'ГИС-специалист', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Высокий' },
  { id: 'flight-software', role: 'Разработчик бортового ПО', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Высокий' },
  { id: 'simulation-engineer', role: 'Инженер моделирования', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Средний' },
  { id: 'cybersecurity', role: 'Специалист по кибербезопасности', field: 'Данные и ПО', fieldSlug: 'data', demand: 'Средний' },

  { id: 'newspace-pm', role: 'Менеджер космического проекта', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Высокий' },
  { id: 'business-dev', role: 'Менеджер по развитию бизнеса', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Средний' },
  { id: 'regulatory', role: 'Специалист по лицензированию запусков', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Средний' },
  { id: 'insurance-analyst', role: 'Аналитик космического страхования', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Низкий' },
  { id: 'manufacturing', role: 'Инженер серийного производства', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Высокий' },
  { id: 'venture-analyst', role: 'Аналитик космических стартапов', field: 'Коммерческий сектор', fieldSlug: 'commercial', demand: 'Средний' },
]

function linkWithinField(slug: FieldSlug): CareerLink[] {
  const ids = careers.filter((c) => c.fieldSlug === slug).map((c) => c.id)
  const links: CareerLink[] = []
  for (let i = 0; i < ids.length - 1; i += 1) {
    links.push({ source: ids[i], target: ids[i + 1] })
    if (i % 2 === 0 && i + 2 < ids.length) {
      links.push({ source: ids[i], target: ids[i + 2] })
    }
  }
  return links
}

function hubLinks(): CareerLink[] {
  return careers.map((c) => {
    const hub = fieldMeta.find((f) => f.slug === c.fieldSlug)!
    return { source: hub.hubId, target: c.id }
  })
}

const bridgeLinks: CareerLink[] = [
  { source: 'rocket-designer', target: 'satellite-designer' },
  { source: 'propulsion-engineer', target: 'launch-ops' },
  { source: 'launch-ops', target: 'range-engineer' },
  { source: 'payload-engineer', target: 'remote-sensing' },
  { source: 'rf-engineer', target: 'antenna-tech' },
  { source: 'flight-controller', target: 'flight-software' },
  { source: 'mission-planner', target: 'simulation-engineer' },
  { source: 'materials-scientist', target: 'thermal-engineer' },
  { source: 'planetary-scientist', target: 'remote-sensing' },
  { source: 'newspace-pm', target: 'constellation-planner' },
  { source: 'manufacturing', target: 'rocket-designer' },
  { source: 'data-scientist', target: 'gis-specialist' },
  { source: 'eva-specialist', target: 'life-support' },
  { source: 'safety-officer', target: 'launch-ops' },
  { source: 'regulatory', target: 'range-engineer' },
]

const hubBridgeLinks: CareerLink[] = [
  { source: 'field:rockets', target: 'field:ground' },
  { source: 'field:satellites', target: 'field:data' },
  { source: 'field:flights', target: 'field:science' },
  { source: 'field:commercial', target: 'field:rockets' },
  { source: 'field:commercial', target: 'field:satellites' },
  { source: 'field:data', target: 'field:science' },
]

export const careerLinks: CareerLink[] = [
  ...fieldMeta.flatMap((f) => linkWithinField(f.slug)),
  ...hubLinks(),
  ...bridgeLinks,
  ...hubBridgeLinks,
]

export function demandClass(demand: Demand): string {
  if (demand === 'Высокий') return 'demand-high'
  if (demand === 'Средний') return 'demand-medium'
  return 'demand-low'
}

const GENERIC_LEAD =
  /^(инженер|специалист|менеджер|аналитик|техник|координатор|инструктор|оператор|разработчик|планировщик|лаборант|научный)\s+/i

function splitLabelLines(text: string, maxLen = 16): string[] {
  if (text.length <= maxLen) return [text]

  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLen && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines.slice(0, 2)
}

/** Короткие, но различимые подписи для узлов графа (1–2 строки). */
export function graphRoleLines(role: string): string[] {
  const normalized = role.replace(/\s*\/\s*/g, ' / ').trim()

  if (normalized.length <= 20) {
    return splitLabelLines(normalized, 18)
  }

  const byPo = normalized.match(/^(.+?)\s+по\s+(.+)$/i)
  if (byPo) {
    return splitLabelLines(byPo[2], 16)
  }

  if (normalized.includes('-')) {
    const [lead, tail] = normalized.split('-')
    if (/^инженер$/i.test(lead.trim()) && tail) {
      return splitLabelLines(tail.trim(), 16)
    }
    if (normalized.length <= 24) {
      return splitLabelLines(normalized, 18)
    }
  }

  const withoutLead = normalized.replace(GENERIC_LEAD, '')
  if (withoutLead !== normalized) {
    return splitLabelLines(withoutLead, 16)
  }

  return splitLabelLines(normalized, 16)
}
