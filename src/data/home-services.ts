/** Homepage services: the five offerings the business builds. One primary link each; descriptions kept short. */
export interface HomeService {
  key: string;
  title: string;
  text: string;
  /** Group for the editorial layout. */
  group: 'remodel' | 'new';
  href: string;
  linkLabel: string;
}

export const homeServices: HomeService[] = [
  { key: 'fh', group: 'remodel', title: 'Full Home Remodeling', text: 'Whole-house renovations that rework the layout, systems and finishes under one plan.', href: '/services/full-home-remodeling/', linkLabel: 'Full home remodeling' },
  { key: 'kb', group: 'remodel', title: 'Kitchen & Bathroom Remodeling', text: 'Kitchens and bathrooms rebuilt around daily use, from the layout to the waterproofing and finishes.', href: '/services/kitchen-remodeling/', linkLabel: 'Kitchen remodeling' },
  { key: 'ad', group: 'new', title: 'Home Additions', text: 'Added rooms and second stories that tie into the structure and style of the house you have.', href: '/services/home-additions/', linkLabel: 'Home additions' },
  { key: 'adu', group: 'new', title: 'ADU Construction', text: 'Detached, attached and garage-conversion accessory dwelling units.', href: '/services/adu-construction/', linkLabel: 'ADU construction' },
  { key: 'cu', group: 'new', title: 'Custom Home Building', text: 'New homes planned from the site up, built from your architect’s or designer’s plans.', href: '/services/custom-home-construction/', linkLabel: 'Custom home building' },
];
