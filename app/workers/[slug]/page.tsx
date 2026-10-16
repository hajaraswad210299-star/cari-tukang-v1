'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomerShell from '@/components/customer/CustomerShell';
import {
  ArrowLeft2,
  Verify,
  Location,
  ShieldTick,
  TickCircle,
  CloseCircle,
  ArrowRight,
  Drop,
} from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { getWorkerBySlug, getWorkers, Worker } from '@/lib/data/workers';
import { PackageItem } from '@/lib/mock/data';

export default function WorkerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [worker, setWorker] = useState<Worker | null>(null);
  const [otherWorkers, setOtherWorkers] = useState<Worker[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [checkArea, setCheckArea] = useState('Tebet');
  const [isExpandedBio, setIsExpandedBio] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await getWorkerBySlug(slug);
      if (data) {
        setWorker(data);
        if (data.packages.length > 0) {
          setSelectedPackageId(data.packages[0].id);
        }
      }
      const all = await getWorkers();
      setOtherWorkers(all.filter((w) => w.slug !== slug).slice(0, 3));
    }
    load();
  }, [slug]);

  if (!worker) {
    return (
      <CustomerShell title="Detail Tukang" showBack>
        <div className="p-12 text-center text-neutral-500">Memuat profil tukang...</div>
      </CustomerShell>
    );
  }

  const selectedPackage =
    worker.packages.find((p: PackageItem) => p.id === selectedPackageId) || worker.packages[0];

  const photos = [worker.avatarUrl, ...(worker.portfolio || [])];

  return (
    <CustomerShell hideBottomNav={true}>
      <div className="max-w-[1000px] mx-auto pb-28">
        {/* Top Hero Photo Gallery */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
          <img
            src={photos[activePhotoIdx] || worker.avatarUrl}
            alt={worker.name}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Floating Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-md hover:bg-white"
            aria-label="Kembali"
          >
            <ArrowLeft2 size={18} />
          </button>

          {/* Gallery dots & counter */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activePhotoIdx === i ? 'bg-white w-5' : 'bg-white/50'
                  }`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-950/70 text-white text-xs font-mono">
              {activePhotoIdx + 1} / {photos.length}
            </span>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-4 sm:px-8 py-6 space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-lavender-50 border border-lavender-200 text-xs font-semibold text-lavender-700 flex items-center gap-1.5">
              <Verify size={14} color="#7A5CE6" variant="Bold" />
              <span>Terverifikasi</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-cream-100 text-xs font-medium text-neutral-700 flex items-center gap-1.5">
              <Location size={14} />
              <span>{worker.area}</span>
            </div>
          </div>

          {/* Name & Headline */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
              {worker.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Tukang {worker.categoryName.toLowerCase()} & perbaikan rumah tinggal
            </p>
          </div>

          {/* Stats Bar (3 Columns separated by vertical lines) */}
          <div className="grid grid-cols-3 py-4 border-y border-cream-200 text-center divide-x divide-cream-200">
            <div>
              <div className="font-serif text-2xl text-neutral-900">{worker.completedJobs}</div>
              <div className="text-[11px] text-neutral-500">pekerjaan selesai</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-neutral-900">{worker.experienceYears} th</div>
              <div className="text-[11px] text-neutral-500">pengalaman</div>
            </div>
            <div>
              <div className="font-serif text-2xl text-neutral-900">{worker.area.split(',')[0]}</div>
              <div className="text-[11px] text-neutral-500">area utama</div>
            </div>
          </div>

          {/* Bio Description */}
          <div>
            <p className={`text-xs sm:text-sm text-neutral-700 leading-relaxed ${isExpandedBio ? '' : 'line-clamp-3'}`}>
              {worker.bio}
            </p>
            <button
              onClick={() => setIsExpandedBio(!isExpandedBio)}
              className="text-xs font-semibold text-lavender-600 hover:underline mt-1"
            >
              {isExpandedBio ? 'Lebih sedikit' : 'Selengkapnya'}
            </button>
          </div>

          {/* Skills Chips */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cream-100 text-xs font-medium text-neutral-700">
              {worker.categoryName}
            </span>
            <span className="px-3 py-1 rounded-full bg-cream-100 text-xs font-medium text-neutral-700">
              Perbaikan Umum
            </span>
          </div>

          {/* Radio Cards: Pilih Paket */}
          <div className="pt-4">
            <h2 className="font-serif text-2xl text-neutral-900 font-normal mb-4">Pilih paket</h2>
            <div className="space-y-3">
              {worker.packages.map((pkg: PackageItem) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`rounded-2xl p-4 sm:p-5 cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-lavender-600 bg-white ring-2 ring-lavender-200/50 shadow-sm'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-lavender-600 bg-lavender-600'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-neutral-900">{pkg.name}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{pkg.durationText}</div>
                        </div>
                      </div>
                      <div className="font-serif text-lg sm:text-xl text-neutral-900 font-medium">
                        {formatRupiah(pkg.price)}
                      </div>
                    </div>

                    {/* Inclusions / Exclusions preview if selected */}
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-cream-100 space-y-2 text-xs">
                        {pkg.inclusions.map((inc: string, i: number) => (
                          <div key={i} className="flex items-center justify-between text-neutral-700">
                            <span className="flex items-center gap-1.5">
                              <TickCircle size={14} color="#059669" />
                              <span>{inc}</span>
                            </span>
                            <span className="text-neutral-400 border-b border-dotted border-neutral-300 flex-1 mx-2" />
                            <span className="text-emerald-700 font-medium">Termasuk</span>
                          </div>
                        ))}
                        {pkg.exclusions.map((exc: string, i: number) => (
                          <div key={i} className="flex items-center justify-between text-neutral-500">
                            <span className="flex items-center gap-1.5">
                              <CloseCircle size={14} color="#7B778C" />
                              <span>{exc}</span>
                            </span>
                            <span className="text-neutral-300 border-b border-dotted border-neutral-200 flex-1 mx-2" />
                            <span>Tidak</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Coverage Check Card */}
          <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200">
            <h3 className="font-medium text-xs sm:text-sm text-neutral-900 mb-3">
              Apakah alamatmu dalam jangkauan?
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={checkArea}
                onChange={(e) => setCheckArea(e.target.value)}
                className="flex-1 h-11 px-3 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm outline-none"
              >
                <option value="Tebet">Tebet, Jakarta Selatan</option>
                <option value="Cilandak">Cilandak, Jakarta Selatan</option>
                <option value="Kebayoran Baru">Kebayoran Baru, Jakarta Selatan</option>
                <option value="Pancoran">Pancoran, Jakarta Selatan</option>
              </select>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 hover:bg-neutral-800"
                aria-label="Cek area"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-3">
              <TickCircle size={15} color="#059669" />
              <span>{worker.name} melayani area {checkArea}</span>
            </div>
          </div>

          {/* Guarantee Pill Box */}
          <div className="p-4 rounded-xl bg-lavender-50 border border-lavender-200 flex items-center gap-3 text-xs text-lavender-900">
            <ShieldTick size={24} color="#7A5CE6" variant="Bulk" className="shrink-0" />
            <p className="leading-relaxed">
              <strong>Pembayaran aman:</strong> dana baru diteruskan ke tukang setelah kamu mengonfirmasi pekerjaan selesai.
            </p>
          </div>

          {/* Section: Tukang Lain di Areamu */}
          <div className="pt-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-1">
              ( TUKANG LAIN DI AREAMU )
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-4">
              Bandingkan dulu, <span className="italic">baru putuskan</span>.
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {otherWorkers.map((w) => (
                <Link
                  key={w.id}
                  href={`/workers/${w.slug}`}
                  className="rounded-2xl overflow-hidden bg-neutral-900 text-white relative aspect-[3/4] flex flex-col justify-end p-3.5 group shadow-xs"
                >
                  <img
                    src={w.avatarUrl}
                    alt={w.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="font-serif text-lg text-white font-medium">{w.name}</h3>
                    <p className="text-[11px] text-neutral-300">
                      {w.categoryName} • mulai {formatRupiah(w.startingPrice)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky CTA Bar at Bottom */}
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-neutral-500">{selectedPackage?.name}</div>
              <div className="font-serif text-2xl font-bold text-neutral-900">
                {formatRupiah(selectedPackage?.price || 150000)}
              </div>
            </div>

            <Link
              href={`/order/${selectedPackage?.id || 'pkg-1'}?worker=${worker.id}`}
              className="px-8 py-3.5 rounded-full bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Pesan</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </CustomerShell>
  );
}
