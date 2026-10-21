import { business, abs } from '../data/business';

const orgId = () => abs('/#organization');

/** Only verified, visible facts. No ratings, address, hours, license or sameAs until supplied. */
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
  '@id': orgId(),
  name: business.name,
  alternateName: business.shortName,
  slogan: business.tagline,
  url: abs('/'),
  telephone: '+1-408-506-7184',
  email: business.email,
  areaServed: { '@type': 'City', name: 'San Jose', containedInPlace: { '@type': 'State', name: 'California' } },
  founder: { '@type': 'Person', name: business.owner },
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

export const webPageSchema = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org', '@type': 'WebPage', name, description, url: abs(path), isPartOf: { '@id': abs('/#website') }, about: { '@id': orgId() },
});

export const serviceSchema = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org', '@type': 'Service', name, description, url: abs(path),
  provider: { '@id': orgId() }, areaServed: { '@type': 'City', name: 'San Jose' },
});

export const articleSchema = (headline: string, path: string, description: string, datePublished: string, dateModified: string) => ({
  '@context': 'https://schema.org', '@type': 'Article', headline, description, url: abs(path), datePublished, dateModified,
  author: { '@id': orgId() }, publisher: { '@id': orgId() }, mainEntityOfPage: abs(path),
});
