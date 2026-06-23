/** Путь к файлу из public/ с учётом Vite base (например /astrum/). */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL
  const normalized = path.replace(/^\//, '')
  return `${base}${normalized}`
}
