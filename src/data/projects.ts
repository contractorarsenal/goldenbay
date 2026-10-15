/**
 * Portfolio data model. Add one object per real, approved project; a case-study page is generated
 * automatically at /projects/<slug>/. Never add stock or synthetic imagery as completed work.
 */
export interface ProjectImage { src: string; alt: string; width: number; height: number }
export interface Project {
  slug: string; title: string; category: 'Remodel' | 'Addition' | 'ADU' | 'Kitchen' | 'Bathroom' | 'Custom Home';
  location?: string;            // only if the homeowner approved publishing it
  summary: string; scope: string[]; challenge?: string; solution?: string;
  hero: ProjectImage; gallery: ProjectImage[]; before?: ProjectImage; after?: ProjectImage;
  services: string[];           // service slugs
  completed?: string;
}
export const projects: Project[] = [];
