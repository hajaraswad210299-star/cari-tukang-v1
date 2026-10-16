'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Location } from '@/lib/icons';
import { updateUserProfile } from '@/lib/data/orders';

export default function WelcomePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('Hana Amelia');
  const [phone, setPhone] = useState('812-3456-7890');
  const [address, setAddress] = useState('Jl. Tebet Barat Dalam II No. 14, Tebet, Jakarta Selatan');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await updateUserProfile({
      fullName,
      phone: `+62 ${phone}`,
      defaultAddress: address,
      onboardingCompleted: true,
    });
    setTimeout(() => {
      router.push('/');
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
          <div className="text-[11px] font-semibold text-lavender-700 tracking-wider uppercase mb-1">
            Langkah Terakhir
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
            Satu langkah <span className="italic text-lavender-700">lagi</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Lengkapi nomor WhatsApp dan alamatmu agar tukang dapat berkoordinasi dengan mudah.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Nomor WhatsApp (wajib)</label>
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
                placeholder="812-xxxx-xxxx"
              />
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Dipakai tukang dan CS BuildMate untuk konfirmasi jadwal.
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Alamat utama</label>
            <div className="relative">
              <Location size={18} color="#7B778C" className="absolute left-3.5 top-3" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-2xl text-xs sm:text-sm focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200/50 outline-none leading-relaxed"
                placeholder="Alamat rumah atau kantor..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-2xl bg-lavender-600 hover:bg-lavender-700 active:scale-95 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
          </button>
        </form>
      </div>

      <div className="pb-4 text-center text-xs text-neutral-400">
        BuildMate • Selamat Datang
      </div>
    </div>
  );
}
