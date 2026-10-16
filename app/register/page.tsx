'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Sms, Lock, Eye, EyeSlash, TickCircle } from '@/lib/icons';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password rules checklist
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const strengthScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber].filter(Boolean).length;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }
    if (strengthScore < 3) {
      alert('Password belum memenuhi standar keamanan.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 600);
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
            Buat akun <span className="italic text-lavender-700">BuildMate</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Pesan tukang terverifikasi dalam hitungan menit.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Nama lengkap</label>
            <div className="relative">
              <User size={18} color="#7B778C" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none"
                placeholder="Nama kamu"
              />
            </div>
          </div>

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

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Nomor WhatsApp</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                +62
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none"
                placeholder="812-3456-7890"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Password</label>
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

            {/* Password Strength bar */}
            {password && (
              <div className="space-y-2 mt-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all ${
                        strengthScore >= step
                          ? strengthScore >= 4
                            ? 'bg-emerald-500'
                            : strengthScore >= 3
                            ? 'bg-lavender-600'
                            : 'bg-amber-500'
                          : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-neutral-600">
                  <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-700 font-medium' : ''}`}>
                    {hasMinLength ? '✓' : '•'} Min. 8 karakter
                  </div>
                  <div className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-700 font-medium' : ''}`}>
                    {hasNumber ? '✓' : '•'} Mengandung angka
                  </div>
                  <div className={`flex items-center gap-1 ${hasUpperCase ? 'text-emerald-700 font-medium' : ''}`}>
                    {hasUpperCase ? '✓' : '•'} Huruf besar
                  </div>
                  <div className={`flex items-center gap-1 ${hasLowerCase ? 'text-emerald-700 font-medium' : ''}`}>
                    {hasLowerCase ? '✓' : '•'} Huruf kecil
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Konfirmasi password</label>
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

          <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 accent-lavender-600 rounded mt-0.5"
            />
            <span className="text-xs text-neutral-700 leading-snug">
              Saya setuju dengan <strong>Syarat Layanan</strong> dan <strong>Kebijakan Privasi</strong> BuildMate.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="w-full h-12 rounded-2xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm disabled:opacity-50"
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-lavender-700 hover:underline">
            Masuk
          </Link>
        </div>
      </div>

      <div className="text-center pb-4 text-xs text-neutral-500">
        Kamu tukang?{' '}
        <Link href="/mitra/daftar" className="font-semibold text-lavender-700 hover:underline">
          Daftar sebagai mitra →
        </Link>
      </div>
    </div>
  );
}
