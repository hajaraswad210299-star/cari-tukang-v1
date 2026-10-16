'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomerShell from '@/components/customer/CustomerShell';
import { formatRupiah } from '@/lib/format';
import { getOrders, Order } from '@/lib/data/orders';
import { ArrowRight, Clock, TickCircle, Location } from '@/lib/icons';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getOrders(activeTab);
      setOrders(data);
    }
    load();
  }, [activeTab]);

  return (
    <CustomerShell title="Pesanan Saya">
      <div className="max-w-[720px] mx-auto px-4 py-6 space-y-6">
        {/* Header Title */}
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
          Pesanan <span className="italic">saya</span>
        </h1>

        {/* Segmented Pill Tabs */}
        <div className="bg-cream-100 p-1 rounded-full flex items-center text-xs font-medium max-w-xs">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'active'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Aktif</span>
            <span className="w-4 h-4 bg-lavender-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'history'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Riwayat</span>
            <span className="w-4 h-4 bg-neutral-200 text-neutral-600 rounded-full text-[10px] flex items-center justify-center font-bold">
              5
            </span>
          </button>
        </div>

        {/* Orders Card List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const isAwaitingConfirmation = order.status === 'awaiting_confirmation';
            const isPendingPayment = order.status === 'pending_payment';

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl p-5 border transition-all ${
                  isAwaitingConfirmation
                    ? 'border-lavender-600 ring-2 ring-lavender-200/50 shadow-sm'
                    : 'border-cream-200 shadow-xs'
                }`}
              >
                {/* Header: Badge & Order Code */}
                <div className="flex items-center justify-between pb-3 border-b border-cream-100">
                  {order.status === 'awaiting_confirmation' && (
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      Menunggu konfirmasi
                    </span>
                  )}
                  {order.status === 'on_the_way' && (
                    <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      Dalam perjalanan
                    </span>
                  )}
                  {order.status === 'pending_payment' && (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1.5">
                      <Clock size={12} color="#D97706" />
                      Menunggu pembayaran
                    </span>
                  )}
                  {order.status === 'completed' && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                      <TickCircle size={12} color="#059669" />
                      Selesai
                    </span>
                  )}

                  <span className="font-mono text-xs text-neutral-400 font-semibold">
                    {order.orderCode}
                  </span>
                </div>

                {/* Body Content */}
                <div className="py-4 flex gap-4 items-start">
                  <img
                    src={
                      order.problemPhotos[0] ||
                      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&auto=format&fit=crop&q=80'
                    }
                    alt={order.packageName}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-neutral-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base text-neutral-900 truncate">
                      {order.packageName}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">
                      {order.workerName} • {order.scheduledDate} • {order.timeSlot}
                    </p>

                    {/* Mini 7-step progress bar */}
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 7 }, (_, i) => {
                        const stepIndex =
                          order.status === 'pending_payment'
                            ? 0
                            : order.status === 'paid'
                            ? 2
                            : order.status === 'on_the_way'
                            ? 3
                            : order.status === 'in_progress'
                            ? 4
                            : order.status === 'awaiting_confirmation'
                            ? 6
                            : 7;
                        const isFilled = i < stepIndex;
                        return (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              isFilled ? 'bg-lavender-600' : 'bg-neutral-200'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      {order.status === 'awaiting_confirmation'
                        ? 'Langkah 6 dari 7'
                        : order.status === 'on_the_way'
                        ? 'Menuju lokasimu'
                        : 'Bayar dalam 23:41:12'}
                    </div>
                  </div>
                </div>

                {/* Footer: Total & Contextual CTA button */}
                <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-400">Total</div>
                    <div className="font-serif text-lg font-bold text-neutral-900">
                      {formatRupiah(order.total)}
                    </div>
                  </div>

                  {isAwaitingConfirmation ? (
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-5 py-2.5 rounded-full bg-lavender-600 hover:bg-lavender-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      Cek hasil & konfirmasi
                    </Link>
                  ) : isPendingPayment ? (
                    <Link
                      href={`/order/${order.packageId}`}
                      className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      Lanjutkan bayar
                    </Link>
                  ) : (
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-xs hover:bg-neutral-50 transition-colors"
                    >
                      Lihat progres
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CustomerShell>
  );
}
