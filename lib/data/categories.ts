import { MOCK_CATEGORIES, Category } from '@/lib/mock/data';

export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return MOCK_CATEGORIES.find((c) => c.slug === slug);
}
