'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sms, ArrowRight } from '@/lib/icons';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'hana.amelia@email.com';
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const isGmail = email.toLowerCase().includes('gmail.com');

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between p-6 max-w-md mx-auto text-center">
      <div className="pt-6">
        <Link href="/" className="font-serif text-3xl text-neutral-900 tracking-tight">
          BuildMate
        </Link>
      </div>

      <div className="my-auto py-8 space-y-6">
        <div className="w-20 h-20 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto shadow-xs">
          <Sms size={40} color="#7A5CE6" />
        </div>

        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
            Cek emailmu
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xs mx-auto leading-relaxed">
            Kami mengirim link verifikasi ke <strong className="text-neutral-900">{email}</strong>. Klik link itu untuk mengaktifkan akunmu.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {isGmail && (
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 rounded-2xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Buka Gmail</span>
              <ArrowRight size={14} />
            </a>
          )}

          <button
            type="button"
            disabled={countdown > 0}
            onClick={() => setCountdown(60)}
            className="w-full h-12 rounded-2xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs tracking-wider uppercase flex items-center justify-center transition-all disabled:opacity-50"
          >
            {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim ulang email'}
          </button>
        </div>

        <div className="text-xs text-neutral-500">
          Salah email?{' '}
          <Link href="/register" className="font-semibold text-lavender-700 hover:underline">
            Ubah
          </Link>
        </div>
      </div>

      <div className="pb-4 text-xs text-neutral-400">
        BuildMate • Verifikasi Akun Aman
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500">Memuat verifikasi...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
