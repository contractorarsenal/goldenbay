/** Homepage content. Copy here is general homeowner education or factual description; it makes NO unconfirmed operating promises. */
export const heroLinks = [
  { label: 'Full Remodels', href: '/services/full-home-remodeling/' },
  { label: 'Additions', href: '/services/home-additions/' },
  { label: 'ADUs', href: '/services/adu-construction/' },
  { label: 'Kitchens & Baths', href: '/services/kitchen-remodeling/' },
  { label: 'Custom Builds', href: '/services/custom-home-construction/' },
];

export interface Tile { media?: { slug: string; i: number }[]; num: string; title: string; text: string; scope: string[]; links: { label: string; href: string }[]; tone: 'ink' | 'stone' | 'paper' | 'gold'; span: string }
export const serviceTiles: Tile[] = [
  { num: '01', title: 'Full Home Remodeling', tone: 'ink', span: 'a', text: 'Whole-house renovations that rework layout, systems and finishes under one scope.', scope: ['Opening and reconfiguring floor plans', 'Updating older electrical and plumbing', 'Coordinated finishes, room to room'], links: [{ label: 'Full home remodeling', href: '/services/full-home-remodeling/' }] },
  { num: '02', title: 'Home Additions', tone: 'stone', span: 'b', text: 'Added rooms and second stories that tie into the structure and style of the house you have.', scope: ['Primary suites and family rooms', 'Second-story additions', 'Roof, framing and systems tie-ins'], links: [{ label: 'Home additions', href: '/services/home-additions/' }] },
  { num: '03', title: 'ADU Construction', tone: 'paper', span: 'c', text: 'Detached, attached and garage-conversion accessory dwelling units.', scope: ['Detached and attached units', 'Garage conversions', 'San José permitting context'], links: [{ label: 'ADU construction', href: '/services/adu-construction/' }, { label: 'San Jose ADU guide', href: '/guides/san-jose-adu-guide/' }] },
  { num: '04', title: 'Kitchen & Bathroom Remodeling', tone: 'gold', span: 'd', media: [{ slug: 'kitchen-remodel', i: 0 }, { slug: 'bathroom-stone-shower-terracotta-floor', i: 0 }], text: 'Rooms rebuilt around daily use, with the planning, waterproofing and trades behind the finish.', scope: ['Layout, storage and lighting', 'Waterproofing and ventilation', 'Cabinetry, tile and fixtures'], links: [{ label: 'Kitchen remodeling', href: '/services/kitchen-remodeling/' }, { label: 'Bathroom remodeling', href: '/services/bathroom-remodeling/' }] },
  { num: '05', title: 'Custom Home Building', tone: 'ink', span: 'e', text: 'New homes planned from the site up, built from your architect’s or designer’s plans.', scope: ['Site and feasibility review', 'Builder input before plans are final', 'Staged inspections to final'], links: [{ label: 'Custom home building', href: '/services/custom-home-construction/' }] },
];

export const contractorChecks = [
  { topic: 'Communication', ask: 'Who is my point of contact, and how will I hear about progress and decisions?', good: 'A named person and an agreed routine, written into the contract, not a promise made in conversation.' },
  { topic: 'Project Budget', ask: 'What is included and excluded, what are the allowances, and how are changes priced?', good: 'A written scope with line-item clarity and a stated change-order process, with changes agreed before work happens.' },
  { topic: 'Planning', ask: 'What gets decided before demolition: selections, ordering, plans, permits?', good: 'Long-lead items identified early, and decisions scheduled so work is not left waiting on them.' },
  { topic: 'Timelines', ask: 'What does the schedule depend on, and what is outside your control?', good: 'Honest ranges that separate construction time from design, permitting and material lead times.' },
  { topic: 'Quality', ask: 'Which layers get inspected before they are covered, and who checks them?', good: 'Staged inspections and a clear walk-through at the end, with any punch-list items documented.' },
  { topic: 'Permits and Inspections', ask: 'Which permits does my project need, and who prepares and submits them?', good: 'A plain explanation of what the city requires for your scope, and no guarantee of approval dates.' },
];

/** Homepage FAQ. Deliberately excludes questions the accordion already answers (permits, change orders, license check is in the accordion footnote). */
export const homeFaqKeys = ['Where does Gold Bay Builders work?', 'How do I start a project?', 'Can you build from my architect’s plans?', 'Can I stay in my home during a remodel?', 'Can I add an ADU and split my lot under SB 9?'];

/** Homepage hero photo (full-bleed background). */
export const heroPhoto = { slug: 'bathroom-blue-tile-soaking-tub', i: 0, label: 'Bathroom remodel' };
