import { MOCK_PACKAGES, PackageItem } from '@/lib/mock/data';

export type { PackageItem };

export async function getPackages(categorySlug?: string): Promise<PackageItem[]> {
  if (categorySlug && categorySlug !== 'semua') {
    return MOCK_PACKAGES.filter((p) => p.categorySlug === categorySlug);
  }
  return MOCK_PACKAGES;
}

export async function getPackageById(id: string): Promise<PackageItem | undefined> {
  return MOCK_PACKAGES.find((p) => p.id === id);
}

export async function getPackageBySlug(slug: string): Promise<PackageItem | undefined> {
  return MOCK_PACKAGES.find((p) => p.slug === slug);
}
