'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  TickCircle,
  CloseCircle,
  Clock,
  ArrowRight,
} from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { getOrderById, updateOrderStatus, Order } from '@/lib/data/orders';

function PaymentStatusContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params?.orderId as string;
  const statusParam = searchParams.get('status') || 'success';

  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<'processing' | 'success' | 'waiting' | 'failed'>('processing');

  useEffect(() => {
    async function load() {
      // Simulate quick processing delay
      const o = await getOrderById(orderId || 'order-1');
      if (o) setOrder(o);

      setTimeout(async () => {
        if (statusParam === 'success') {
          setCurrentStatus('success');
          await updateOrderStatus(orderId || 'order-1', 'paid');
          // Confetti celebration
          if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#7A5CE6', '#AC97FB', '#10B981', '#F59E0B'],
            });
          }
        } else if (statusParam === 'waiting') {
          setCurrentStatus('waiting');
        } else {
          setCurrentStatus('failed');
        }
      }, 1000);
    }
    load();
  }, [orderId, statusParam]);

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="w-8" />
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Status Pembayaran
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
          aria-label="Tutup"
        >
          ✕
        </button>
      </div>

      {/* Main Status Area */}
      <div className="my-auto py-8 text-center space-y-6">
        {/* State: Processing */}
        {currentStatus === 'processing' && (
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full border-4 border-lavender-200 border-t-lavender-600 animate-spin mx-auto" />
            <h1 className="font-serif text-3xl text-neutral-900">Mengonfirmasi pembayaranmu...</h1>
            <p className="text-xs text-neutral-500">Biasanya kurang dari 10 detik.</p>
          </div>
        )}

        {/* State: Success */}
        {currentStatus === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Animated checkmark circle */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <TickCircle size={44} color="#059669" variant="Bold" />
            </div>

            <div>
              <h1 className="font-serif text-4xl text-neutral-900 font-normal">
                Pembayaran <span className="italic">berhasil</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xs mx-auto leading-relaxed">
                Dana ditahan BuildMate sampai kamu mengonfirmasi pekerjaan selesai.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 bg-white rounded-2xl border border-cream-200 text-left space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-cream-100">
                <span className="font-mono text-xs text-neutral-800 font-semibold">
                  ORD-20261014-{order?.orderCode || '7Q2K'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold">
                  • Mencari tukang
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Paket</span>
                  <span className="font-medium text-neutral-900">{order?.packageName || 'Ganti keran'}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Jadwal</span>
                  <span className="font-medium text-neutral-900">{order?.scheduledDate || 'Sab, 17 Okt • 08.00'}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600 pt-2 border-t border-cream-100">
                  <span>Total dibayar</span>
                  <span className="font-serif text-base font-bold text-neutral-900">
                    {formatRupiah(order?.total || 155000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State: Waiting */}
        {currentStatus === 'waiting' && (
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Clock size={44} color="#D97706" />
            </div>
            <h1 className="font-serif text-3xl text-neutral-900">Menunggu pembayaran</h1>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              Selesaikan pembayaran di ATM atau m-Banking sebelum batas waktu berakhir.
            </p>
          </div>
        )}

        {/* State: Failed */}
        {currentStatus === 'failed' && (
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <CloseCircle size={44} color="#DC2626" />
            </div>
            <h1 className="font-serif text-3xl text-neutral-900">Pembayaran belum selesai</h1>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              Transaksi dibatalkan atau kedaluwarsa. Kamu bisa mencoba memesan kembali.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-3 pb-4">
        {currentStatus === 'success' ? (
          <>
            <Link
              href={`/orders/${order?.id || 'order-1'}`}
              className="w-full h-12 rounded-full bg-lavender-600 hover:bg-lavender-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Lihat progres pesanan</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="w-full h-12 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-xs tracking-wider uppercase flex items-center justify-center transition-all hover:bg-cream-100"
            >
              Kembali ke beranda
            </Link>
          </>
        ) : (
          <Link
            href="/"
            className="w-full h-12 rounded-full bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center transition-all"
          >
            Kembali ke beranda
          </Link>
        )}
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500">Memuat status pembayaran...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
}
