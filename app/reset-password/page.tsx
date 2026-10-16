'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeSlash, TickCircle } from '@/lib/icons';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const strengthScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber].filter(Boolean).length;

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between p-6 max-w-md mx-auto">
      <div className="pt-6 text-center">
        <Link href="/" className="font-serif text-3xl text-neutral-900 tracking-tight">
          BuildMate
        </Link>
      </div>

      <div className="my-auto py-6 space-y-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
            Atur ulang <span className="italic text-lavender-700">password</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Buat password baru yang aman untuk akun BuildMate kamu.
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Password baru</label>
              <div className="relative">
                <Lock size={18} color="#7B778C" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password && (
                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1.5 rounded-full transition-all ${
                          strengthScore >= step ? 'bg-lavender-600' : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Konfirmasi password baru</label>
              <div className="relative">
                <Lock size={18} color="#7B778C" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
            >
              Simpan Password Baru
            </button>
          </form>
        ) : (
          <div className="p-6 bg-white rounded-3xl border border-cream-200 space-y-3 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-neutral-900">Password berhasil diubah</h3>
            <p className="text-xs text-neutral-500">Mengarahkanmu ke halaman masuk...</p>
          </div>
        )}
      </div>

      <div className="pb-4 text-center text-xs text-neutral-400">
        BuildMate • Keamanan Terjamin
      </div>
    </div>
  );
}
