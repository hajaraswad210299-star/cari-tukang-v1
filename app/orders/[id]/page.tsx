'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import CustomerShell from '@/components/customer/CustomerShell';
import {
  ArrowLeft2,
  Whatsapp,
  Verify,
  Camera,
  TickCircle,
  CloseCircle,
  Warning2,
  Calendar1,
  Location,
  ReceiptText,
} from '@/lib/icons';
import { formatRupiah } from '@/lib/format';
import { getOrderById, updateOrderStatus, Order } from '@/lib/data/orders';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isProblemSheetOpen, setIsProblemSheetOpen] = useState(false);
  const [problemReason, setProblemReason] = useState('Hasil belum rapi');
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmittedComplaint, setIsSubmittedComplaint] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getOrderById(orderId);
      if (data) setOrder(data);
    }
    load();
  }, [orderId]);

  if (!order) {
    return (
      <CustomerShell title="Detail Pesanan" showBack>
        <div className="p-12 text-center text-neutral-500">Memuat rincian pesanan...</div>
      </CustomerShell>
    );
  }

  const handleConfirmCompletion = async () => {
    const updated = await updateOrderStatus(order.id, 'completed');
    if (updated) {
      setOrder({ ...updated });
      if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7A5CE6', '#AC97FB', '#10B981'],
        });
      }
    }
  };

  const handleSendComplaint = () => {
    setIsSubmittedComplaint(true);
    setIsProblemSheetOpen(false);
  };

  const beforePhoto =
    order.problemPhotos[activePhotoIdx] ||
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80';
  const afterPhoto =
    order.resultPhotos[activePhotoIdx] ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80';

  return (
    <CustomerShell hideBottomNav={true}>
      <div className="max-w-[720px] mx-auto px-4 py-4 pb-36 space-y-6">
        {/* Top App Bar Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/orders')}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800"
            aria-label="Kembali ke pesanan"
          >
            <ArrowLeft2 size={18} />
          </button>
          <div className="text-center">
            <h1 className="font-semibold text-sm text-neutral-900">Detail pesanan</h1>
            <div className="text-[11px] font-mono text-neutral-400">
              ORD-20261014-{order.orderCode}
            </div>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:text-emerald-600"
            aria-label="WhatsApp CS"
          >
            <Whatsapp size={18} />
          </a>
        </div>

        {/* Status Notification Hero Card */}
        {order.status === 'awaiting_confirmation' && (
          <div className="p-5 rounded-3xl bg-orange-50/70 border border-orange-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs">
                📷
              </span>
              <span className="text-xs font-semibold text-orange-800">Menunggu konfirmasimu</span>
            </div>
            <h2 className="font-serif text-3xl text-neutral-900 font-normal leading-tight">
              Foto hasil sudah masuk. <span className="italic">Cek dulu, ya.</span>
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {order.workerName} menandai pekerjaan selesai pukul {order.timestamps.awaitingConfirmationAt || '10.42'}.
              Konfirmasi kalau hasilnya sudah sesuai ekspektasi.
            </p>
          </div>
        )}

        {order.status === 'completed' && (
          <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-2 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <TickCircle size={36} color="#059669" variant="Bold" />
            </div>
            <h2 className="font-serif text-3xl text-neutral-900 font-normal">
              Terima kasih! <span className="italic">Pesanan selesai.</span>
            </h2>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Dana sebesar {formatRupiah(order.packagePrice)} telah kami teruskan ke {order.workerName}.
            </p>
          </div>
        )}

        {isSubmittedComplaint && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Warning2 size={18} color="#D97706" className="shrink-0 mt-0.5" />
            <div>
              <strong>Laporan masalah diterima:</strong> "{problemReason}". Tim CS BuildMate akan segera menghubungi kamu via WhatsApp untuk penanganan garansi.
            </div>
          </div>
        )}

        {/* Interactive Before & After Photo Comparison Slider */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-neutral-900 select-none touch-none shadow-md">
            {/* After Image */}
            <img
              src={afterPhoto}
              alt="Sesudah perbaikan"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[11px] font-semibold text-white">
              Sesudah
            </span>

            {/* Before Image with clip */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforePhoto}
                alt="Sebelum perbaikan"
                className="absolute inset-0 w-full h-full object-cover filter contrast-110"
              />
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[11px] font-semibold text-white">
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

            {/* Touch & mouse dragging controller */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              aria-label="Geser untuk melihat foto sebelum dan sesudah"
            />
          </div>

          {/* Multiple Photo Thumbnails */}
          {order.problemPhotos.length > 1 && (
            <div className="flex items-center gap-2">
              {order.problemPhotos.map((url: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activePhotoIdx === i ? 'border-lavender-600 scale-95' : 'border-neutral-200'
                  }`}
                >
                  <img src={url} alt="Thumbnail foto" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Realtime Vertical Progress Timeline Card */}
        <div className="p-6 bg-white rounded-3xl border border-cream-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-100">
            <span className="font-semibold text-sm text-neutral-900">Progres pesanan</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Realtime
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-medium text-neutral-900">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Dibayar • dana ditahan
              </span>
              <span className="text-neutral-400 font-mono">{order.timestamps.paidAt || 'Rab 09.04'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-medium text-neutral-900">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Tukang dikonfirmasi
              </span>
              <span className="text-neutral-400 font-mono">
                {order.timestamps.workerConfirmedAt || 'Rab 09.20'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-medium text-neutral-900">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Dalam perjalanan
              </span>
              <span className="text-neutral-400 font-mono">
                {order.timestamps.onTheWayAt || 'Sab 07.40'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-medium text-neutral-900">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Sedang dikerjakan
              </span>
              <span className="text-neutral-400 font-mono">
                {order.timestamps.inProgressAt || 'Sab 08.12'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2.5 font-medium ${
                  order.status === 'awaiting_confirmation'
                    ? 'text-orange-700'
                    : order.status === 'completed'
                    ? 'text-neutral-900'
                    : 'text-neutral-400'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    order.status === 'awaiting_confirmation'
                      ? 'bg-orange-500 text-white ring-4 ring-orange-200'
                      : order.status === 'completed'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {order.status === 'completed' ? '✓' : '◉'}
                </span>
                Menunggu konfirmasimu
              </span>
              <span className="text-neutral-400 font-mono">
                {order.timestamps.awaitingConfirmationAt || 'Sab 10.42'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2.5 font-medium ${
                  order.status === 'completed' ? 'text-emerald-700' : 'text-neutral-400'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    order.status === 'completed'
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {order.status === 'completed' ? '✓' : '○'}
                </span>
                Selesai
              </span>
              <span className="text-neutral-400 font-mono">
                {order.timestamps.completedAt || '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Worker & Order Details Card */}
        <div className="p-5 bg-white rounded-3xl border border-cream-200 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-cream-100">
            <img
              src={order.workerAvatar}
              alt={order.workerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-sm text-neutral-900 flex items-center gap-1.5">
                <span>{order.workerName}</span>
                <Verify size={14} color="#7A5CE6" variant="Bold" />
              </div>
              <div className="text-xs text-neutral-500">
                {order.packageName} • 42 pekerjaan selesai
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <Calendar1 size={15} color="#5D596D" />
              <span>{order.scheduledDate} • {order.timeSlot}</span>
            </div>
            <div className="flex items-start gap-2">
              <Location size={15} color="#5D596D" className="mt-0.5 shrink-0" />
              <span className="leading-relaxed">{order.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <ReceiptText size={15} color="#5D596D" />
              <span>Total dibayar: <strong>{formatRupiah(order.total)}</strong></span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        {order.status === 'awaiting_confirmation' && (
          <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
            <div className="max-w-[720px] mx-auto space-y-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsProblemSheetOpen(true)}
                  className="flex-1 h-12 rounded-full border border-neutral-300 hover:bg-neutral-50 font-semibold text-xs text-neutral-800 tracking-wider uppercase transition-all"
                >
                  Ada masalah
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCompletion}
                  className="flex-1 h-12 rounded-full bg-lavender-600 hover:bg-lavender-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <TickCircle size={16} />
                  <span>Pesanan selesai</span>
                </button>
              </div>
              <div className="text-center text-[11px] text-neutral-500">
                Dana {formatRupiah(order.packagePrice)} diteruskan ke {order.workerName} setelah kamu konfirmasi.
              </div>
            </div>
          </div>
        )}

        {/* Complaint Bottom Sheet Modal */}
        {isProblemSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-neutral-950/40 backdrop-blur-xs">
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <h3 className="font-serif text-2xl text-neutral-900">Laporkan Masalah</h3>
                <button
                  onClick={() => setIsProblemSheetOpen(false)}
                  className="text-neutral-500 hover:text-neutral-900"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Pilih kendala yang kamu alami. Tim BuildMate akan mengamankan danamu dan membantu penyelesaian.
                </p>

                <div className="space-y-2">
                  {[
                    'Hasil belum rapi',
                    'Pekerjaan belum selesai',
                    'Ada kerusakan baru di sekitar area',
                    'Lainnya',
                  ].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setProblemReason(r)}
                      className={`w-full p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                        problemReason === r
                          ? 'border-lavender-600 bg-lavender-50 text-lavender-900'
                          : 'border-neutral-200 bg-white text-neutral-700'
                      }`}
                    >
                      <span>{r}</span>
                      {problemReason === r && <span>✓</span>}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 uppercase block mb-1">
                    Detail Masalah
                  </label>
                  <textarea
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs outline-none"
                    placeholder="Jelaskan bagian mana yang belum sesuai..."
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-cream-200 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProblemSheetOpen(false)}
                  className="flex-1 h-11 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSendComplaint}
                  className="flex-1 h-11 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                >
                  Kirim Laporan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomerShell>
  );
}
