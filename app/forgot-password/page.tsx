'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sms, ArrowLeft2 } from '@/lib/icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between p-6 max-w-md mx-auto">
      <div className="pt-4 flex items-center justify-between">
        <Link
          href="/login"
          className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800"
          aria-label="Kembali ke login"
        >
          <ArrowLeft2 size={18} />
        </Link>
        <Link href="/" className="font-serif text-2xl text-neutral-900 tracking-tight">
          BuildMate
        </Link>
        <div className="w-10" />
      </div>

      <div className="my-auto py-8 space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
            Lupa <span className="italic text-lavender-700">password?</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Masukkan emailmu untuk menerima instruksi pengaturan ulang password.
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Email</label>
              <div className="relative">
                <Sms size={18} color="#7B778C" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
            >
              Kirim Link Reset
            </button>
          </form>
        ) : (
          <div className="p-6 bg-white rounded-3xl border border-cream-200 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-neutral-900">Link terkirim!</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Jika email terdaftar, link reset sudah kami kirimkan ke <strong>{email}</strong>. Cek inbox atau folder spam kamu.
            </p>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="w-full h-11 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Kirim ulang link
            </button>
          </div>
        )}

        <div className="text-center text-xs text-neutral-600">
          Ingat passwordmu?{' '}
          <Link href="/login" className="font-semibold text-lavender-700 hover:underline">
            Kembali ke Masuk
          </Link>
        </div>
      </div>

      <div className="pb-4 text-center text-xs text-neutral-400">
        BuildMate • Bantuan Keamanan Akun
      </div>
    </div>
  );
}
