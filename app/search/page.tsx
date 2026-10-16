'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import CustomerShell from '@/components/customer/CustomerShell';
import {
  SearchNormal1,
  ArrowLeft2,
  Filter,
  Verify,
  Location,
  ArrowRight,
  Drop,
  Brush2,
  Ruler,
  Wind,
  CloseCircle,
  Clock,
} from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { getWorkers, Worker } from '@/lib/data/workers';
import { getPackages, PackageItem } from '@/lib/data/packages';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'semua';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<'workers' | 'packages'>('workers');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('Semua area');
  const [sortBy, setSortBy] = useState<'relevant' | 'price_asc' | 'completed_jobs'>('relevant');
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  useEffect(() => {
    async function loadData() {
      const workerList = await getWorkers({
        query,
        categorySlug: category,
        area: selectedArea,
        sortBy,
        verifiedOnly,
      });
      setWorkers(workerList);

      const packageList = await getPackages(category);
      setPackages(packageList);
    }
    loadData();
  }, [query, category, selectedArea, sortBy, verifiedOnly]);

  const categories = [
    { slug: 'semua', label: 'Semua' },
    { slug: 'plumbing', label: 'Plumbing', icon: Drop },
    { slug: 'pengecatan', label: 'Pengecatan', icon: Brush2 },
    { slug: 'perbaikan-umum', label: 'Perbaikan', icon: Ruler },
    { slug: 'servis-ac', label: 'Servis AC', icon: Wind },
  ];

  return (
    <CustomerShell hideBottomNav={false}>
      {/* Search Header Bar (Sticky) */}
      <div className="sticky top-0 lg:top-[72px] bg-cream-50/95 backdrop-blur-md z-30 border-b border-cream-200 px-4 lg:px-8 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 hover:bg-neutral-50 shrink-0"
            aria-label="Kembali ke beranda"
          >
            <ArrowLeft2 size={18} />
          </button>

          {/* Search Input Box with Area & Date indicator */}
          <div className="flex-1 relative">
            <SearchNormal1
              size={18}
              color="#7B778C"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tukang atau masalah..."
              className="w-full h-11 pl-10 pr-9 bg-white border border-neutral-300 rounded-full text-sm font-medium focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label="Hapus teks"
              >
                <CloseCircle size={16} />
              </button>
            )}
          </div>

          {/* Filter button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-11 h-11 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-800 hover:bg-neutral-50 relative shrink-0 shadow-xs"
            aria-label="Filter hasil"
          >
            <Filter size={18} />
            {(selectedArea !== 'Semua area' || !verifiedOnly || sortBy !== 'relevant') && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-lavender-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Category Filter Chips Horizontal */}
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = category === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-cream-100'
                }`}
              >
                {Icon && <Icon size={14} color={isActive ? '#FFFFFF' : '#7B778C'} />}
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6">
        {/* Results Count & View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-neutral-900 font-normal">
              {viewMode === 'workers' ? `${workers.length} tukang` : `${packages.length} paket`}
            </h1>
            <p className="text-xs text-neutral-500">
              {query ? `untuk "${query}"` : 'tersedia di Jakarta Selatan'}
            </p>
          </div>

          {/* Segmented Mode: Tukang | Paket */}
          <div className="bg-neutral-200/80 p-1 rounded-full flex items-center text-xs font-medium">
            <button
              onClick={() => setViewMode('workers')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                viewMode === 'workers'
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Tukang
            </button>
            <button
              onClick={() => setViewMode('packages')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                viewMode === 'packages'
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Paket
            </button>
          </div>
        </div>

        {/* WORKERS LIST */}
        {viewMode === 'workers' && (
          <div className="space-y-8">
            {workers.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-cream-200 p-8">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <SearchNormal1 size={28} />
                </div>
                <h3 className="font-serif text-2xl text-neutral-900 mb-2">Belum ada tukang yang cocok</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  Coba ubah kata kunci pencarian atau reset filter area dan kategori.
                </p>
                <button
                  onClick={() => {
                    setQuery('');
                    setCategory('semua');
                    setSelectedArea('Semua area');
                  }}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map((worker) => (
                  <Link
                    key={worker.id}
                    href={`/workers/${worker.slug}`}
                    className="group bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Worker Portrait Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={worker.avatarUrl}
                        alt={worker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {worker.isVerified && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-neutral-900 flex items-center gap-1 shadow-xs">
                          <Verify size={13} color="#7A5CE6" variant="Bold" />
                          <span>Terverifikasi</span>
                        </div>
                      )}
                    </div>

                    {/* Worker Info Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-2xl text-neutral-900 group-hover:text-lavender-600 transition-colors flex items-center gap-1.5">
                            {worker.name}
                            <Verify size={16} color="#7A5CE6" variant="Bold" />
                          </h3>
                          <div className="w-8 h-8 rounded-full bg-cream-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center text-neutral-700 transition-colors">
                            <ArrowRight size={14} />
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                          <Location size={14} />
                          <span>{worker.area}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cream-100 text-neutral-700 font-medium">
                            {worker.categoryName}
                          </span>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cream-100 text-neutral-700 font-medium">
                            {worker.experienceYears} th pengalaman
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          mulai dari{' '}
                          <strong className="text-neutral-900 font-semibold text-sm">
                            {formatRupiah(worker.startingPrice)}
                          </strong>
                        </span>
                        <span className="font-medium text-neutral-700">
                          {worker.completedJobs} pekerjaan selesai
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PACKAGES LIST */}
        {viewMode === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-neutral-900">
                      {pkg.categoryName}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-2xl text-neutral-900 mb-1">{pkg.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
                      <Clock size={14} />
                      <span>{pkg.durationText}</span>
                      <span>•</span>
                      <span>{pkg.availableWorkersCount} tukang siap</span>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-neutral-600">
                      {pkg.inclusions.slice(0, 2).map((inc: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-emerald-600">✓</span>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-cream-100 mt-4 flex items-center justify-between">
                  <div className="font-serif text-2xl text-neutral-900">{formatRupiah(pkg.price)}</div>
                  <Link
                    href={`/order/${pkg.id}`}
                    className="px-5 py-2.5 rounded-full bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-semibold tracking-wide flex items-center gap-2"
                  >
                    <span>Pesan Sekarang</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-neutral-950/40 backdrop-blur-xs">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <h3 className="font-serif text-2xl text-neutral-900">Filter Pencarian</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-neutral-500 hover:text-neutral-900"
              >
                Tutup
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Area */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
                  Area Layanan
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm outline-none"
                >
                  <option value="Semua area">Semua area (Jakarta)</option>
                  <option value="Tebet">Tebet, Jakarta Selatan</option>
                  <option value="Cilandak">Cilandak, Jakarta Selatan</option>
                  <option value="Kebayoran Baru">Kebayoran Baru, Jakarta Selatan</option>
                </select>
              </div>

              {/* Urutkan */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
                  Urutkan Berdasarkan
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { val: 'relevant', label: 'Paling Relevan' },
                    { val: 'price_asc', label: 'Harga Terendah' },
                    { val: 'completed_jobs', label: 'Pekerjaan Selesai Terbanyak' },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setSortBy(s.val as any)}
                      className={`h-10 px-4 rounded-xl text-xs font-medium text-left flex items-center justify-between border ${
                        sortBy === s.val
                          ? 'border-lavender-600 bg-lavender-50 text-lavender-800'
                          : 'border-neutral-200 bg-white text-neutral-700'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.val && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only Switch */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-sm font-medium text-neutral-900">Hanya Terverifikasi</div>
                  <div className="text-xs text-neutral-500">Tampilkan tukang berbadge terverifikasi</div>
                </div>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-5 h-5 accent-lavender-600 rounded"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedArea('Semua area');
                  setSortBy('relevant');
                  setVerifiedOnly(false);
                }}
                className="flex-1 h-12 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 h-12 rounded-full bg-lavender-600 text-white text-xs font-semibold hover:bg-lavender-700"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerShell>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-neutral-500">Memuat pencarian...</div>}>
      <SearchContent />
    </Suspense>
  );
}
