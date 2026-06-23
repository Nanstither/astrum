import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL } from '../../data/site'

interface SeoHeadProps {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  schema?: Record<string, unknown>
}

export default function SeoHead({
  title,
  description,
  path,
  type = 'website',
  schema,
}: SeoHeadProps) {
  const url = `${SITE_URL}${path}`
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  const ogImage = `${SITE_URL}/og-image.svg`

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description,
    url,
    inLanguage: 'ru-RU',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json">{JSON.stringify(schema ?? defaultSchema)}</script>
    </Helmet>
  )
}
