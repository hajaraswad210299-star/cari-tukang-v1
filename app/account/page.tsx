'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomerShell from '@/components/customer/CustomerShell';
import {
  User,
  Crown1,
  Lock,
  Sms,
  Whatsapp,
  LogoutCurve,
  ArrowRight,
  InfoCircle,
  Location,
} from '@/lib/icons';
import { getUserProfile, updateUserProfile } from '@/lib/data/orders';
import { UserProfile } from '@/lib/mock/data';

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getUserProfile();
      setProfile(data);
      setAddressInput(data.defaultAddress || '');
    }
    load();
  }, []);

  if (!profile) {
    return (
      <CustomerShell title="Akun">
        <div className="p-12 text-center text-neutral-500">Memuat profil...</div>
      </CustomerShell>
    );
  }

  const handleSaveAddress = async () => {
    const updated = await updateUserProfile({ defaultAddress: addressInput });
    setProfile(updated);
    setIsEditingAddress(false);
  };

  return (
    <CustomerShell title="Akun">
      <div className="max-w-[560px] mx-auto px-4 py-8 space-y-6 pb-28">
        {/* Profile Header Avatar & Name */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-lavender-100 text-lavender-700 font-serif text-3xl font-bold flex items-center justify-center mx-auto shadow-xs border border-lavender-200">
            HA
          </div>
          <div>
            <h1 className="font-serif text-3xl text-neutral-900 font-normal">
              {profile.fullName}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">{profile.email}</p>
          </div>
          <div className="pt-1">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                profile.isPlus
                  ? 'bg-lavender-600 text-white shadow-xs'
                  : 'bg-neutral-200/80 text-neutral-700'
              }`}
            >
              {profile.isPlus ? 'BuildMate Plus Member' : 'Akun Gratis'}
            </span>
          </div>
        </div>

        {/* Upgrade Plus Banner (Only if free user) */}
        {!profile.isPlus && (
          <Link
            href="/plus"
            className="p-4 rounded-2xl bg-gradient-to-r from-lavender-100 to-purple-100 border border-lavender-200 flex items-center justify-between group shadow-xs transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender-600 text-white flex items-center justify-center">
                <Crown1 size={20} color="#FFF" />
              </div>
              <div>
                <div className="font-semibold text-xs text-neutral-900">Upgrade ke Plus</div>
                <div className="text-[11px] text-neutral-600 mt-0.5">
                  Biaya layanan Rp0 + garansi 7 hari
                </div>
              </div>
            </div>
            <ArrowRight size={16} className="text-neutral-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {/* Section: Profil */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-1">
            PROFIL
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 divide-y divide-cream-100 overflow-hidden shadow-xs">
            <div className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-neutral-600">
                <User size={18} />
                <div>
                  <div className="text-[10px] text-neutral-400">Nama</div>
                  <div className="font-medium text-neutral-900">{profile.fullName}</div>
                </div>
              </div>
              <span className="text-neutral-400">›</span>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-neutral-600">
                <span className="text-base">📞</span>
                <div>
                  <div className="text-[10px] text-neutral-400">Nomor WhatsApp</div>
                  <div className="font-medium text-neutral-900">{profile.phone}</div>
                </div>
              </div>
              <span className="text-neutral-400">›</span>
            </div>

            <div className="p-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-neutral-600">
                  <Location size={18} />
                  <div>
                    <div className="text-[10px] text-neutral-400">Alamat utama</div>
                    <div className="font-medium text-neutral-900 line-clamp-1">
                      {profile.defaultAddress || 'Belum diatur'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-semibold text-lavender-600 hover:underline"
                >
                  {isEditingAddress ? 'Batal' : 'Ubah'}
                </button>
              </div>

              {isEditingAddress && (
                <div className="mt-3 pt-3 border-t border-cream-100 space-y-2">
                  <textarea
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs outline-none focus:border-lavender-600"
                  />
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-1.5 rounded-full bg-lavender-600 text-white text-xs font-semibold hover:bg-lavender-700"
                  >
                    Simpan Alamat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section: Keamanan */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-1">
            KEAMANAN
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 divide-y divide-cream-100 overflow-hidden shadow-xs">
            <Link
              href="/reset-password"
              className="p-4 flex items-center justify-between text-xs hover:bg-cream-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-neutral-600">
                <Lock size={18} />
                <span className="font-medium text-neutral-900">Ubah password</span>
              </div>
              <span className="text-neutral-400">›</span>
            </Link>

            <div className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-neutral-600">
                <Sms size={18} />
                <div>
                  <div className="text-[10px] text-neutral-400">Metode masuk</div>
                  <div className="font-medium text-neutral-900">Email & password</div>
                </div>
              </div>
              <span className="text-neutral-400">›</span>
            </div>
          </div>
        </div>

        {/* Section: Bantuan */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-1">
            BANTUAN
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 divide-y divide-cream-100 overflow-hidden shadow-xs">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="p-4 flex items-center justify-between text-xs hover:bg-cream-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-neutral-600">
                <Whatsapp size={18} />
                <span className="font-medium text-neutral-900">Hubungi BuildMate</span>
              </div>
              <span className="text-neutral-400">›</span>
            </a>

            <Link
              href="/#cara-kerja"
              className="p-4 flex items-center justify-between text-xs hover:bg-cream-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-neutral-600">
                <InfoCircle size={18} />
                <span className="font-medium text-neutral-900">Cara kerja rekber</span>
              </div>
              <span className="text-neutral-400">›</span>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={() => router.push('/login')}
            className="w-full h-12 rounded-2xl bg-white border border-neutral-200 text-rose-600 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors shadow-xs"
          >
            <LogoutCurve size={18} color="#DC2626" />
            <span>Keluar</span>
          </button>
        </div>

        <div className="text-center text-[11px] text-neutral-400 pt-2">
          BuildMate • Simulasi, pembayaran memakai sandbox
        </div>
      </div>
    </CustomerShell>
  );
}
