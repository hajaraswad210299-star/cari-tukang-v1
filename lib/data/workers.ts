import { MOCK_WORKERS, Worker } from '@/lib/mock/data';

export type { Worker };

export interface WorkerFilter {
  query?: string;
  categorySlug?: string;
  area?: string;
  sortBy?: 'relevant' | 'price_asc' | 'price_desc' | 'completed_jobs';
  verifiedOnly?: boolean;
}

export async function getWorkers(filter?: WorkerFilter): Promise<Worker[]> {
  let result = [...MOCK_WORKERS];

  if (filter?.categorySlug && filter.categorySlug !== 'semua') {
    result = result.filter((w) => w.categorySlug === filter.categorySlug);
  }

  if (filter?.query) {
    const q = filter.query.toLowerCase();
    result = result.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.bio.toLowerCase().includes(q) ||
        w.categoryName.toLowerCase().includes(q) ||
        w.packages.some((p) => p.name.toLowerCase().includes(q))
    );
  }

  if (filter?.area && filter.area !== 'Semua area') {
    result = result.filter((w) => w.area.toLowerCase().includes(filter.area!.toLowerCase()));
  }

  if (filter?.verifiedOnly) {
    result = result.filter((w) => w.isVerified);
  }

  if (filter?.sortBy) {
    if (filter.sortBy === 'price_asc') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (filter.sortBy === 'price_desc') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (filter.sortBy === 'completed_jobs') {
      result.sort((a, b) => b.completedJobs - a.completedJobs);
    }
  }

  return result;
}

export async function getWorkerBySlug(slug: string): Promise<Worker | undefined> {
  return MOCK_WORKERS.find((w) => w.slug === slug);
}

export async function getWorkerById(id: string): Promise<Worker | undefined> {
  return MOCK_WORKERS.find((w) => w.id === id);
}
