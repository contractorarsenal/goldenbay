/** Homepage services: the five service offerings, in the order the client listed them. Copy matches the service pages in services.ts. */
export interface HomeService {
  key: string;
  title: string;
  text: string;
  scope: string[];
  links: { label: string; href: string }[];
}

export const homeServices: HomeService[] = [
  {
    key: 'fh',
    title: 'Full Home Remodeling',
    text: 'Whole-house renovations that rework layout, systems and finishes under one scope.',
    scope: ['Reconfigured floor plans', 'Updated electrical and plumbing', 'Coordinated finishes'],
    links: [{ label: 'Full home remodeling', href: '/services/full-home-remodeling/' }],
  },
  {
    key: 'ad',
    title: 'Home Additions',
    text: 'Added rooms and second stories that tie into the structure and style of the house you have.',
    scope: ['Primary suites and family rooms', 'Second-story additions', 'Roof and framing tie-ins'],
    links: [{ label: 'Home additions', href: '/services/home-additions/' }],
  },
  {
    key: 'adu',
    title: 'ADU Construction',
    text: 'Detached, attached and garage-conversion accessory dwelling units.',
    scope: ['Detached and attached units', 'Garage conversions', 'San José permit context'],
    links: [{ label: 'ADU construction', href: '/services/adu-construction/' }, { label: 'San Jose ADU guide', href: '/guides/san-jose-adu-guide/' }],
  },
  {
    key: 'kb',
    title: 'Kitchen & Bathroom Remodeling',
    text: 'Rooms rebuilt around daily use, with the planning, waterproofing and trades behind the finish.',
    scope: ['Layout, storage and lighting', 'Waterproofing and ventilation', 'Cabinetry, tile and fixtures'],
    links: [{ label: 'Kitchen remodeling', href: '/services/kitchen-remodeling/' }, { label: 'Bathroom remodeling', href: '/services/bathroom-remodeling/' }],
  },
  {
    key: 'cu',
    title: 'Custom Home Building',
    text: 'New homes planned from the site up, built from your architect’s or designer’s plans.',
    scope: ['Site and feasibility review', 'Builder input before plans are final', 'Staged inspections to final'],
    links: [{ label: 'Custom home building', href: '/services/custom-home-construction/' }],
  },
];
