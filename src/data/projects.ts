/**
 * Portfolio data. One entry per real project/group; images live in src/assets/projects/ (see assets-src/manifest.json).
 * Add a project here and /projects/ and its detail page update automatically.
 * RULES: no invented locations, budgets, materials, dates or scope. `details` is only set when the client supplies facts.
 */
export type ProjectCategory = 'Remodel' | 'Addition' | 'ADU' | 'Kitchen' | 'Bathroom' | 'Custom Home' | 'Outdoor Living' | 'Patios & Pavers';
export interface ProjectImage {
  file: string;                       // filename in src/assets/projects/
  alt: string;                        // describes only what is visible
  focus?: string;                     // object-position for crops, e.g. '50% 40%'
  state?: 'finished' | 'in-progress'; // what the photo actually shows
}
export interface Project {
  slug: string; title: string; category: ProjectCategory;
  summary: string;                    // only facts visible in the photos / supplied by the client
  clientDescription: string;          // client's own words, kept verbatim for traceability
  services: string[];                 // service slugs this work supports ([] = no dedicated core service)
  images: ProjectImage[];             // first = lead image
  location?: string;                  // only if approved
  scope?: string[]; challenge?: string; solution?: string; completed?: string;
  /** true only once real details (scope, location…) exist; detail pages stay noindex until then */
  detailed?: boolean;
  /** Grouping confirmed by the client? false = inferred by visual match. */
  groupingConfirmed?: boolean;
  /** Open question for the client */
  note?: string;
}

export const projects: Project[] = [
  {
    slug: 'kitchen-remodel', title: 'Kitchen Remodel', category: 'Kitchen', services: ['kitchen-remodeling'],
    clientDescription: 'Kitchen remodel done', groupingConfirmed: true,
    summary: 'A completed kitchen with white cabinetry, a center island with a dark countertop, stainless appliances and wood-look flooring.',
    images: [{ file: 'kitchen-white-cabinets-island-01.jpg', alt: 'Remodeled kitchen with white cabinets, a white island with a dark countertop, stainless steel refrigerator, pendant lights and wood-look flooring', focus: '50% 55%', state: 'finished' }],
    note: 'Photo appears to be taken near completion (a broom and masking tape are visible); confirm scope and request a final photo.',
  },
  {
    slug: 'bathroom-blue-tile-soaking-tub', title: 'Bathroom Remodel: Blue Tile & Soaking Tub', category: 'Bathroom', services: ['bathroom-remodeling'],
    clientDescription: 'Bathroom tile and floor remodel completed', groupingConfirmed: false,
    summary: 'A remodeled bathroom with floor-to-ceiling vertical dark-teal tile, a built-in soaking tub, a patterned floor tile and a wood vanity.',
    images: [
      { file: 'bathroom-blue-tile-soaking-tub-01.jpg', alt: 'Bathroom with vertical dark-teal wall tile, a built-in soaking tub, patterned cement-style floor tile and a wood vanity', focus: '50% 40%', state: 'finished' },
      { file: 'bathroom-blue-tile-shower-wall-02.jpg', alt: 'Dark-teal vertical tile shower and tub wall with a frosted window and a black handheld shower fixture', focus: '50% 50%', state: 'finished' },
      { file: 'bathroom-blue-tile-tub-window-03.jpg', alt: 'Soaking tub beneath a frosted window with a recessed tiled niche in the teal tile wall', focus: '50% 40%', state: 'finished' },
    ],
    note: 'The three photos are grouped as one room by visual match. Confirm they are the same bathroom.',
  },
  {
    slug: 'bathroom-stone-shower-terracotta-floor', title: 'Bathroom Remodel: Stone Shower & Terracotta Floor', category: 'Bathroom', services: ['bathroom-remodeling'],
    clientDescription: 'Bathroom remodel done', groupingConfirmed: false,
    summary: 'A remodeled bathroom with a textured stacked-stone shower wall, black fixtures, a tiled niche and hexagonal terracotta floor tile.',
    images: [
      { file: 'bathroom-stone-shower-terracotta-floor-01.jpg', alt: 'Walk-in shower with textured stacked-stone walls, black rain shower and handheld fixtures, and hexagonal terracotta floor tile', focus: '50% 45%', state: 'finished' },
      { file: 'bathroom-stone-shower-fixtures-02.jpg', alt: 'Close view of a stacked-stone shower wall with a black rain showerhead, handheld shower and a patterned tile niche', focus: '50% 40%', state: 'finished' },
      { file: 'bathroom-terracotta-floor-vanity-03.jpg', alt: 'Bathroom with a wood vanity, white stone countertop, arched mirror, wall sconce and hexagonal terracotta floor tile', focus: '50% 50%', state: 'finished' },
    ],
    note: 'Grouped by matching hexagonal floor tile. Confirm with the client.',
  },
  {
    slug: 'bathroom-floating-vanity-glass-shower', title: 'Bathroom Remodel: Floating Vanity & Glass Shower', category: 'Bathroom', services: ['bathroom-remodeling'],
    clientDescription: 'Bathroom completed', groupingConfirmed: false,
    summary: 'A bathroom with a floating wood-tone vanity, large-format gray floor tile and a frameless glass shower.',
    images: [{ file: 'bathroom-floating-vanity-glass-shower-01.jpg', alt: 'Bathroom with a floating wood-tone vanity, white countertop, large-format gray floor tile and a frameless glass shower enclosure', focus: '50% 45%', state: 'finished' }],
    note: 'Single photo; the packaging box visible suggests the photo was taken at or before completion. Confirm.',
  },
  {
    slug: 'patio-construction', title: 'Patio Construction', category: 'Patios & Pavers', services: [],
    clientDescription: 'Patio finished', groupingConfirmed: true,
    summary: 'A finished paver patio and entry walkway in front of a single-story home, edged with a horizontal wood-slat fence.',
    images: [
      { file: 'patio-paver-court-wood-fence-01.jpg', alt: 'Finished paver patio in front of a single-story house, edged by a horizontal wood-slat fence', focus: '50% 70%', state: 'finished' },
      { file: 'patio-paver-entry-walkway-02.jpg', alt: 'Paver walkway leading to the front entry of a single-story house between horizontal wood-slat fence panels', focus: '50% 60%', state: 'finished' },
    ],
  },
  {
    slug: 'paver-installation', title: 'Paver Installation', category: 'Patios & Pavers', services: [],
    clientDescription: 'Pavers finished', groupingConfirmed: true,
    summary: 'Paver work in a backyard and side yard: a large-format light patio and a stepping-stone path across artificial turf.',
    images: [
      { file: 'pavers-large-format-patio-01.jpg', alt: 'Large-format light-colored pavers laid against a wooden fence, with a level resting on the surface', focus: '50% 65%', state: 'in-progress' },
      { file: 'pavers-stepping-stones-turf-02.jpg', alt: 'Row of stepping-stone pavers set beside a house and across artificial turf', focus: '50% 70%', state: 'finished' },
      { file: 'pavers-stepping-stone-path-03.jpg', alt: 'A worker setting stepping-stone pavers along the side of a house next to artificial turf, with gravel and a string line', focus: '50% 60%', state: 'in-progress' },
    ],
    note: 'Two photos show paving still in progress. Request finished-state photos.',
  },
  {
    slug: 'pool-house-outdoor-living-area', title: 'Pool House & Outdoor Living Area', category: 'Outdoor Living', services: [],
    clientDescription: 'Pool house and around pool patio finished', groupingConfirmed: false,
    summary: 'Paver work around a pool and in an adjoining courtyard beside a tan-sided outbuilding.',
    images: [
      { file: 'pool-deck-pavers-01.jpg', alt: 'Light paver decking and coping being installed around an empty pool shell with a tile band along the edge', focus: '50% 55%', state: 'in-progress' },
      { file: 'pool-outdoor-paver-courtyard-02.jpg', alt: 'Pavers being laid in a courtyard beside a tan-sided building with a window, with stacks of pavers and base sand visible', focus: '50% 65%', state: 'in-progress' },
      { file: 'pool-outdoor-paver-courtyard-03.jpg', alt: 'Courtyard of partly laid pavers beside a tan-sided building with a white-trimmed door', focus: '50% 65%', state: 'in-progress' },
    ],
    note: 'The client describes this as finished, but all three photos show work in progress, and none clearly shows a pool house. Request finished photos and confirm which structure is the pool house.',
  },
];

/** Portfolio filter groups. Only groups that contain real projects are shown. */
export const filterGroups: { key: string; label: string; categories: ProjectCategory[] }[] = [
  { key: 'bathrooms', label: 'Bathrooms', categories: ['Bathroom'] },
  { key: 'kitchens', label: 'Kitchens', categories: ['Kitchen'] },
  { key: 'outdoor-living', label: 'Outdoor Living', categories: ['Outdoor Living'] },
  { key: 'patios-pavers', label: 'Patios & Pavers', categories: ['Patios & Pavers'] },
  { key: 'custom-construction', label: 'Custom Construction', categories: ['Custom Home', 'Addition', 'ADU', 'Remodel'] },
];
export const groupOf = (p: Project) => filterGroups.find((g) => g.categories.includes(p.category))?.key ?? 'other';
export const activeFilterGroups = () => filterGroups.filter((g) => projects.some((p) => g.categories.includes(p.category)));
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)!;

/** Up to `n` other projects for a "related projects" block: same category first, then the rest. Never includes `slug` itself. */
export const relatedProjects = (slug: string, n = 3): Project[] => {
  const current = getProject(slug);
  const others = projects.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, n);
};

/** Whether a project should be indexed. Only projects with confirmed details (scope, location or a client-approved description) qualify. */
export const isIndexable = (p: Project) => p.detailed === true;

/** Short, factual intro shown on cards and detail pages. Uses only what the photographs and client description show. */
export const introFor = (p: Project) => p.summary;
