'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomerShell from '@/components/customer/CustomerShell';
import { useTypewriter } from '@/hooks/useTypewriter';
import {
  SearchNormal1,
  ShieldTick,
  Verify,
  Camera,
  ArrowRight,
  Drop,
  Brush2,
  Ruler,
  Wind,
  Clock,
  Whatsapp,
} from '@/lib/icons';
import { MOCK_WORKERS, MOCK_PACKAGES } from '@/lib/mock/data';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'plumbing' | 'pengecatan' | 'perbaikan-umum' | 'servis-ac'>('pengecatan');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const placeholderText = useTypewriter([
    'Keran bocor...',
    'Cat dinding kamar...',
    'Engsel pintu seret...',
    'Saluran wastafel mampet...',
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const handleTagClick = (tag: string) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <CustomerShell>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-4 lg:py-8 space-y-12 lg:space-y-20">
        {/* 1. Hero Section (Rounded Card with Photography Background) */}
        <section className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden bg-neutral-900 text-white min-h-[560px] lg:min-h-[580px] flex flex-col justify-between p-6 lg:p-12 shadow-md">
          {/* Background image with warm dark overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />

          {/* Top Hero Badge */}
          <div className="relative z-10 flex items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-lavender-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              TUKANG TERVERIFIKASI • JAKARTA SELATAN
            </div>
          </div>

          {/* Center Hero Headline */}
          <div className="relative z-10 my-auto py-6 max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-tight mb-4">
              Rumah beres, <br />
              hati <span className="italic text-lavender-200">tenang.</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                  alt="Tukang"
                  className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                  alt="Tukang"
                  className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover"
                />
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-lavender-600 text-white font-bold text-xs flex items-center justify-center">
                  +12
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200">
                Tukang ditinjau admin, dana ditahan sampai kamu puas.
              </p>
            </div>
          </div>

          {/* Search Box Card inside Hero */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-4 sm:p-5 text-neutral-900 shadow-xl border border-neutral-100">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Butuh perbaikan apa?
            </div>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <SearchNormal1
                  size={18}
                  color="#7B778C"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholderText || 'Cari masalah atau paket...'}
                  className="w-full h-12 pl-10 pr-4 bg-neutral-100 hover:bg-neutral-50 focus:bg-white text-sm rounded-xl border border-transparent focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none transition-all placeholder:text-neutral-400 font-medium"
                />
              </div>
              <button
                type="submit"
                className="h-12 w-12 rounded-xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
                aria-label="Cari sekarang"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-100">
              {['Ganti keran', 'Cat dinding', 'Engsel pintu'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="text-xs px-3 py-1 rounded-full bg-cream-100 text-neutral-700 hover:bg-lavender-100 hover:text-lavender-800 transition-colors"
                >
                  {tag}
                </button>
              ))}
              <div className="ml-auto hidden sm:flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <ShieldTick size={14} color="#047857" />
                <span>Rekber BuildMate</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Section: Tentang BuildMate (Editorial Quote) */}
        <section className="text-center max-w-2xl mx-auto py-4">
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
            ( TENTANG BUILDMATE )
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug font-normal">
            Butuh tukang, tapi khawatir harganya berubah dan hasilnya asal jadi?{' '}
            <span className="text-neutral-500">
              BuildMate mempertemukanmu dengan tukang terverifikasi, harga paket pasti, dan pembayaran yang baru diteruskan setelah pekerjaan beres.
            </span>
          </h2>

          {/* Category Circle Buttons */}
          <div className="grid grid-cols-4 gap-4 mt-8 max-w-md mx-auto">
            <Link
              href="/search?category=plumbing"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-cream-100 group-hover:bg-lavender-600 group-hover:text-white transition-all flex items-center justify-center text-neutral-800 shadow-sm">
                <Drop size={24} />
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-lavender-600">
                Plumbing
              </span>
            </Link>

            <Link
              href="/search?category=pengecatan"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-sm">
                <Brush2 size={24} />
              </div>
              <span className="text-xs font-semibold text-neutral-900">
                Pengecatan
              </span>
            </Link>

            <Link
              href="/search?category=perbaikan-umum"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-cream-100 group-hover:bg-lavender-600 group-hover:text-white transition-all flex items-center justify-center text-neutral-800 shadow-sm">
                <Ruler size={24} />
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-lavender-600">
                Perbaikan
              </span>
            </Link>

            <Link
              href="/search?category=servis-ac"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-cream-100 group-hover:bg-lavender-600 group-hover:text-white transition-all flex items-center justify-center text-neutral-800 shadow-sm">
                <Wind size={24} />
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-lavender-600">
                Servis AC
              </span>
            </Link>
          </div>
        </section>

        {/* 3. Section: Cara Kerja (3 Langkah) */}
        <section id="cara-kerja" className="bg-neutral-900 text-white rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-lavender-400 mb-2">
            ( CARA KERJA )
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-8">
            Dari rusak jadi <span className="italic text-lavender-200">beres</span>, tiga langkah saja.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-neutral-800/80 rounded-2xl p-5 border border-neutral-700 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-neutral-400 text-xs font-mono mb-4">
                  <span>LANGKAH</span>
                  <span className="text-lavender-300 font-bold">01</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">Pilih tukang & paket</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Bandingkan tukang terverifikasi di areamu. Harga paket tertulis jelas sejak awal tanpa biaya siluman.
                </p>
              </div>
              <div className="mt-6 rounded-xl overflow-hidden bg-neutral-950 p-3 border border-neutral-700 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Agus Santoso"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-medium text-white flex items-center gap-1">
                    Agus Santoso <Verify size={12} color="#9277F2" variant="Bold" />
                  </div>
                  <div className="text-neutral-400">Ganti keran • Rp150.000</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-neutral-800/80 rounded-2xl p-5 border border-neutral-700 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-neutral-400 text-xs font-mono mb-4">
                  <span>LANGKAH</span>
                  <span className="text-lavender-300 font-bold">02</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">Bayar aman, dana ditahan</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Bayar dengan QRIS, VA, atau kartu lewat Midtrans Sandbox. Uangmu disimpan di rekber BuildMate.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-neutral-950 p-3 border border-neutral-700 text-xs text-neutral-300 flex items-center gap-2">
                <ShieldTick size={20} color="#7A5CE6" variant="Bulk" />
                <span>Dana aman sampai kamu puas</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-neutral-800/80 rounded-2xl p-5 border border-neutral-700 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-neutral-400 text-xs font-mono mb-4">
                  <span>LANGKAH</span>
                  <span className="text-lavender-300 font-bold">03</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">Cek foto & konfirmasi</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Tukang mengunggah foto bukti pengerjaan. Puas dengan hasilnya? Konfirmasi dan dana baru diteruskan.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-neutral-950 p-3 border border-neutral-700 text-xs text-emerald-400 flex items-center gap-2">
                <Camera size={18} color="#10B981" />
                <span>Bandingkan foto sebelum & sesudah</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section: Paket Layanan Pilihan */}
        <section>
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
            ( LAYANAN )
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal tracking-tight mb-6">
            Paket harga <span className="italic">pasti</span> untuk perbaikan sehari-hari.
          </h2>

          {/* Accordion Style Category Picker */}
          <div className="space-y-4">
            {/* 01 Plumbing */}
            <div className="border border-cream-200 rounded-2xl bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setActiveCategory(activeCategory === 'plumbing' ? 'pengecatan' : 'plumbing')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-cream-50 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-neutral-400 mr-2">(01)</span>
                  <span className="font-serif text-xl text-neutral-900 font-medium">Plumbing</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">mulai Rp150.000</span>
                </div>
                <span className="text-xl font-light text-neutral-400">
                  {activeCategory === 'plumbing' ? '−' : '+'}
                </span>
              </button>
              {activeCategory === 'plumbing' && (
                <div className="p-5 pt-0 border-t border-cream-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="max-w-md">
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Keran dol, pipa bocor, wastafel mampet, atau shower kamar mandi bermasalah diselesaikan dengan alat lengkap.
                    </p>
                  </div>
                  <Link
                    href="/order/pkg-1?worker=worker-1"
                    className="px-5 py-2.5 rounded-full bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-semibold tracking-wide flex items-center gap-2"
                  >
                    <span>PILIH GANTI KERAN · Rp150.000</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* 02 Pengecatan (Active in Design Mockup) */}
            <div className="border-2 border-neutral-900 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 mr-2">(02)</span>
                  <span className="font-serif text-2xl text-neutral-900 font-medium">Pengecatan</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">mulai Rp150.000</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                  −
                </div>
              </div>

              <div className="p-5 pt-0">
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 max-w-xl">
                  Dinding kusam atau bernoda? Tukang cat mengamplas ringan, mengecat dua lapis, dan merapikan area kerja tanpa cipratan.
                </p>

                {/* Semicircle photo banner like Flamingo design */}
                <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&auto=format&fit=crop&q=80"
                    alt="Tukang cat dinding"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Active Package Card (Dark) */}
                <div className="bg-neutral-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-base text-white">Cat ulang dinding s.d. 10 m²</h3>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> 1 hari
                      </span>
                      <span>•</span>
                      <span>4 tukang tersedia di area Jaksel</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="font-serif text-2xl text-white">Rp350.000</div>
                    <Link
                      href="/order/pkg-4?worker=worker-3"
                      className="px-6 py-3 rounded-full bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm"
                    >
                      <span>Lihat tukang</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 Perbaikan Umum */}
            <div className="border border-cream-200 rounded-2xl bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setActiveCategory(activeCategory === 'perbaikan-umum' ? 'pengecatan' : 'perbaikan-umum')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-cream-50 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-neutral-400 mr-2">(03)</span>
                  <span className="font-serif text-xl text-neutral-900 font-medium">Perbaikan Umum</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">mulai Rp100.000</span>
                </div>
                <span className="text-xl font-light text-neutral-400">
                  {activeCategory === 'perbaikan-umum' ? '−' : '+'}
                </span>
              </button>
            </div>

            {/* 04 Servis AC Ringan */}
            <div className="border border-cream-200 rounded-2xl bg-white overflow-hidden shadow-xs opacity-75">
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 mr-2">(04)</span>
                  <span className="font-serif text-xl text-neutral-900 font-medium">Servis AC Ringan</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">Segera hadir</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cream-100 text-neutral-600 font-medium">
                  Segera
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Section: Transparan Sampai Akhir (Before/After Slider & Realtime Progress) */}
        <section className="bg-neutral-800 text-white rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-lavender-300 mb-2">
            ( TRANSPARAN SAMPAI AKHIR )
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-4">
            Hasilnya <span className="italic text-lavender-200">kelihatan</span>, bukan cuma dijanjikan.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mb-8 max-w-xl">
            Setiap pesanan ditutup dengan foto dokumentasi. Kamu yang memegang kendali penuh kapan pekerjaan dikonfirmasi selesai.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Interactive Before/After Split */}
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden select-none touch-none shadow-lg">
              {/* After Image */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80"
                alt="Sesudah perbaikan"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-[11px] font-semibold text-white">
                Sesudah
              </span>

              {/* Before Image with clip */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80"
                  alt="Sebelum perbaikan"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-[11px] font-semibold text-white">
                  Sebelum
                </span>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-md"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center font-bold text-xs shadow-lg">
                  ↔
                </div>
              </div>

              {/* Range input for accessibility & dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                aria-label="Geser untuk melihat perbandingan sebelum dan sesudah"
              />
            </div>

            {/* Simulated Live Order Progress Box */}
            <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                <span className="font-semibold text-sm text-white">Progres Pesanan</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Realtime
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-700 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                    Dibayar • dana ditahan
                  </span>
                  <span className="text-neutral-500 font-mono">09:12</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-700 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                    Tukang dikonfirmasi
                  </span>
                  <span className="text-neutral-500 font-mono">09:20</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-700 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                    Dalam perjalanan
                  </span>
                  <span className="text-neutral-500 font-mono">10:05</span>
                </div>
                <div className="flex items-center justify-between text-white font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-lavender-600 text-white flex items-center justify-center text-[10px] ring-4 ring-lavender-500/30">◉</span>
                    Sedang dikerjakan
                  </span>
                  <span className="text-lavender-300 font-mono">10:40</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-600 flex items-center justify-center text-[10px]">○</span>
                    Menunggu konfirmasimu
                  </span>
                  <span>—</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Section: Tukang Pilihan */}
        <section>
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
            ( TUKANG PILIHAN )
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal tracking-tight">
              Kenalan dulu dengan tukang di <span className="italic">sekitarmu</span>.
            </h2>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:border-neutral-900 transition-colors shrink-0"
            >
              <span>Lihat semua tukang</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_WORKERS.slice(0, 3).map((worker) => (
              <Link
                key={worker.id}
                href={`/workers/${worker.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 text-white min-h-[380px] flex flex-col justify-between p-5 transition-transform hover:-translate-y-1 shadow-sm"
              >
                <img
                  src={worker.avatarUrl}
                  alt={worker.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent" />

                {/* Badge top */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold flex items-center gap-1 shadow-xs">
                    <Verify size={14} color="#7A5CE6" variant="Bold" />
                    <span>Terverifikasi</span>
                  </div>
                </div>

                {/* Info bottom */}
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-lavender-200 transition-colors flex items-center gap-2">
                    {worker.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    {worker.area} • {worker.categoryName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-200 mt-3 pt-3 border-t border-white/20">
                    <span>{worker.completedJobs} pekerjaan selesai</span>
                    <span className="font-semibold text-white">mulai Rp150.000</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. Section: FAQ (Frequently Asked Questions) */}
        <section className="bg-white rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-cream-200">
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
            ( FAQ )
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal tracking-tight mb-8">
            Yang sering <span className="italic">ditanyakan</span>.
          </h2>

          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: 'Kapan dana diteruskan ke tukang?',
                a: 'Setelah kamu menekan tombol "Pesanan selesai" di aplikasi. Kalau kamu belum merespons, sistem menyelesaikan otomatis setelah batas waktu 24 jam (atau 2 menit saat simulasi demo), selama tidak ada komplain.',
              },
              {
                q: 'Bagaimana kalau hasilnya kurang rapi?',
                a: 'Kamu bisa memilih opsi "Ada masalah" saat status menunggu konfirmasi. Untuk pengguna Plus, tersedia garansi pengerjaan ulang 7 hari tanpa biaya tambahan.',
              },
              {
                q: 'Bagaimana tukang diverifikasi?',
                a: 'Setiap tukang melewati kurasi identitas KTP, pengalaman kerja nyata minimal 3 tahun, serta review portofolio oleh tim operasional BuildMate.',
              },
              {
                q: 'Apa bedanya akun Gratis dan Plus?',
                a: 'Pengguna Plus mendapatkan bebas biaya layanan (Rp0 dibanding Rp5.000 per pesanan) dan perlindungan garansi perbaikan ulang selama 7 hari.',
              },
              {
                q: 'Bisa batal setelah bayar?',
                a: 'Bisa dibatalkan langsung selama tukang belum dikonfirmasi. Jika sudah dikonfirmasi dan ada kendala mendesak, tim dukungan CS BuildMate siap membantu pengembalian dana via rekber.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-cream-200 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-neutral-900 hover:text-lavender-600 transition-colors text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-neutral-400 font-light ml-4">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2 pb-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Bottom CTA Card */}
        <section className="bg-neutral-900 text-white rounded-[24px] lg:rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="text-xs font-semibold tracking-widest uppercase text-lavender-400 mb-2">
              ( MULAI SEKARANG )
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
              Perbaikan kecil, <br />
              <span className="italic text-lavender-200">tanpa drama</span> besar.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6">
              Pilih paket, bayar aman lewat rekber, dan pantau tukangmu sampai pekerjaan tuntas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/search"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-xs tracking-wider uppercase hover:bg-neutral-100 transition-colors shadow-sm"
              >
                Cari tukang →
              </Link>
              <Link
                href="/mitra/daftar"
                className="w-full sm:w-auto px-6 py-3.5 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                Kamu tukang? Jadi Mitra →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </CustomerShell>
  );
}
