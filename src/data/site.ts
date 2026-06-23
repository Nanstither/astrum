export const SITE_URL = 'https://nanstither.github.io/astrum'
export const SITE_NAME = 'Astrum'

export const navLinks = [
  { to: '/about', label: 'О проекте' },
  { to: '/opportunities', label: 'Возможности' },
  { to: '/technologies', label: 'Технологии' },
  { to: '/exploration', label: 'Исследования' },
  { to: '/contacts', label: 'Контакты' },
] as const

export const footerLinks = [...navLinks] as const
