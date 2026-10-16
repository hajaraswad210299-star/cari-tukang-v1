'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import CustomerShell from '@/components/customer/CustomerShell';
import {
  ArrowLeft2,
  Verify,
  Sun1,
  Sun,
  CloudSunny,
  Camera,
  CloseCircle,
  TickCircle,
  ShieldTick,
  Crown1,
  ArrowRight,
} from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { getPackageById, PackageItem } from '@/lib/data/packages';
import { getWorkerById, Worker } from '@/lib/data/workers';
import { createOrder, getUserProfile } from '@/lib/data/orders';

function OrderFlowContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const packageId = params?.packageId as string;
  const workerId = searchParams.get('worker');

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [pkg, setPkg] = useState<PackageItem | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isPlusUser, setIsPlusUser] = useState(false);

  // Form states
  const [address, setAddress] = useState(
    'Jl. Tebet Barat Dalam II No. 14, RT 05/RW 02, Tebet, Jakarta Selatan 12810. Pagar hitam.'
  );
  const [saveAsDefaultAddress, setSaveAsDefaultAddress] = useState(true);
  const [selectedDateIndex, setSelectedDateIndex] = useState(2); // Sab 17 Okt
  const [selectedSlot, setSelectedSlot] = useState<'pagi' | 'siang' | 'sore'>('pagi');
  const [description, setDescription] = useState(
    'Keran wastafel dapur bocor di pangkal. Airnya terus menetes walau sudah ditutup rapat.'
  );
  const [allowReassign, setAllowReassign] = useState(true);
  const [understandScope, setUnderstandScope] = useState(true);
  const [problemPhotos, setProblemPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542013936693-884638332954?w=400&auto=format&fit=crop&q=80',
  ]);

  // Payment mock popup state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  useEffect(() => {
    async function init() {
      const p = await getPackageById(packageId || 'pkg-1');
      if (p) setPkg(p);

      const w = await getWorkerById(workerId || 'worker-1');
      if (w) setWorker(w);

      const user = await getUserProfile();
      setIsPlusUser(user.isPlus);
      if (user.defaultAddress) setAddress(user.defaultAddress);
    }
    init();
  }, [packageId, workerId]);

  if (!pkg) {
    return (
      <CustomerShell title="Pesan Paket" showBack>
        <div className="p-12 text-center text-neutral-500">Memuat rincian paket...</div>
      </CustomerShell>
    );
  }

  // Dates generator (14 days ahead)
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayName: days[d.getDay()],
      dateNum: d.getDate(),
      monthName: months[d.getMonth()],
      fullText: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} 2026`,
    };
  });

  const slots = [
    { key: 'pagi', title: 'Pagi', time: '08.00–11.00', icon: Sun1 },
    { key: 'siang', title: 'Siang', time: '11.00–14.00', icon: Sun },
    { key: 'sore', title: 'Sore', time: '14.00–17.00', icon: CloudSunny },
  ];

  const serviceFee = isPlusUser ? 0 : 5000;
  const totalPrice = pkg.price + serviceFee;

  const handleNextToSummary = () => {
    if (description.trim().length < 10) {
      alert('Deskripsi masalah minimal 10 karakter.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPayment = async () => {
    if (!understandScope) {
      alert('Harap centang persetujuan cakupan paket sebelum melanjutkan.');
      return;
    }
    setIsProcessingPayment(true);
    const newOrder = await createOrder({
      packageId: pkg.id,
      workerId: worker?.id,
      address,
      scheduledDate: dateOptions[selectedDateIndex].fullText,
      timeSlot: slots.find((s) => s.key === selectedSlot)?.time || '08.00–11.00',
      description,
      allowReassign,
      problemPhotos,
    });
    setCreatedOrderId(newOrder.id);
    setCurrentStep(3);
    setIsProcessingPayment(false);
  };

  const handleSimulatePaymentSuccess = () => {
    router.push(`/payment/${createdOrderId || 'order-1'}?status=success`);
  };

  return (
    <CustomerShell hideBottomNav={true}>
      <div className="max-w-[640px] mx-auto px-4 py-4 pb-32">
        {/* Top Header Bar & Stepper */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (currentStep === 1) router.back();
              else setCurrentStep((prev) => (prev - 1) as any);
            }}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800"
            aria-label="Kembali"
          >
            <ArrowLeft2 size={18} />
          </button>
          <div className="font-semibold text-sm text-neutral-900">
            Pesan {pkg.name.toLowerCase()}
          </div>
          <div className="text-xs font-mono text-neutral-500">{currentStep}/3</div>
        </div>

        {/* 3 Steps indicator lines */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center">
          <div>
            <div
              className={`h-1 rounded-full mb-1 transition-all ${
                currentStep >= 1 ? 'bg-lavender-600' : 'bg-neutral-200'
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                currentStep === 1 ? 'text-lavender-700' : 'text-neutral-500'
              }`}
            >
              Detail
            </span>
          </div>
          <div>
            <div
              className={`h-1 rounded-full mb-1 transition-all ${
                currentStep >= 2 ? 'bg-lavender-600' : 'bg-neutral-200'
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                currentStep === 2 ? 'text-lavender-700' : 'text-neutral-500'
              }`}
            >
              Ringkasan
            </span>
          </div>
          <div>
            <div
              className={`h-1 rounded-full mb-1 transition-all ${
                currentStep === 3 ? 'bg-lavender-600' : 'bg-neutral-200'
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                currentStep === 3 ? 'text-lavender-700' : 'text-neutral-500'
              }`}
            >
              Bayar
            </span>
          </div>
        </div>

        {/* Top Package & Worker Card */}
        <div className="bg-white rounded-2xl p-4 border border-cream-200 flex items-center justify-between gap-3 mb-6 shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={worker?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
              alt={worker?.name || 'Tukang'}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h2 className="font-semibold text-sm text-neutral-900">{pkg.name}</h2>
              <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                <span>{worker?.name || 'Agus Santoso'}</span>
                <Verify size={12} color="#7A5CE6" variant="Bold" />
              </div>
            </div>
          </div>
          <div className="font-serif text-lg font-bold text-neutral-900">
            {formatRupiah(pkg.price)}
          </div>
        </div>

        {/* STEP 1: FORM DETAIL */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* (01) Alamat */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">(01)</span>
                <label className="font-serif text-xl text-neutral-900 font-medium">Alamat</label>
              </div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full p-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm text-neutral-800 focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none leading-relaxed"
                placeholder="Tuliskan alamat lengkap beserta patokan rumah..."
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={saveAsDefaultAddress}
                  onChange={(e) => setSaveAsDefaultAddress(e.target.checked)}
                  className="w-4 h-4 accent-lavender-600 rounded"
                />
                <span className="text-xs text-neutral-700">Simpan sebagai alamat utama</span>
              </label>
            </div>

            {/* (02) Tanggal */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400">(02)</span>
                  <label className="font-serif text-xl text-neutral-900 font-medium">Tanggal</label>
                </div>
                <span className="text-xs text-neutral-500">mulai besok</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {dateOptions.map((d, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`min-w-[64px] py-3 rounded-2xl text-center border transition-all shrink-0 ${
                        isSelected
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                          : 'bg-white border-neutral-200 text-neutral-800 hover:bg-cream-100'
                      }`}
                    >
                      <div className="text-[11px] opacity-80">{d.dayName}</div>
                      <div className="font-serif text-xl font-bold my-0.5">{d.dateNum}</div>
                      <div className="text-[10px] opacity-80">{d.monthName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* (03) Slot Waktu */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">(03)</span>
                <label className="font-serif text-xl text-neutral-900 font-medium">Slot waktu</label>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {slots.map((s) => {
                  const Icon = s.icon;
                  const isSelected = selectedSlot === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSelectedSlot(s.key as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[96px] ${
                        isSelected
                          ? 'border-lavender-600 bg-lavender-50/50 ring-2 ring-lavender-200 shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <Icon size={20} color={isSelected ? '#7A5CE6' : '#5D596D'} />
                      <div>
                        <div className="font-semibold text-xs text-neutral-900">{s.title}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{s.time}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* (04) Ceritakan Masalahnya */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">(04)</span>
                <label className="font-serif text-xl text-neutral-900 font-medium">
                  Ceritakan masalahnya
                </label>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full p-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm text-neutral-800 focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none leading-relaxed"
                placeholder="Contoh: Keran wastafel dapur bocor di sambungan pipa..."
              />
              <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
                <span>Minimal 10 karakter</span>
                <span>{description.length}/500</span>
              </div>
            </div>

            {/* (05) Foto Masalah */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400">(05)</span>
                  <label className="font-serif text-xl text-neutral-900 font-medium">
                    Foto masalah
                  </label>
                </div>
                <span className="text-xs text-neutral-500">opsional, maks. 3</span>
              </div>
              <div className="flex items-center gap-3">
                {problemPhotos.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-neutral-200 shadow-xs">
                    <img src={url} alt="Foto masalah" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setProblemPhotos(problemPhotos.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-neutral-950/70 text-white flex items-center justify-center text-xs"
                      aria-label="Hapus foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {problemPhotos.length < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setProblemPhotos([
                        ...problemPhotos,
                        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
                      ]);
                    }}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-neutral-300 bg-white hover:bg-cream-100 flex flex-col items-center justify-center text-neutral-500 gap-1 text-xs"
                  >
                    <Camera size={20} />
                    <span className="text-[10px]">Kamera/galeri</span>
                  </button>
                )}
              </div>
            </div>

            {/* (06) Kalau Tukang Berhalangan */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">(06)</span>
                <label className="font-serif text-xl text-neutral-900 font-medium">
                  Kalau tukang berhalangan
                </label>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={allowReassign}
                  onChange={(e) => setAllowReassign(e.target.checked)}
                  className="w-5 h-5 accent-lavender-600 rounded mt-0.5"
                />
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900">
                    Boleh dialihkan ke tukang terverifikasi lain
                  </div>
                  <div className="text-neutral-500 mt-0.5">
                    Paket, harga, dan jadwal tidak berubah.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RINGKASAN */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h1 className="font-serif text-3xl text-neutral-900 font-normal">
              Cek lagi <span className="italic">sebelum bayar</span>
            </h1>

            {/* Jadwal Summary */}
            <div className="p-4 bg-white rounded-2xl border border-cream-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  JADWAL
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-900 mt-1">
                  {dateOptions[selectedDateIndex].fullText} • {slots.find((s) => s.key === selectedSlot)?.title}{' '}
                  {slots.find((s) => s.key === selectedSlot)?.time}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-lavender-600 hover:underline"
              >
                Ubah
              </button>
            </div>

            {/* Alamat Summary */}
            <div className="p-4 bg-white rounded-2xl border border-cream-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  ALAMAT
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-900 mt-1 line-clamp-2">
                  {address}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-lavender-600 hover:underline"
              >
                Ubah
              </button>
            </div>

            {/* Masalah Summary */}
            <div className="p-4 bg-white rounded-2xl border border-cream-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  MASALAH
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-lavender-600 hover:underline"
                >
                  Ubah
                </button>
              </div>
              <p className="text-xs text-neutral-800 italic">"{description}"</p>
              {problemPhotos.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  {problemPhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Foto masalah"
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-200"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Cakupan Paket Summary */}
            <div className="p-4 bg-white rounded-2xl border border-cream-200 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                CAKUPAN PAKET
              </div>
              <div className="text-xs text-neutral-800 leading-relaxed">
                {pkg.inclusions.join(', ')}.
              </div>
              <div className="text-[11px] text-neutral-500">
                Tidak termasuk: {pkg.exclusions.join(', ')}.
              </div>
            </div>

            {/* Rincian Biaya */}
            <div className="p-5 bg-white rounded-2xl border border-cream-200 space-y-3">
              <div className="font-serif text-xl text-neutral-900 font-medium">Rincian biaya</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Paket {pkg.name.toLowerCase()}</span>
                  <span className="font-mono">{formatRupiah(pkg.price)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Biaya layanan</span>
                  <span className="font-mono">
                    {isPlusUser ? 'Rp0 (Plus)' : formatRupiah(serviceFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-cream-100 flex items-center justify-between font-serif text-xl text-neutral-900 font-bold">
                  <span>Total</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Upsell Plus Card */}
            {!isPlusUser && (
              <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Crown1 size={20} color="#7A5CE6" />
                  <div>
                    <div className="font-semibold text-lavender-950">
                      Hemat Rp5.000 dan dapat garansi dengan Plus
                    </div>
                    <Link href="/plus" className="text-lavender-700 underline font-medium">
                      Lihat manfaatnya →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Checkbox Statement */}
            <label className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={understandScope}
                onChange={(e) => setUnderstandScope(e.target.checked)}
                className="w-5 h-5 accent-lavender-600 rounded mt-0.5"
              />
              <span className="text-xs text-neutral-800 leading-relaxed">
                Saya memahami cakupan paket. Pekerjaan di luar cakupan dibicarakan terpisah.
              </span>
            </label>
          </div>
        )}

        {/* STEP 3: BAYAR (Midtrans Snap Simulation) */}
        {currentStep === 3 && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto mb-2">
              <ShieldTick size={32} color="#7A5CE6" variant="Bulk" />
            </div>

            <div>
              <h1 className="font-serif text-3xl text-neutral-900 font-normal">
                Menghubungkan ke Midtrans Snap
              </h1>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Silakan pilih metode pembayaran sandbox (QRIS, GoPay, atau Virtual Account Bank).
              </p>
            </div>

            {/* Mock Snap Popup Simulator Card */}
            <div className="p-6 bg-white rounded-3xl border border-neutral-300 max-w-md mx-auto text-left shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="font-bold text-xs uppercase text-neutral-400">Midtrans Sandbox</span>
                <span className="font-serif text-lg font-bold text-lavender-700">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-neutral-500">Pilih metode simulasi bayar:</div>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleSimulatePaymentSuccess}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-lavender-600 hover:bg-lavender-50 flex items-center justify-between transition-all"
                  >
                    <span className="font-medium text-neutral-800">QRIS / GoPay (Instant Simulator)</span>
                    <span className="text-emerald-600 font-semibold text-xs">Bayar Sekarang →</span>
                  </button>
                  <button
                    onClick={handleSimulatePaymentSuccess}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-lavender-600 hover:bg-lavender-50 flex items-center justify-between transition-all"
                  >
                    <span className="font-medium text-neutral-800">BCA Virtual Account</span>
                    <span className="text-emerald-600 font-semibold text-xs">Simulasi Sukses →</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cream-100 text-[11px] text-neutral-600 leading-relaxed">
                ℹ️ Ini adalah mode sandbox Midtrans resmi. Pembayaran tidak memotong saldo asli.
              </div>
            </div>
          </div>
        )}

        {/* Sticky CTA Bar Bottom for Step 1 & 2 */}
        {currentStep !== 3 && (
          <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
            <div className="max-w-[640px] mx-auto flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-neutral-500">
                  {currentStep === 1 ? 'Total (termasuk biaya layanan)' : 'Total pembayaran'}
                </div>
                <div className="font-serif text-2xl font-bold text-neutral-900">
                  {formatRupiah(totalPrice)}
                </div>
              </div>

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNextToSummary}
                  className="px-8 py-3.5 rounded-full bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Lanjut</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleStartPayment}
                  className="px-8 py-3.5 rounded-full bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                >
                  <span>{isProcessingPayment ? 'Menyiapkan...' : 'Lanjut ke bayar'}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </CustomerShell>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500">Memuat formulir pesanan...</div>}>
      <OrderFlowContent />
    </Suspense>
  );
}
