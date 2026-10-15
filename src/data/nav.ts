import { services } from './services';
export const primaryNav = [
  { label: 'Services', href: '/services/', children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })) },
  { label: 'Projects', href: '/projects/' },
  { label: 'Process', href: '/our-process/' },
  { label: 'About', href: '/about/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Contact', href: '/contact/' },
];
export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
];
