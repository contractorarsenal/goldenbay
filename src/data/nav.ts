import { services } from './services';
export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', desktop: false, children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })) },
  { label: 'Our Projects', href: '/projects/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Contact', href: '/contact/' },
];
export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
];
