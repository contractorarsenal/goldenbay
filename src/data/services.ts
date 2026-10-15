export interface Faq { q: string; a: string }
export interface Service {
  slug: string; name: string; num: string; short: string;
  metaTitle: string; metaDescription: string;
  headline: string; lede: string;
  overview: string[];
  projectTypes: { title: string; text: string }[];
  concernsTitle: string;
  concerns: { title: string; text: string }[];
  planningTitle: string;
  planning: string[];
  beforeEstimate: string[];
  faqs: Faq[];
  related: string[];
  layout: 'split' | 'editorial' | 'numbered';
  /** Project category this service maps to in the portfolio. */
  category: string;
}

export const services: Service[] = [
  {
    slug: 'full-home-remodeling', name: 'Full Home Remodeling', num: '01', layout: 'editorial', category: 'Remodel',
    short: 'Whole-house renovations that rework layout, systems and finishes together under one plan.',
    metaTitle: 'Full Home Remodeling in San Jose, CA',
    metaDescription: 'Whole-house remodeling in San Jose from Golden Bay Builders: layout changes, updated systems and finishes coordinated under a single scope and schedule.',
    headline: 'Whole-house remodeling, planned as one project.',
    lede: 'When several rooms need work, doing them together usually costs less in disruption and rework than doing them one at a time. We scope the whole house first, then sequence the work.',
    overview: [
      'A full home remodel touches more than finishes. Walls move, kitchens and baths are rebuilt, and electrical, plumbing and mechanical systems are often brought up to date at the same time. Because those trades overlap, the order of work matters as much as the design.',
      'Golden Bay Builders approaches a full remodel as a single coordinated scope: a defined set of rooms and systems, a written sequence, and clear decision points for you along the way.',
    ],
    projectTypes: [
      { title: 'Open the floor plan', text: 'Remove or reframe walls to connect kitchen, dining and living areas, including the structural work that requires.' },
      { title: 'Update an older home', text: 'Replace aging wiring, plumbing and finishes while keeping what is worth keeping.' },
      { title: 'Rework how the house lives', text: 'Move bedrooms, add a primary suite, create an office or improve flow between spaces.' },
      { title: 'Prepare a newly purchased home', text: 'Complete a larger scope before move-in, when the house is empty and access is easiest.' },
    ],
    concernsTitle: 'What homeowners usually worry about',
    concerns: [
      { title: 'Living through construction', text: 'Whether you stay or move out affects cost and schedule. We talk through both options before work is scheduled.' },
      { title: 'Surprises behind the walls', text: 'Older San Jose homes can hide outdated wiring, plumbing or framing. Discussing allowances and how changes are handled up front prevents disputes later.' },
      { title: 'Decision fatigue', text: 'A full remodel involves hundreds of selections. A clear selection schedule keeps orders ahead of the work that needs them.' },
    ],
    planningTitle: 'Planning considerations',
    planning: [
      'Define which rooms and systems are in scope, and which are explicitly not.',
      'Decide early whether the design comes from an architect, a designer, or your own plans, since plans drive permits and pricing.',
      'Identify structural changes first; they affect engineering, permits and schedule more than any finish choice.',
      'Plan long-lead items (windows, cabinetry, custom tile) before demolition begins.',
    ],
    beforeEstimate: ['Which rooms and systems you want to change', 'Existing drawings or photos of the home', 'Approximate age of the house and any known problems', 'Your target timeline and whether you will live in the home', 'A budget range, even a rough one'],
    faqs: [
      { q: 'What counts as a full home remodel?', a: 'Generally, a project that changes several rooms and building systems under one scope, rather than a single-room update. There is no formal threshold; we define the scope with you in writing.' },
      { q: 'Do I need plans before I contact you?', a: 'No. Many homeowners start with goals and photos. If your project needs drawings or engineering, we can discuss how to obtain them.' },
      { q: 'Will I need permits?', a: 'Most whole-house work requires permits from the City of San José or the city where you live. Permit requirements depend on scope, and approval timing is set by the city, so we cannot promise a date.' },
      { q: 'Can I stay in my home during the remodel?', a: 'Sometimes. It depends on which systems are shut down and for how long. We discuss this before scheduling.' },
    ],
    related: ['kitchen-remodeling', 'bathroom-remodeling', 'home-additions'],
  },
  {
    slug: 'home-additions', name: 'Home Additions', num: '02', layout: 'split', category: 'Addition',
    short: 'Added rooms and second stories built to integrate with the structure and style of your existing home.',
    metaTitle: 'Home Additions in San Jose, CA',
    metaDescription: 'Room additions and second-story additions in San Jose. Golden Bay Builders builds added living space that ties cleanly into your existing home.',
    headline: 'More room, built into the house you have.',
    lede: 'A good addition does not look added. It matches roof lines, window proportions and finishes, and it connects to existing structure and systems correctly.',
    overview: [
      'Additions come in two broad forms: expanding outward on the lot (a bump-out, a new wing) or upward (a second story). Each changes the foundation, framing and roof, and each must tie into existing plumbing, electrical and heating and cooling.',
      'The hardest part is the connection point, where new construction meets the old. That junction determines whether the result feels original to the house or bolted on.',
    ],
    projectTypes: [
      { title: 'Primary suite addition', text: 'A new bedroom and bath, often on the ground floor.' },
      { title: 'Second-story addition', text: 'Adds floor area without using more of the lot, but requires evaluating the existing foundation and walls.' },
      { title: 'Family room or kitchen expansion', text: 'Extends the main living area outward.' },
      { title: 'Multigenerational space', text: 'Adds bedrooms and bathrooms for relatives, sometimes with a separate entrance.' },
    ],
    concernsTitle: 'Questions that decide an addition',
    concerns: [
      { title: 'Will the lot allow it?', text: 'Setbacks, height limits and coverage rules vary by zone. This is checked before design money is spent.' },
      { title: 'Can the existing structure carry it?', text: 'Second stories in particular require an engineer to evaluate foundations and framing below.' },
      { title: 'Will it match?', text: 'Siding, roofing, windows and rooflines all need to line up for the addition to read as part of the original.' },
    ],
    planningTitle: 'What shapes scope and cost',
    planning: [
      'Footprint versus second story: building up avoids new foundation area but may require strengthening what is below.',
      'Mechanical capacity: your existing electrical panel and HVAC may need upgrading to serve the new space.',
      'Site access for equipment and materials, which varies a great deal on narrow San Jose lots.',
      'Permit and plan-review requirements, which are set by your city and take time.',
    ],
    beforeEstimate: ['A sketch or description of the space you want', 'Your lot survey or plot plan if you have one', 'Photos of the area where the addition would attach', 'Whether you have an architect or designer', 'Your preferred start window'],
    faqs: [
      { q: 'Is a second-story addition or a ground-level addition better?', a: 'It depends on your lot, budget and existing structure. Ground-level additions use yard space; second stories preserve it but need the existing structure evaluated.' },
      { q: 'Do additions require an architect?', a: 'Additions need permit-ready plans, and often structural engineering. Those can come from an architect, a designer or a plan drafter. We can discuss options.' },
      { q: 'How long does an addition take?', a: 'Design and permitting often take longer than construction, and the city controls much of that timing. We provide a schedule once scope and plans are defined.' },
      { q: 'Will an addition affect my property taxes?', a: 'It can, since new construction may be reassessed. Ask the Santa Clara County Assessor’s Office for specifics on your property.' },
    ],
    related: ['full-home-remodeling', 'adu-construction', 'custom-home-construction'],
  },
  {
    slug: 'adu-construction', name: 'ADU Construction', num: '03', layout: 'numbered', category: 'ADU',
    short: 'Detached, attached and garage-conversion accessory dwelling units, from planning through final inspection.',
    metaTitle: 'ADU Construction in San Jose, CA',
    metaDescription: 'ADU builder in San Jose: detached ADUs, attached ADUs and garage conversions. Learn what each involves and how permitting works before you start.',
    headline: 'Accessory dwelling units, built to code.',
    lede: 'An ADU is a complete, independent home on your lot. We build detached units, attached units and garage conversions, and walk you through what each requires.',
    overview: [
      'California law requires cities to allow accessory dwelling units on most residential lots, and San José publishes its own ADU guidance. What can be built on your lot, however, depends on its size, existing structures, utilities and zoning.',
      'Because an ADU has its own kitchen, bath, entrance and utilities, it is closer to building a small house than to remodeling a room. Planning the site, utility connections and permit path early saves the most time and money.',
    ],
    projectTypes: [
      { title: 'Detached ADU', text: 'A new stand-alone unit in the backyard. Offers the most privacy and design freedom, with the most site and utility work.' },
      { title: 'Attached ADU', text: 'Built onto the main house, sharing a wall. Utility connections can be simpler than for a detached unit.' },
      { title: 'Garage conversion', text: 'Converts an existing garage into living space. Uses the existing structure and slab, but the floor, insulation, egress and utilities still need work.' },
      { title: 'Junior ADU (JADU)', text: 'A small unit created inside the existing home, with size limits set by state law.' },
    ],
    concernsTitle: 'What to confirm before you commit',
    concerns: [
      { title: 'Size and setbacks', text: 'State law sets floor-area and setback protections, but your lot’s layout determines what is practical. Verify with the City of San José.' },
      { title: 'Fees', text: 'Some impact fees are waived for smaller ADUs, and larger units may be charged differently. The City’s fee page and the school district are the authorities.' },
      { title: 'Utilities', text: 'Sewer, water, gas and electrical capacity can drive cost more than the structure itself.' },
      { title: 'Returns and rent', text: 'We do not promise rental income or property-value gains. Those depend on the market and your circumstances.' },
    ],
    planningTitle: 'How an ADU project moves',
    planning: [
      'Feasibility: confirm your lot can host the type of ADU you want.',
      'Design and engineering: produce permit-ready plans.',
      'Permit submittal and plan review with the City of San José.',
      'Construction: foundation, framing, systems, finishes.',
      'Inspections and final sign-off before occupancy.',
    ],
    beforeEstimate: ['Your address and lot size', 'The type of ADU you are considering', 'Who the unit is for (family, tenant, office)', 'Whether you have plans, a survey or a designer', 'Your budget range and timeline'],
    faqs: [
      { q: 'What is the difference between an ADU and a JADU?', a: 'An ADU is a separate dwelling on the lot. A junior ADU is a smaller unit carved out of the existing home, with a size cap set by state law and its own requirements.' },
      { q: 'Can I convert my garage into an ADU?', a: 'Often yes, but the garage must be structurally suitable and meet code for living space. We evaluate it before quoting.' },
      { q: 'How long does the City take to review an ADU?', a: 'State law sets a review deadline for complete ADU applications. Actual timing depends on how complete the submittal is and on corrections. See our San José ADU guide for the sources.' },
      { q: 'Are ADUs exempt from impact fees?', a: 'The City of San José states that park and school impact fees do not apply to ADUs under 750 square feet. Larger units are treated differently, and rules are changing, so confirm with the City.' },
    ],
    related: ['home-additions', 'custom-home-construction', 'full-home-remodeling'],
  },
  {
    slug: 'kitchen-remodeling', name: 'Kitchen Remodeling', num: '04', layout: 'split', category: 'Kitchen',
    short: 'Kitchens rebuilt around how you cook, store and gather, with cabinetry, surfaces and utilities done right.',
    metaTitle: 'Kitchen Remodeling in San Jose, CA',
    metaDescription: 'Kitchen remodeling in San Jose. Layout, cabinetry, countertops, lighting and utilities handled in one coordinated project by Golden Bay Builders.',
    headline: 'A kitchen built around the way you actually cook.',
    lede: 'Good kitchens are decided by layout and storage long before finishes. We start with how you use the room, then build it with clean detailing.',
    overview: [
      'A kitchen remodel combines more trades than almost any other room: demolition, framing, plumbing, electrical, ventilation, cabinetry, countertops, tile and paint. Coordinating them in the right order keeps the room usable sooner and prevents rework.',
      'Where walls, plumbing or gas lines stay put, the budget goes further. Where you want to move them, we explain what that adds before you commit.',
    ],
    projectTypes: [
      { title: 'Full gut remodel', text: 'New layout, cabinets, counters, lighting and appliances.' },
      { title: 'Layout change', text: 'Relocating the sink, range or an island, or opening the kitchen to adjacent rooms.' },
      { title: 'Cabinet and surface refresh', text: 'Keeping the layout while replacing cabinets, counters and backsplash.' },
      { title: 'Kitchen expansion', text: 'Taking in a pantry, breakfast nook or part of an adjacent room.' },
    ],
    concernsTitle: 'What shapes a kitchen project',
    concerns: [
      { title: 'Lead time', text: 'Custom cabinets and some appliances take weeks to arrive. Ordering ahead keeps the schedule honest.' },
      { title: 'Ventilation and electrical', text: 'Range hoods, circuits and lighting often need upgrades that are invisible but required.' },
      { title: 'Storage', text: 'Pull-outs, deep drawers and a defined place for appliances matter more day to day than countertop choice.' },
    ],
    planningTitle: 'Materials and planning',
    planning: [
      'Cabinetry: stock, semi-custom and custom options differ in lead time, flexibility and cost.',
      'Countertops: quartz, natural stone and other materials differ in maintenance, edge options and fabrication time.',
      'Appliances: choose models before cabinets are finalized so openings fit.',
      'Lighting: plan task, ambient and accent layers together instead of relying on one overhead fixture.',
    ],
    beforeEstimate: ['Photos of the current kitchen', 'Rough dimensions or a floor plan', 'Whether the layout will change', 'Appliances you plan to keep or buy', 'Budget range and target completion'],
    faqs: [
      { q: 'How much does a kitchen remodel cost in San Jose?', a: 'Costs vary widely with size, layout changes, cabinetry and appliance choices. We provide a written estimate after reviewing your project and do not quote figures without seeing the space.' },
      { q: 'Will I be without a kitchen the whole time?', a: 'Usually for a significant part of the project. Many homeowners set up a temporary kitchen elsewhere in the house. We help you plan for it.' },
      { q: 'Do I need a permit for a kitchen remodel?', a: 'Cosmetic updates may not, but moving plumbing, gas or electrical, or changing walls, generally does. Your city’s building department makes the call.' },
      { q: 'Can you work from my designer’s plans?', a: 'Yes. We can build from plans by your designer or architect, or discuss design options with you.' },
    ],
    related: ['full-home-remodeling', 'bathroom-remodeling', 'home-additions'],
  },
  {
    slug: 'bathroom-remodeling', name: 'Bathroom Remodeling', num: '05', layout: 'editorial', category: 'Bathroom',
    short: 'Bathrooms rebuilt with correct waterproofing, ventilation and layouts that are comfortable to use.',
    metaTitle: 'Bathroom Remodeling in San Jose, CA',
    metaDescription: 'Bathroom remodeling in San Jose: waterproofing, tile, fixtures and layout planning from Golden Bay Builders, including accessibility-minded options.',
    headline: 'Bathrooms that are built to stay dry.',
    lede: 'The finish you see is a small part of a bathroom. What lasts is the waterproofing, the framing and the ventilation behind it.',
    overview: [
      'Bathrooms are small, but they combine plumbing, waterproofing, electrical, ventilation and tile in a very tight space. Errors in any one of them tend to show up later as leaks, mold or failed tile.',
      'We plan the layout, specify the waterproofing system and sequence trades so each layer is inspected and finished before the next covers it.',
    ],
    projectTypes: [
      { title: 'Primary bath remodel', text: 'Shower, tub, vanity and storage reworked together.' },
      { title: 'Tub-to-shower conversion', text: 'Replacing a tub with a walk-in shower for easier daily use.' },
      { title: 'Hall or guest bath refresh', text: 'New fixtures, tile and vanity in the existing footprint.' },
      { title: 'Bathroom addition', text: 'Adding a new bath where plumbing access allows.' },
    ],
    concernsTitle: 'Practical considerations',
    concerns: [
      { title: 'Waterproofing', text: 'Shower and tub areas need a proper membrane system. It is hidden when finished, so it is worth asking about.' },
      { title: 'Ventilation', text: 'A correctly sized exhaust fan vented outdoors protects the room and its finishes.' },
      { title: 'Accessibility', text: 'Curbless showers, grab-bar blocking and wider clearances are easiest to include during construction.' },
    ],
    planningTitle: 'Planning notes',
    planning: [
      'Keeping fixtures in their current locations keeps plumbing costs down.',
      'Order tile, fixtures and glass early; custom shower glass is measured after tile is set.',
      'Decide on niche, bench and storage locations before framing is closed.',
      'Confirm the water heater and supply lines can support new fixtures such as rain heads.',
    ],
    beforeEstimate: ['Photos and approximate size of the bathroom', 'Fixtures you want to keep or move', 'Any known leaks or water damage', 'Accessibility needs', 'Budget range and timing'],
    faqs: [
      { q: 'How long is a bathroom out of service?', a: 'Plan for several weeks for a full remodel, depending on scope and lead times. We give a schedule once the scope is defined.' },
      { q: 'Can you convert a tub to a shower?', a: 'Usually yes. It requires modifying the plumbing and floor, and we confirm the details on site.' },
      { q: 'Do bathroom remodels need permits?', a: 'Moving plumbing or electrical, or altering walls, typically does. Like-for-like fixture swaps may not. The city makes the determination.' },
      { q: 'Can you make a bathroom more accessible?', a: 'We can include features such as curbless showers, blocking for grab bars and wider clearances where the space allows.' },
    ],
    related: ['kitchen-remodeling', 'full-home-remodeling', 'home-additions'],
  },
  {
    slug: 'custom-home-construction', name: 'Custom Home Construction', num: '06', layout: 'numbered', category: 'Custom Home',
    short: 'New homes built from the ground up, from site planning and permitting through final inspection.',
    metaTitle: 'Custom Home Construction in San Jose, CA',
    metaDescription: 'Custom home construction in the San Jose area. Golden Bay Builders guides site evaluation, planning, permitting and building of new single-family homes.',
    headline: 'A new home, planned before the first shovel.',
    lede: 'Custom construction is decided early: the site, the design team, the budget and the permit path. We get involved at that stage, not after plans are finished.',
    overview: [
      'Building a custom home is the most complex project a homeowner undertakes. It starts with the site: soil, grading, utilities, setbacks and approvals. It continues through design, engineering, permitting and construction, each with its own timeline and decision points.',
      'Golden Bay Builders can collaborate with your architect or help you understand what to look for before you hire one. Early builder input on constructability and cost often prevents redesign later.',
    ],
    projectTypes: [
      { title: 'Teardown and rebuild', text: 'Replacing an existing home on an established lot.' },
      { title: 'New build on a vacant lot', text: 'Starting from site evaluation and utility connections.' },
      { title: 'Rebuild after loss', text: 'Planning and permitting a replacement home.' },
      { title: 'Build with an architect', text: 'Constructing from plans produced by your design team.' },
    ],
    concernsTitle: 'What to resolve early',
    concerns: [
      { title: 'The site', text: 'Soil, slope, drainage, utilities and easements shape both design and cost before any house is drawn.' },
      { title: 'Budget alignment', text: 'Design ambitions and construction costs are reconciled while plans are still flexible.' },
      { title: 'Timeline', text: 'Design and permitting often take as long as building. Cities control much of the permitting timeline.' },
    ],
    planningTitle: 'The path of a custom home',
    planning: [
      'Site evaluation and feasibility.',
      'Design development with your architect or designer.',
      'Engineering, energy compliance and plan submittal.',
      'Permit issuance and pre-construction planning.',
      'Construction with staged inspections.',
      'Final inspection and handover.',
    ],
    beforeEstimate: ['Whether you own the lot and its address', 'Any existing plans, surveys or soils reports', 'Approximate size and number of bedrooms', 'Who your design team is, if chosen', 'Budget range and target move-in window'],
    faqs: [
      { q: 'Do you design homes or build from other designers’ plans?', a: 'Golden Bay Builders is a construction company. We build from plans prepared by your architect or designer and can provide input on constructability and cost.' },
      { q: 'When should I involve a builder?', a: 'Before plans are finalized. Early cost feedback helps avoid redesigns.' },
      { q: 'Can you give a fixed price?', a: 'Pricing structure depends on plan completeness and contract type. We explain options once plans are defined and do not promise a price before then.' },
      { q: 'How long does a custom home take?', a: 'Design, permitting and construction are separate phases, and timelines vary with size, site and city review. We provide a schedule after scope is set.' },
    ],
    related: ['adu-construction', 'home-additions', 'full-home-remodeling'],
  },
];
export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
