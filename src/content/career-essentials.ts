import catalog from "./career-essentials.catalog.json";

/**
 * Career Essentials guides sourced from the member platform catalog.
 * Published on the public site so students can read them without a portal login.
 */
export type CareerGuide = {
  slug: string;
  title: string;
  categoryId: string;
  categoryTitle: string;
  summary: string;
  bodyMd: string;
  sourceUrl: string;
  sortOrder: number;
  recommended: boolean;
};

export type CareerGuideCategory = {
  id: string;
  title: string;
  guides: readonly CareerGuide[];
};

/** Civil Service reflection already has a native blog article; keep one canonical URL. */
export const CIVIL_SERVICE_GUIDE_SLUG = "civil-service-summer-internship";
export const CIVIL_SERVICE_BLOG_PATH = "/blog/civil-service-summer-internship";

export const CAREER_GUIDES = catalog as CareerGuide[];

export function getCareerGuide(slug: string): CareerGuide | undefined {
  return CAREER_GUIDES.find((guide) => guide.slug === slug);
}

/** True when /resources/[slug] should render a full on-site article. */
export function hasNativeCareerGuidePage(guide: CareerGuide): boolean {
  if (guide.slug === CIVIL_SERVICE_GUIDE_SLUG) return false;
  return guide.bodyMd.trim().length > 0;
}

/** Primary public path for a guide card CTA. */
export function careerGuideHref(guide: CareerGuide): { href: string; external: boolean } {
  if (guide.slug === CIVIL_SERVICE_GUIDE_SLUG) {
    return { href: CIVIL_SERVICE_BLOG_PATH, external: false };
  }
  if (hasNativeCareerGuidePage(guide)) {
    return { href: `/resources/${guide.slug}`, external: false };
  }
  return { href: guide.sourceUrl, external: true };
}

export function nativeCareerGuides(): readonly CareerGuide[] {
  return CAREER_GUIDES.filter(hasNativeCareerGuidePage);
}

export function careerGuideCategories(): readonly CareerGuideCategory[] {
  const byId = new Map<string, CareerGuideCategory & { guides: CareerGuide[] }>();

  for (const guide of [...CAREER_GUIDES].sort((a, b) => a.sortOrder - b.sortOrder)) {
    const existing = byId.get(guide.categoryId);
    if (existing) {
      existing.guides.push(guide);
      continue;
    }
    byId.set(guide.categoryId, {
      id: guide.categoryId,
      title: guide.categoryTitle,
      guides: [guide],
    });
  }

  return [...byId.values()];
}
