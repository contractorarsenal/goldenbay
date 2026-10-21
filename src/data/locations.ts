export interface Location {
  slug: string; name: string; confirmed: boolean; intro: string;
  department: string; considerations: string[];
}
/** `confirmed` = David has confirmed Gold Bay Builders serves the city. Only confirmed cities are indexed. */
export const locations: Location[] = [
  {
    slug: 'san-jose', name: 'San Jose', confirmed: true,
    intro: 'San Jose is Gold Bay Builders’ home market. Homes here range from mid-century ranch houses and Eichler-style neighborhoods to older Willow Glen bungalows and newer suburban tracts, and each calls for a different approach to remodeling.',
    department: 'City of San José Planning, Building and Code Enforcement',
    considerations: [
      'San José publishes its own ADU guidance, fee schedule and permit-center process; project scope and lot conditions determine which permits apply.',
      'Homes in historic districts or conservation areas may face additional design review before permits are issued.',
      'Older homes frequently surface electrical, plumbing or foundation conditions once walls are opened, so early scoping matters.',
    ],
  },
  { slug: 'santa-clara', name: 'Santa Clara', confirmed: false, intro: 'Santa Clara operates its own building division and permit process, separate from San José.', department: 'City of Santa Clara Building Inspection Division', considerations: ['Permit requirements, ADU rules and fees are set by the city, not the county or neighboring jurisdictions.'] },
  { slug: 'sunnyvale', name: 'Sunnyvale', confirmed: false, intro: 'Sunnyvale homeowners work with the City of Sunnyvale for plan review and inspections.', department: 'City of Sunnyvale Community Development', considerations: ['Permit requirements, ADU rules and fees are set by the city, not the county or neighboring jurisdictions.'] },
  { slug: 'los-gatos', name: 'Los Gatos', confirmed: false, intro: 'Los Gatos is a separate town with its own planning and design review processes.', department: 'Town of Los Gatos Community Development', considerations: ['Hillside and design-review considerations can affect additions and new construction in parts of town.'] },
  { slug: 'cupertino', name: 'Cupertino', confirmed: false, intro: 'Cupertino projects are reviewed by the City of Cupertino.', department: 'City of Cupertino Building Division', considerations: ['Permit requirements, ADU rules and fees are set by the city, not the county or neighboring jurisdictions.'] },
  { slug: 'campbell', name: 'Campbell', confirmed: false, intro: 'Campbell projects are reviewed by the City of Campbell.', department: 'City of Campbell Building Division', considerations: ['Permit requirements, ADU rules and fees are set by the city, not the county or neighboring jurisdictions.'] },
];
