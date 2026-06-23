export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'

/** start — к верху под шапкой; upper — то же, для высоких блоков (графы) */
export type TourScrollAlign = 'center' | 'start' | 'upper'

export type TourStep = {
  id: string
  route: string
  target?: string
  title: string
  body: string
  placement?: TourPlacement
  /** Задержка после перехода на страницу (мс), для тяжёлых блоков вроде графов */
  mountDelay?: number
  scrollAlign?: TourScrollAlign
  /** Не переносить карточку на противоположную сторону от placement */
  cardPinned?: boolean
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    route: '/',
    title: 'Добро пожаловать на Astrum',
    body: 'Краткий тур по платформе: главная, три тематических раздела с интерактивом, о проекте и контакты. Можно пропустить в любой момент.',
    placement: 'center',
  },
  {
    id: 'hero',
    route: '/',
    target: '.hero-content-inner',
    title: 'Главный экран',
    body: 'Точка входа: миссия платформы и призыв исследовать космос. Отсюда начинается знакомство с Astrum.',
    placement: 'bottom',
  },
  {
    id: 'features',
    route: '/',
    target: '#features',
    title: 'Обзор разделов',
    body: 'Три направления — возможности, технологии и исследования. Каждый блок ведёт на отдельную страницу с материалами.',
    placement: 'top',
  },
  {
    id: 'opportunities-graph',
    route: '/opportunities',
    target: '[data-tour="career-graph"]',
    title: 'Граф профессий',
    body: 'Интерактивная карта связей между специальностями. Наведение и клик синхронизированы с таблицей ниже.',
    placement: 'bottom',
    mountDelay: 420,
    scrollAlign: 'upper',
    cardPinned: true,
  },
  {
    id: 'technologies-table',
    route: '/technologies',
    target: '[data-tour="tech-table"]',
    title: 'Технологии отрасли',
    body: 'Сводная таблица направлений и стадий внедрения — от серийных решений до исследовательских программ.',
    placement: 'top',
  },
  {
    id: 'exploration-tree',
    route: '/exploration',
    target: '[data-tour="mission-tree"]',
    title: 'Дерево миссий',
    body: 'Хронология как разветвлённое дерево: от V-2 к Спутнику и дальше по веткам. «+» и «−» сворачивают ветки, клик по узлу подсвечивает таблицу.',
    placement: 'bottom',
    mountDelay: 420,
    scrollAlign: 'upper',
    cardPinned: true,
  },
  {
    id: 'about',
    route: '/about',
    target: '[data-tour="page-intro"]',
    title: 'О проекте',
    body: 'Миссия Astrum, принципы контента и навигация по всем разделам платформы.',
    placement: 'bottom',
  },
  {
    id: 'contacts',
    route: '/contacts',
    target: '[data-tour="contacts-cards"]',
    title: 'Контакты',
    body: 'Обратная связь, email редакции и ссылки на материалы. Тур завершён — исследуйте разделы в своём темпе.',
    placement: 'top',
  },
]
