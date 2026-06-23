export type TechStatus = 'Серийное' | 'Внедрение' | 'Тестирование' | 'Исследование'

export type Technology = {
  id: string
  name: string
  use: string
  status: TechStatus
}

export const technologies: Technology[] = [
  {
    id: 'reusable-stages',
    name: 'Многоразовые ступени',
    use: 'Снижение стоимости вывода на орбиту',
    status: 'Серийное',
  },
  {
    id: 'liquid-engines',
    name: 'Жидкостные двигатели',
    use: 'Основные тяговые установки носителей',
    status: 'Серийное',
  },
  {
    id: 'ion-propulsion',
    name: 'Ионные двигатели',
    use: 'Длительные межпланетные перелёты',
    status: 'Внедрение',
  },
  {
    id: 'composite-materials',
    name: 'Композитные материалы',
    use: 'Лёгкие и прочные конструкции ракет и спутников',
    status: 'Серийное',
  },
  {
    id: 'thermal-protection',
    name: 'Теплозащита',
    use: 'Вход в атмосферу и работа в экстремальных температурах',
    status: 'Серийное',
  },
  {
    id: 'cubesat-platforms',
    name: 'Платформы CubeSat',
    use: 'Доступные малые спутники для науки и связи',
    status: 'Серийное',
  },
  {
    id: 'optical-downlink',
    name: 'Оптическая связь',
    use: 'Высокоскоростная передача данных со спутников',
    status: 'Тестирование',
  },
  {
    id: 'gnss-constellations',
    name: 'Навигационные созвездия',
    use: 'Глобальное позиционирование и точное время',
    status: 'Серийное',
  },
  {
    id: 'remote-sensing',
    name: 'Дистанционное зондирование',
    use: 'Мониторинг Земли, климата и инфраструктуры',
    status: 'Серийное',
  },
  {
    id: 'onboard-ai',
    name: 'Бортовая обработка данных',
    use: 'Автономный отбор и сжатие информации на орбите',
    status: 'Внедрение',
  },
  {
    id: 'flight-software',
    name: 'Бортовое ПО',
    use: 'Управление аппаратом, ориентацией и полезной нагрузкой',
    status: 'Серийное',
  },
  {
    id: 'life-support',
    name: 'Системы жизнеобеспечения',
    use: 'Поддержание среды для экипажа на орбите и в длительных миссиях',
    status: 'Серийное',
  },
  {
    id: 'isru',
    name: 'Использование ресурсов других тел',
    use: 'Производство топлива и материалов на Луне и Марсе',
    status: 'Исследование',
  },
  {
    id: 'nuclear-space',
    name: 'Космические ядерные системы',
    use: 'Питание дальних аппаратов и тяга для глубокого космоса',
    status: 'Исследование',
  },
]

export function techStatusClass(status: TechStatus): string {
  if (status === 'Серийное') return 'tech-status-serial'
  if (status === 'Внедрение') return 'tech-status-deploy'
  if (status === 'Тестирование') return 'tech-status-test'
  return 'tech-status-research'
}
