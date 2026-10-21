/**
 * Customer reviews supplied by the client, each marked "Verified Review" in the client's source listing.
 * `text` is VERBATIM (including the customer's typos/punctuation). Never edit it.
 * `excerpt` (optional) must be a contiguous substring of `text`; tests enforce this.
 * Source platform is UNCONFIRMED: do not label any review as Angi/HomeAdvisor/etc. until confirmed.
 * No ratings, counts or dates beyond month/year were supplied; none are invented. Do not add Review/AggregateRating schema.
 */
export interface Review {
  id: string; name: string; date: string; category: string; text: string;
  /** exact contiguous excerpt for short placements */
  excerpt?: string;
  /** service slugs where this review is shown */
  services: string[];
}
export const reviewMeta = {
  sourcePlatform: null as null | string,     // unconfirmed
  permissionConfirmed: false,                 // republishing permission/terms not yet confirmed
  note: 'Supplied by the client as "Verified Review" text. Platform, permission and terms to be confirmed before launch.',
};
export const reviews: Review[] = [
  {
    id: 'griselda-l', name: 'Griselda L.', date: 'October 2026', category: 'Major Renovation - Multiple Rooms', services: ['home-additions', 'full-home-remodeling'],
    text: 'I had a great experience with David and his crew. My house had 4 small rooms with no real master suite. David converted 2 small bedrooms into a large useful well organized master suite. Very happy with the result. He suggested a sliding door to backyard. Great idea. We are now be able to enjoy the backyard and also easily access laundry room.',
    excerpt: 'David converted 2 small bedrooms into a large useful well organized master suite. Very happy with the result.',
  },
  {
    id: 'muhammad-t', name: 'Muhammad T.', date: 'October 2026', category: 'Kitchen - Remodel', services: ['kitchen-remodeling'],
    text: 'David installed a microwave drawer for us. He and his team did everything professionally, being respectful of our space and accommodating of our availability. Great work. Really happy.',
  },
  {
    id: 'terri-m', name: 'Terri M.', date: 'September 2026', category: 'Addition to Existing Structure - Build', services: ['home-additions'],
    text: 'We needed an additional office space within our home. The concerns were removing an existing fireplace and hearth and replacing the hardwood floor to match what was already there, removing the chimney and patching the roof, moving a heating vent and again, patching the hardwood floors to match, adding an interior door, and moving lighting and electrical outlets. David was onsite everyday to either do the work himself or oversee the work by his subcontractors. They do quality work. The floors look great, the new wall is perfect, the roof was done well, the new interior door was installed well and looks like it was always meant to be there. Also, the work site was always cleaned up at the end of each work day. David is also very flexible, easy to communicate with, seems to truly care about your project, and works with contractors who do quality work.',
    excerpt: 'David was onsite everyday to either do the work himself or oversee the work by his subcontractors. They do quality work. The floors look great, the new wall is perfect, the roof was done well, the new interior door was installed well and looks like it was always meant to be there. Also, the work site was always cleaned up at the end of each work day.',
  },
  {
    id: 'kevin-j', name: 'Kevin J.', date: 'September 2026', category: 'Outdoor Kitchen - Build', services: ['adu-construction'],
    text: 'David and his team do a ton of work for us, Here’s what he and his team did for us: 1. Built us an ADU, 2. landscaped our whole property including building fences, including drainage as well as fences . 3. Remove carpet from whole house and put flooring in our whole house. 4. Removed Stucco and Re Stuccoed our house and painted They also did a ton of smaller projects on our property. Best part was they were always available and made sure they did everything to completion. My wife and I can’t recommend enough how great they were for us. Kevin',
    excerpt: 'They also did a ton of smaller projects on our property. Best part was they were always available and made sure they did everything to completion. My wife and I can’t recommend enough how great they were for us.',
  },
  {
    id: 'andrea-j', name: 'Andrea J.', date: 'September 2026', category: 'Bathroom - Remodel', services: ['bathroom-remodeling', 'kitchen-remodeling'],
    text: 'David is a specialist in bathrooms and kitchens. He was dependable, clean, on schedule, and in budget. He and his team do excellent work and he is a good listener!',
  },
  {
    id: 'juan-m', name: 'Juan M.', date: 'September 2026', category: 'Major Home Repairs (General Contractor)', services: [],
    text: 'David is an excellent person to work with, I hired him to build a fence in my backyard. Him and his team left my place very clean looking spectacular. Beautiful fence! I always recommend David to my own clients. Thank you David!',
  },
  {
    id: 'rodrigo-p', name: 'Rodrigo P.', date: 'September 2026', category: 'Addition to Existing Structure - Build', services: ['adu-construction'],
    text: 'I had a great experience working with Gold Bay Builders on an ADU project. I handled the electrical panel upgrade and worked alongside them while they took care of the ADU construction. As someone working on the same project, I appreciated their professionalism, teamwork, and the care they put into their work. I’d gladly work with them again and highly recommend Gold Bay Builders to anyone planning an ADU or construction project!',
    excerpt: 'I appreciated their professionalism, teamwork, and the care they put into their work.',
  },
];
export const getReview = (id: string) => reviews.find((r) => r.id === id)!;
export const reviewsFor = (service: string) => reviews.filter((r) => r.services.includes(service));
