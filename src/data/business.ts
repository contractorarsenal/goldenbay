/** Single source of truth for business identity. Only confirmed facts belong here. */
export const business = {
  name: 'Golden Bay Builders Inc.',
  shortName: 'Golden Bay Builders',
  tagline: 'Building Your Bay Home',
  owner: 'David Lerma',
  phone: '408-506-7184',
  phoneHref: 'tel:+14085067184',
  email: 'goldbaybuilderinc@gmail.com',
  region: 'San Jose, California',
  // No street address, hours, or social profiles have been supplied. Do not invent them.
  address: null as null | { street: string; city: string; state: string; zip: string },
  /**
   * License: the number "115776" was supplied but a CSLB search did not return a matching
   * record for this business. It MUST NOT be published until David confirms the legal
   * entity and the CSLB record is checked. Flip `verified` only after that check.
   */
  license: {
    suppliedNumber: '115776',
    verified: false,
    number: null as null | string,
    cslbUrl: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
  },
  siteUrl: (import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'http://localhost:4321',
  indexable: import.meta.env.PUBLIC_ALLOW_INDEXING === 'true',
};
export const abs = (path: string) => new URL(path, business.siteUrl).toString();
