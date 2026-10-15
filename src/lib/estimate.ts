/** Shared field definitions + validation, used by the browser wizard AND the server function. */
export const projectTypes = ['Full home remodeling', 'Kitchen remodeling', 'Bathroom remodeling', 'Home addition', 'ADU', 'Custom home', 'Other'] as const;
export const propertyStatuses = ['I own the home', 'In escrow', 'Looking to buy'] as const;
export const stages = ['Exploring ideas', 'Planning', 'Ready for estimates', 'Already have plans', 'Ready to begin'] as const;
export const budgets = ['Under $50,000', '$50,000 – $150,000', '$150,000 – $350,000', '$350,000 – $750,000', '$750,000+', 'Not sure yet'] as const;
export const timelines = ['ASAP', 'Within 3 months', '3–6 months', '6–12 months', 'Flexible'] as const;
export const contactMethods = ['Phone call', 'Text message', 'Email'] as const;

export interface EstimateInput {
  projectType: string; propertyStatus: string; city: string; zip: string; street?: string; stage: string; budget: string; timeline: string;
  details: string; name: string; phone: string; email: string; contactMethod: string; consent: boolean;
}
export type Errors = Partial<Record<keyof EstimateInput, string>>;

const oneOf = (v: unknown, list: readonly string[]) => typeof v === 'string' && list.includes(v);

export function validateEstimate(d: Partial<Record<keyof EstimateInput, unknown>>): Errors {
  const e: Errors = {};
  if (!oneOf(d.projectType, projectTypes)) e.projectType = 'Choose a project type.';
  if (!oneOf(d.propertyStatus, propertyStatuses)) e.propertyStatus = 'Tell us your relationship to the property.';
  if (typeof d.city !== 'string' || d.city.trim().length < 2 || d.city.length > 80) e.city = 'Enter the city where the project is located.';
  if (typeof d.zip !== 'string' || !/^\d{5}$/.test(d.zip.trim())) e.zip = 'Enter a 5-digit ZIP code.';
  if (d.street != null && (typeof d.street !== 'string' || d.street.length > 120)) e.street = 'Street address is too long.';
  if (!oneOf(d.stage, stages)) e.stage = 'Choose where you are in the process.';
  if (!oneOf(d.budget, budgets)) e.budget = 'Choose a budget range, or “Not sure yet”.';
  if (!oneOf(d.timeline, timelines)) e.timeline = 'Choose a timeline.';
  if (typeof d.details !== 'string' || d.details.trim().length < 10 || d.details.length > 3000) e.details = 'Describe your project in at least a sentence (10–3000 characters).';
  if (typeof d.name !== 'string' || d.name.trim().length < 2 || d.name.length > 100) e.name = 'Enter your name.';
  const digits = typeof d.phone === 'string' ? d.phone.replace(/\D/g, '') : '';
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1')))) e.phone = 'Enter a valid 10-digit US phone number.';
  if (typeof d.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()) || d.email.length > 160) e.email = 'Enter a valid email address.';
  if (!oneOf(d.contactMethod, contactMethods)) e.contactMethod = 'Choose how you prefer to be contacted.';
  if (d.consent !== true) e.consent = 'Please agree so we can contact you about your request.';
  return e;
}
/** Which fields belong to which wizard step (index = step). */
export const stepFields: (keyof EstimateInput)[][] = [
  ['projectType'], ['propertyStatus', 'city', 'zip', 'street'], ['stage'], ['budget'], ['timeline'], ['details'], ['name', 'phone', 'email', 'contactMethod', 'consent'],
];
