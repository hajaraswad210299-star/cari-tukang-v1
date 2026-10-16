'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerShell from '@/components/customer/CustomerShell';
import { Crown1, TickCircle, ArrowLeft2 } from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { updateUserProfile } from '@/lib/data/orders';

export default function BuildMatePlusPage() {
  const router = useRouter();
  const [orderCount, setOrderCount] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const estimatedSavings = orderCount * 5000;

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    await updateUserProfile({ isPlus: true });
    setTimeout(() => {
      alert('Selamat! Kamu resmi menjadi member BuildMate Plus. Biaya layanan pesananmu sekarang Rp0.');
      router.push('/account');
    }, 800);
  };

  return (
    <CustomerShell hideBottomNav={true}>
      <div className="max-w-[640px] mx-auto px-4 py-4 pb-32 space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800"
            aria-label="Kembali"
          >
            <ArrowLeft2 size={18} />
          </button>
          <div className="font-semibold text-sm text-neutral-900">BuildMate Plus</div>
          <div className="w-10" />
        </div>

        {/* 1. Hero Card (Lavender Gradient) */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-lavender-100 via-lavender-50 to-purple-100 border border-lavender-200 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-600 text-white text-[10px] font-bold tracking-wider uppercase">
              <Crown1 size={13} color="#FFF" />
              <span>BUILDMATE PLUS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal leading-tight">
              Perbaikan rutin, <br />
              <span className="italic text-lavender-800">lebih hemat.</span>
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Biaya layanan Rp0 dan garansi pengerjaan ulang 7 hari. Bayar sekali per 30 hari.
            </p>
          </div>

          {/* Membership Card Graphic */}
          <div className="relative rounded-2xl p-6 bg-neutral-950 text-white overflow-hidden shadow-xl border border-neutral-800">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-lavender-600/20 blur-2xl" />
            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Crown1 size={18} color="#C9BBFF" />
                <span className="font-semibold text-xs tracking-wide">BuildMate Plus</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-lavender-900 text-lavender-200 font-mono">
                MEMBER
              </span>
            </div>

            <div className="relative z-10 font-serif text-2xl text-white mb-4">
              Hana Amelia
            </div>

            <div className="relative z-10 flex items-center gap-6 text-xs text-neutral-400">
              <div>
                <div className="text-[10px] text-neutral-500">Biaya layanan</div>
                <div className="font-bold text-white text-sm">Rp0</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500">Garansi</div>
                <div className="font-bold text-white text-sm">7 hari</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Section: Gratis vs Plus Comparison Table */}
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-1">
              ( GRATIS VS PLUS )
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal">
              Bedanya terasa di <span className="italic">setiap pesanan.</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-xs">
            <div className="grid grid-cols-3 p-3.5 border-b border-cream-100 text-xs font-semibold text-neutral-500">
              <div>Fasilitas</div>
              <div className="text-center">Gratis</div>
              <div className="text-center text-lavender-700 bg-lavender-50 py-1 rounded-lg">Plus</div>
            </div>

            <div className="divide-y divide-cream-100 text-xs">
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="text-neutral-700 font-medium">Biaya layanan</span>
                <span className="text-center text-neutral-600">Rp5.000</span>
                <span className="text-center font-bold text-lavender-700">Rp0</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="text-neutral-700 font-medium">Lapor masalah</span>
                <span className="text-center text-emerald-600">✓</span>
                <span className="text-center text-emerald-600 font-bold">✓</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="text-neutral-700 font-medium">Garansi ulang 7 hari</span>
                <span className="text-center text-neutral-300">—</span>
                <span className="text-center text-emerald-600 font-bold">✓</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="text-neutral-700 font-medium">Badge Plus Eksklusif</span>
                <span className="text-center text-neutral-300">—</span>
                <span className="text-center text-emerald-600 font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Section: Kalkulator Hemat Slider */}
        <div className="rounded-3xl p-6 bg-neutral-900 text-white space-y-6 shadow-md">
          <div className="text-xs font-semibold tracking-widest uppercase text-lavender-400">
            ( KALKULATOR HEMAT )
          </div>

          <h3 className="font-serif text-2xl text-white font-normal">
            Berapa kali kamu pesan per bulan?
          </h3>

          <div className="space-y-4">
            <input
              type="range"
              min="1"
              max="6"
              value={orderCount}
              onChange={(e) => setOrderCount(Number(e.target.value))}
              className="w-full accent-lavender-500 h-2 bg-neutral-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-neutral-400 font-mono">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <span
                  key={num}
                  className={orderCount === num ? 'text-white font-bold text-sm' : ''}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Hemat <span className="italic text-lavender-200">{formatRupiah(estimatedSavings)}</span>
            </div>
            <p className="text-xs text-neutral-300 mt-1">
              + garansi pengerjaan ulang di setiap pesanan tanpa khawatir
            </p>
            <div className="mt-4 p-3 rounded-xl bg-neutral-800 text-[11px] text-neutral-400">
              Biaya layanan saja balik modal mulai 6 pesanan. Nilai utama Plus ada di garansi 7 hari.
            </div>
          </div>
        </div>

        {/* 4. Section: FAQ Plus */}
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-1">
            ( FAQ PLUS )
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Apakah Plus diperpanjang otomatis?',
                a: 'Tidak. Bayar sekali untuk 30 hari. Perpanjang manual menambah 30 hari dari tanggal berakhir.',
              },
              {
                q: 'Bagaimana cara kerja garansi?',
                a: 'Jika dalam 7 hari hasil perbaikan mengalami kendala yang sama, tukang akan datang kembali tanpa biaya jasa tambahan.',
              },
              {
                q: 'Kalau Plus berakhir di tengah pesanan?',
                a: 'Pesanan yang dibuat saat masa aktif Plus tetap mendapatkan biaya layanan Rp0 dan garansi penuh.',
              },
              {
                q: 'Bisa dibatalkan dan refund?',
                a: 'Karena benefit langsung aktif seketika, langganan Plus tidak dapat dibatalkan di tengah periode.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-cream-200 p-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-900"
                >
                  <span>{faq.q}</span>
                  <span className="text-neutral-400 font-light text-base ml-2">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-neutral-600 leading-relaxed mt-2 pt-2 border-t border-cream-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky CTA Bar Bottom */}
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
          <div className="max-w-[640px] mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-neutral-500">30 hari</div>
              <div className="font-serif text-2xl font-bold text-neutral-900">Rp29.000</div>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="px-8 py-3.5 rounded-full bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              <Crown1 size={16} />
              <span>{isSubscribing ? 'Memproses...' : 'Berlangganan'}</span>
            </button>
          </div>
        </div>
      </div>
    </CustomerShell>
  );
}
