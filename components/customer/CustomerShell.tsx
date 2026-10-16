'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home2,
  SearchNormal1,
  ReceiptText,
  ProfileCircle,
  Crown1,
  Whatsapp,
  ArrowLeft2,
} from '@/lib/icons';

interface CustomerShellProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function CustomerShell({
  children,
  hideBottomNav = false,
  title,
  showBack = false,
  onBack,
  rightAction,
}: CustomerShellProps) {
  const pathname = usePathname();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const isHome = pathname === '/';
  const isSearch = pathname.startsWith('/search');
  const isOrders = pathname.startsWith('/orders');
  const isAccount = pathname.startsWith('/account');
  const isPlus = pathname.startsWith('/plus');

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-neutral-900">
      {/* 1. Top Announcement Bar (Flamingo Pattern) */}
      {showAnnouncement && (
        <div className="bg-lavender-900 text-white text-xs py-2 px-4 flex items-center justify-between text-center relative z-50">
          <div className="w-6" /> {/* spacer */}
          <Link
            href="/plus"
            className="flex items-center justify-center gap-1.5 font-medium hover:text-lavender-200 transition-colors"
          >
            <Crown1 size={14} className="text-lavender-300" />
            <span>BuildMate Plus — bebas biaya layanan & garansi pengerjaan ulang →</span>
          </Link>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="w-6 text-lavender-400 hover:text-white text-base leading-none"
            aria-label="Tutup pengumuman"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. Desktop Navbar (>= 1024px) */}
      <header className="hidden lg:flex items-center justify-between h-[72px] px-8 max-w-[1200px] w-full mx-auto border-b border-cream-200 sticky top-0 bg-cream-50/90 backdrop-blur-md z-40">
        {/* Left Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
          <Link
            href="/search"
            className={`hover:text-lavender-600 transition-colors ${
              isSearch ? 'text-lavender-600 font-semibold' : ''
            }`}
          >
            Cari Tukang
          </Link>
          <Link href="/#cara-kerja" className="hover:text-lavender-600 transition-colors">
            Cara Kerja
          </Link>
          <Link
            href="/plus"
            className={`flex items-center gap-1 hover:text-lavender-600 transition-colors ${
              isPlus ? 'text-lavender-600 font-semibold' : ''
            }`}
          >
            <Crown1 size={16} className="text-lavender-600" />
            <span>Plus</span>
          </Link>
          <Link
            href="/mitra/daftar"
            className="hover:text-lavender-600 transition-colors text-neutral-500 hover:underline"
          >
            Jadi Mitra
          </Link>
        </nav>

        {/* Center Wordmark (Instrument Serif 28px) */}
        <Link
          href="/"
          className="font-serif text-[28px] tracking-tight text-neutral-900 font-normal hover:opacity-90 transition-opacity"
        >
          BuildMate
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/orders"
            className={`text-sm font-medium hover:text-lavender-600 transition-colors flex items-center gap-1.5 ${
              isOrders ? 'text-lavender-600 font-semibold' : 'text-neutral-700'
            }`}
          >
            <span>Pesanan</span>
            <span className="w-5 h-5 bg-lavender-600 text-white rounded-full text-xs flex items-center justify-center font-semibold">
              3
            </span>
          </Link>

          <Link
            href="/account"
            className="flex items-center gap-2 pl-2 hover:opacity-85 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-700 font-semibold text-xs flex items-center justify-center">
              HA
            </div>
          </Link>
        </div>
      </header>

      {/* 3. Mobile Top App Bar (< 1024px) */}
      <header className="lg:hidden h-14 px-4 flex items-center justify-between border-b border-cream-200 sticky top-0 bg-cream-50/95 backdrop-blur-md z-40">
        {isHome ? (
          <>
            <Link
              href="/search"
              className="p-2 -ml-2 text-neutral-700 hover:text-lavender-600 rounded-full"
              aria-label="Cari"
            >
              <SearchNormal1 size={22} />
            </Link>
            <Link href="/" className="font-serif text-2xl tracking-tight text-neutral-900">
              BuildMate
            </Link>
            <Link
              href="/account"
              className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-700 font-semibold text-xs flex items-center justify-center -mr-1"
            >
              HA
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {showBack ? (
                <button
                  onClick={onBack || (() => window.history.back())}
                  className="p-2 -ml-2 text-neutral-800 hover:text-lavender-600 rounded-full"
                  aria-label="Kembali"
                >
                  <ArrowLeft2 size={20} />
                </button>
              ) : (
                <Link
                  href="/"
                  className="p-2 -ml-2 text-neutral-800 hover:text-lavender-600 rounded-full"
                  aria-label="Beranda"
                >
                  <ArrowLeft2 size={20} />
                </Link>
              )}
              {title && (
                <h1 className="text-base font-semibold text-neutral-900 tracking-tight line-clamp-1">
                  {title}
                </h1>
              )}
            </div>
            {rightAction || (
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-neutral-600 hover:text-neutral-900"
                aria-label="WhatsApp"
              >
                <Whatsapp size={20} />
              </a>
            )}
          </>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>

      {/* 4. Desktop Footer */}
      <footer className="hidden lg:block bg-lavender-900 text-lavender-100 mt-20 pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 pb-12 border-b border-lavender-800">
            <div>
              <h3 className="font-serif text-xl text-white mb-4">Tentang BuildMate</h3>
              <p className="text-xs text-lavender-200 leading-relaxed mb-4">
                Marketplace jasa tukang terverifikasi dengan harga pasti, pembayaran aman via
                rekber, dan garansi pengerjaan ulang.
              </p>
              <div className="flex items-center gap-2 text-xs text-lavender-300">
                <Whatsapp size={16} />
                <span>CS WhatsApp: +62 812-3456-7890</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white mb-4">Layanan</h3>
              <ul className="space-y-2 text-xs text-lavender-200">
                <li>
                  <Link href="/search?category=plumbing" className="hover:text-white">
                    Plumbing & Keran
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=pengecatan" className="hover:text-white">
                    Pengecatan Dinding
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=perbaikan-umum" className="hover:text-white">
                    Perbaikan Umum & Engsel
                  </Link>
                </li>
                <li>
                  <Link href="/search?category=servis-ac" className="hover:text-white">
                    Servis AC Ringan
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white mb-4">Bantuan</h3>
              <ul className="space-y-2 text-xs text-lavender-200">
                <li>
                  <Link href="/#cara-kerja" className="hover:text-white">
                    Cara Kerja Rekber
                  </Link>
                </li>
                <li>
                  <Link href="/plus" className="hover:text-white">
                    Keanggotaan Plus
                  </Link>
                </li>
                <li>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white">
                    Hubungi Dukungan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white mb-4">Mitra Tukang</h3>
              <ul className="space-y-2 text-xs text-lavender-200">
                <li>
                  <Link href="/mitra/daftar" className="hover:text-white">
                    Daftar Jadi Mitra
                  </Link>
                </li>
                <li>
                  <Link href="/mitra/login" className="hover:text-white">
                    Portal Masuk Mitra
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-white text-lavender-400">
                    Masuk Admin Operator
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-lavender-400 gap-4">
            <div className="font-serif text-3xl text-white tracking-tight">BuildMate</div>
            <p>© 2026 BuildMate. Simulasi — pembayaran memakai Midtrans Sandbox.</p>
          </div>
        </div>
      </footer>

      {/* 5. Mobile Bottom Nav (< 1024px) */}
      {!hideBottomNav && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-neutral-200 flex items-center justify-around px-2 z-40 pb-[env(safe-area-inset-bottom)]">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isHome ? 'text-lavender-600 font-semibold' : 'text-neutral-500'
            }`}
          >
            <div
              className={`p-1 rounded-full transition-all ${
                isHome ? 'bg-lavender-50' : 'bg-transparent'
              }`}
            >
              <Home2
                size={22}
                variant={isHome ? 'Bold' : 'Linear'}
                color={isHome ? '#7A5CE6' : '#7B778C'}
              />
            </div>
            <span className="text-[11px] mt-0.5">Beranda</span>
          </Link>

          <Link
            href="/search"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isSearch ? 'text-lavender-600 font-semibold' : 'text-neutral-500'
            }`}
          >
            <div
              className={`p-1 rounded-full transition-all ${
                isSearch ? 'bg-lavender-50' : 'bg-transparent'
              }`}
            >
              <SearchNormal1
                size={22}
                variant={isSearch ? 'Bold' : 'Linear'}
                color={isSearch ? '#7A5CE6' : '#7B778C'}
              />
            </div>
            <span className="text-[11px] mt-0.5">Cari</span>
          </Link>

          <Link
            href="/orders"
            className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-all ${
              isOrders ? 'text-lavender-600 font-semibold' : 'text-neutral-500'
            }`}
          >
            <div
              className={`p-1 rounded-full relative transition-all ${
                isOrders ? 'bg-lavender-50' : 'bg-transparent'
              }`}
            >
              <ReceiptText
                size={22}
                variant={isOrders ? 'Bold' : 'Linear'}
                color={isOrders ? '#7A5CE6' : '#7B778C'}
              />
              <span className="absolute -top-0.5 -right-1 bg-lavender-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <span className="text-[11px] mt-0.5">Pesanan</span>
          </Link>

          <Link
            href="/account"
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isAccount ? 'text-lavender-600 font-semibold' : 'text-neutral-500'
            }`}
          >
            <div
              className={`p-1 rounded-full transition-all ${
                isAccount ? 'bg-lavender-50' : 'bg-transparent'
              }`}
            >
              <ProfileCircle
                size={22}
                variant={isAccount ? 'Bold' : 'Linear'}
                color={isAccount ? '#7A5CE6' : '#7B778C'}
              />
            </div>
            <span className="text-[11px] mt-0.5">Akun</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
