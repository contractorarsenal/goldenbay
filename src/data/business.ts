/**
 * Single source of truth for business identity. Change brand text HERE.
 *
 * BRAND IS PROVISIONAL. The public name below comes from the owner's business card ("GOLD BAY BUILDERS INC.").
 * The legal registered name and CSLB status are NOT confirmed. Public records and the Gemini report show
 * "Goldbay Builders Inc." and unrelated "Gold Bay Builders" entities. See docs/RESEARCH-RECONCILIATION.md.
 */
export const business = {
  name: 'Gold Bay Builders Inc.',
  shortName: 'Gold Bay Builders',
  /** Tagline as printed on the card: "Building YOUR bay home". */
  tagline: 'Building YOUR bay home',
  brandProvisional: true,
  legalNameConfirmed: false,
  owner: 'David Lerma',
  ownerRole: 'Owner',
  phone: '(408) 506-7184',
  phoneHref: 'tel:+14085067184',
  email: 'goldbaybuilderinc@gmail.com',
  region: 'San Jose, California',
  // No street address, hours or social profiles supplied. Do not invent them.
  address: null as null | { street: string; city: string; state: string; zip: string },
  /**
   * License. NOTHING here is published until `verified` is true.
   *  - Card shows 1157776 (owner-supplied; earlier brief said 115776).
   *  - A secondary aggregator (BuildZoom) lists "Goldbay Builders Inc" with #1157776; CSLB itself NOT checked.
   *  - Card says "Insured & Bonded": owner-reported, unverified.
   * Flip `verified` and set `number` only after checking the exact entity on the CSLB license lookup.
   */
  license: {
    cardNumber: '1157776',
    verified: false,
    number: null as null | string,
    cslbUrl: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
  },
  siteUrl: (import.meta.env?.PUBLIC_SITE_URL as string | undefined) || 'http://localhost:4321',
  indexable: import.meta.env?.PUBLIC_ALLOW_INDEXING === 'true',
};
export const abs = (path: string) => new URL(path, business.siteUrl).toString();
