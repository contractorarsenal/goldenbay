/** Per-service answer-engine content: a direct, extractable answer and an at-a-glance fact strip. Only general, non-promissory facts. */
export interface Extras {
  title: string;              // H2 for the overview section (avoids lowercasing acronyms like ADU)
  quickAnswer: string;
  glance: { label: string; value: string }[];
  guides: { href: string; label: string }[];
}
const budget = { href: '/guides/bay-area-remodeling-budget/', label: 'Remodeling budget guide' };
const adu = { href: '/guides/san-jose-adu-guide/', label: 'San Jose ADU guide' };
export const extras: Record<string, Extras> = {
  'full-home-remodeling': {
    title: 'What a full home remodel involves',
    quickAnswer: 'A full home remodel changes several rooms and building systems under one scope, so layout, plumbing, electrical and finishes are planned and sequenced together instead of room by room.',
    glance: [{ label: 'Scope', value: 'Several rooms and systems, one plan' }, { label: 'Permits', value: 'Usually required' }, { label: 'Plans', value: 'Often needed for layout changes' }, { label: 'Best for', value: 'Dated or poorly arranged homes' }],
    guides: [budget, adu],
  },
  'home-additions': {
    title: 'What a home addition involves',
    quickAnswer: 'A home addition adds living space by building outward or upward, which means new foundation or framing, a roof tie-in, and connections to existing plumbing, electrical and HVAC.',
    glance: [{ label: 'Types', value: 'Bump-out, new wing, second story' }, { label: 'Permits', value: 'Required, with plan review' }, { label: 'Engineering', value: 'Usually required' }, { label: 'Check first', value: 'Setbacks, height, lot coverage' }],
    guides: [budget, adu],
  },
  'adu-construction': {
    title: 'What building an ADU involves',
    quickAnswer: 'An ADU (accessory dwelling unit) is a complete, independent home on a residential lot: detached, attached or converted from a garage. State law limits how cities can restrict them, but your lot determines what is practical.',
    glance: [{ label: 'Types', value: 'Detached, attached, garage conversion, JADU' }, { label: 'Permits', value: 'Required (City of San José)' }, { label: 'Fees', value: 'Park/school fees waived under 750 sq ft per the City' }, { label: 'Cost drivers', value: 'Site work and utilities' }],
    guides: [adu, budget],
  },
  'kitchen-remodeling': {
    title: 'What a kitchen remodel involves',
    quickAnswer: 'A kitchen remodel replaces or reorganizes cabinets, counters, appliances, lighting and utilities. Keeping plumbing and gas lines where they are keeps costs down; relocating them adds work.',
    glance: [{ label: 'Trades', value: 'Plumbing, electrical, cabinetry, tile, countertops' }, { label: 'Permits', value: 'Required for moved utilities or walls' }, { label: 'Long lead', value: 'Cabinets, appliances, stone' }, { label: 'Biggest lever', value: 'Layout changes' }],
    guides: [budget],
  },
  'bathroom-remodeling': {
    title: 'What a bathroom remodel involves',
    quickAnswer: 'A bathroom remodel combines plumbing, waterproofing, ventilation, tile and fixtures in a small space. The waterproofing behind the tile does more for longevity than the finish you see.',
    glance: [{ label: 'Critical layer', value: 'Waterproofing system' }, { label: 'Permits', value: 'Required for moved plumbing/electrical' }, { label: 'Long lead', value: 'Custom glass, specialty tile' }, { label: 'Add-ons', value: 'Curbless shower, grab-bar blocking' }],
    guides: [budget],
  },
  'custom-home-construction': {
    title: 'What building a custom home involves',
    quickAnswer: 'Building a custom home runs through site evaluation, design, engineering, permitting and construction. Involving a builder before plans are final helps align the design with the budget.',
    glance: [{ label: 'Phases', value: 'Site, design, permits, build' }, { label: 'Start with', value: 'Site feasibility and budget' }, { label: 'Design team', value: 'Architect or designer of your choice' }, { label: 'Timing', value: 'Design and permits often rival build time' }],
    guides: [adu, budget],
  },
};
