export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  startingPrice: number;
  availableWorkers: number;
}

export interface PackageItem {
  id: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  slug: string;
  price: number;
  durationMinutes: number;
  durationText: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  image: string;
  availableWorkersCount: number;
}

export interface Worker {
  id: string;
  name: string;
  slug: string;
  phone: string;
  bio: string;
  area: string;
  city: string;
  experienceYears: number;
  completedJobs: number;
  isVerified: boolean;
  avatarUrl: string;
  portfolio: string[];
  categorySlug: string;
  categoryName: string;
  packages: PackageItem[];
  startingPrice: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  serviceFee: number;
  total: number;
  address: string;
  scheduledDate: string;
  timeSlot: string;
  description: string;
  status:
    | 'pending_payment'
    | 'paid'
    | 'worker_confirmed'
    | 'on_the_way'
    | 'in_progress'
    | 'awaiting_confirmation'
    | 'completed'
    | 'cancelled';
  dispatchStatus: 'idle' | 'searching' | 'assigned' | 'exhausted';
  allowReassign: boolean;
  problemPhotos: string[];
  resultPhotos: string[];
  createdAt: string;
  timestamps: {
    paidAt?: string;
    workerConfirmedAt?: string;
    onTheWayAt?: string;
    inProgressAt?: string;
    awaitingConfirmationAt?: string;
    completedAt?: string;
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  defaultAddress: string;
  avatarUrl?: string;
  isPlus: boolean;
  plusExpiresAt?: string;
  onboardingCompleted: boolean;
  role: 'customer' | 'worker' | 'admin';
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Plumbing',
    slug: 'plumbing',
    icon: 'Drop',
    startingPrice: 150000,
    availableWorkers: 6,
  },
  {
    id: 'cat-2',
    name: 'Pengecatan',
    slug: 'pengecatan',
    icon: 'Brush2',
    startingPrice: 150000,
    availableWorkers: 4,
  },
  {
    id: 'cat-3',
    name: 'Perbaikan Umum',
    slug: 'perbaikan-umum',
    icon: 'Ruler',
    startingPrice: 100000,
    availableWorkers: 5,
  },
  {
    id: 'cat-4',
    name: 'Servis AC Ringan',
    slug: 'servis-ac',
    icon: 'Wind',
    startingPrice: 80000,
    availableWorkers: 3,
  },
];

export const MOCK_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-1',
    categoryId: 'cat-1',
    categorySlug: 'plumbing',
    categoryName: 'Plumbing',
    name: 'Ganti keran',
    slug: 'ganti-keran',
    price: 150000,
    durationMinutes: 90,
    durationText: '1–2 jam',
    description: 'Penggantian atau pemasangan keran air wastafel, sink cuci piring, atau shower baru.',
    inclusions: [
      'Lepas keran lama',
      'Pasang keran baru (unit dari kamu)',
      'Cek kebocoran sambungan',
      'Rapikan area kerja',
    ],
    exclusions: ['Ganti pipa di dalam dinding', 'Pembelian unit keran baru'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    availableWorkersCount: 6,
  },
  {
    id: 'pkg-2',
    categoryId: 'cat-1',
    categorySlug: 'plumbing',
    categoryName: 'Plumbing',
    name: 'Perbaiki kebocoran pipa kecil',
    slug: 'perbaiki-kebocoran-pipa-kecil',
    price: 175000,
    durationMinutes: 90,
    durationText: '1–2 jam',
    description: 'Tambal atau ganti segmen sambungan pipa PVC/air bersih yang bocor atau retak.',
    inclusions: [
      'Bongkar sambungan pipa yang bocor',
      'Lem dan ganti fitting pipa standar',
      'Uji tekanan air setelah perbaikan',
    ],
    exclusions: ['Bongkar keramik dinding luas', 'Penggantian jalur pipa induk'],
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&auto=format&fit=crop&q=80',
    availableWorkersCount: 5,
  },
  {
    id: 'pkg-3',
    categoryId: 'cat-1',
    categorySlug: 'plumbing',
    categoryName: 'Plumbing',
    name: 'Bersihkan saluran mampet',
    slug: 'bersihkan-saluran-mampet',
    price: 200000,
    durationMinutes: 120,
    durationText: '1–2 jam',
    description: 'Pelancaran pipa pembuangan wastafel atau floor drain kamar mandi yang tersumbat.',
    inclusions: [
      'Spiral wire cleaning mekanis',
      'Pembersihan sisa lemak & kotoran',
      'Uji kelancaran pembuangan air',
    ],
    exclusions: ['Sedot septictank penuh', 'Pipa tertimbun coran semen'],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80',
    availableWorkersCount: 4,
  },
  {
    id: 'pkg-4',
    categoryId: 'cat-2',
    categorySlug: 'pengecatan',
    categoryName: 'Pengecatan',
    name: 'Cat ulang dinding s.d. 10 m²',
    slug: 'cat-ulang-dinding-10m2',
    price: 350000,
    durationMinutes: 480,
    durationText: '1 hari',
    description: 'Dinding kusam atau bernoda? Tukang cat mengamplas ringan, mengecat dua lapis, dan merapikan area kerja.',
    inclusions: [
      'Amplas ringan & plamir retak rambut',
      'Mengecat 2 lapis merata',
      'Plastik pelindung lantai & perabot',
      'Merapikan sisa cat & area kerja',
    ],
    exclusions: ['Cat disediakan pelanggan atau beli terpisah', 'Perbaikan dinding jebol'],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    availableWorkersCount: 4,
  },
  {
    id: 'pkg-5',
    categoryId: 'cat-3',
    categorySlug: 'perbaikan-umum',
    categoryName: 'Perbaikan Umum',
    name: 'Perbaiki engsel / pintu',
    slug: 'perbaiki-engsel-pintu',
    price: 100000,
    durationMinutes: 60,
    durationText: '± 1 jam',
    description: 'Penyetelan dan perbaikan engsel pintu kayu, lemari, atau jendela yang seret, berdecit, atau turun.',
    inclusions: [
      'Setel posisi engsel presisi',
      'Kencangkan / ganti sekrup dol',
      'Pelumasan sendi engsel',
    ],
    exclusions: ['Ganti daun pintu utuh', 'Kunci pintu digital / smart lock'],
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    availableWorkersCount: 5,
  },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'worker-1',
    name: 'Agus Santoso',
    slug: 'agus-santoso',
    phone: '081234567890',
    bio: 'Tukang plumbing sejak 2018. Biasa menangani keran bocor, saluran mampet, dan kebocoran pipa kecil di rumah tinggal sekitar Jakarta Selatan. Datang dengan alat sendiri dan selalu rapi.',
    area: 'Tebet, Jaksel',
    city: 'Jakarta Selatan',
    experienceYears: 8,
    completedJobs: 42,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    portfolio: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    ],
    categorySlug: 'plumbing',
    categoryName: 'Plumbing',
    startingPrice: 150000,
    packages: [MOCK_PACKAGES[0], MOCK_PACKAGES[1], MOCK_PACKAGES[2], MOCK_PACKAGES[4]],
  },
  {
    id: 'worker-2',
    name: 'Dedi Kurniawan',
    slug: 'dedi-kurniawan',
    phone: '081298765432',
    bio: 'Ahli saluran pipa air bersih dan pembuangan dengan pengalaman lebih dari 6 tahun. Teliti dalam mendeteksi titik kebocoran pipa dalam dinding.',
    area: 'Cilandak, Jaksel',
    city: 'Jakarta Selatan',
    experienceYears: 6,
    completedJobs: 27,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    portfolio: [
      'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&auto=format&fit=crop&q=80',
    ],
    categorySlug: 'plumbing',
    categoryName: 'Plumbing',
    startingPrice: 150000,
    packages: [MOCK_PACKAGES[0], MOCK_PACKAGES[1]],
  },
  {
    id: 'worker-3',
    name: 'Rudi Hartono',
    slug: 'rudi-hartono',
    phone: '081311223344',
    bio: 'Spesialis cat interior & eksterior rumah tinggal. Berpengalaman mengecat rumah minimalis dengan hasil halus, bersih, dan bebas noda cat di lantai.',
    area: 'Kebayoran Baru, Jaksel',
    city: 'Jakarta Selatan',
    experienceYears: 7,
    completedJobs: 31,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    portfolio: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    ],
    categorySlug: 'pengecatan',
    categoryName: 'Pengecatan',
    startingPrice: 150000,
    packages: [MOCK_PACKAGES[3], MOCK_PACKAGES[0]],
  },
  {
    id: 'worker-4',
    name: 'Yuni Hidayati',
    slug: 'yuni-hidayati',
    phone: '081555667788',
    bio: 'Tukang kayu & perbaikan umum spesialis perabot rumah tangga, engsel pintu seret, kunci pintu, dan kitchen set gantung.',
    area: 'Tebet, Jaksel',
    city: 'Jakarta Selatan',
    experienceYears: 5,
    completedJobs: 19,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    portfolio: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    ],
    categorySlug: 'perbaikan-umum',
    categoryName: 'Perbaikan Umum',
    startingPrice: 100000,
    packages: [MOCK_PACKAGES[4]],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderCode: '7Q2K',
    customerId: 'user-hana',
    customerName: 'Hana Amelia',
    customerPhone: '+62 812-3456-7890',
    workerId: 'worker-1',
    workerName: 'Agus Santoso',
    workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    packageId: 'pkg-1',
    packageName: 'Ganti keran',
    packagePrice: 150000,
    serviceFee: 5000,
    total: 155000,
    address: 'Jl. Tebet Barat Dalam II No. 14, RT 05/RW 02, Tebet, Jakarta Selatan 12810. Pagar hitam.',
    scheduledDate: 'Sabtu, 17 Okt 2026',
    timeSlot: 'Pagi 08.00–11.00',
    description: 'Keran wastafel dapur bocor di pangkal. Airnya terus menetes walau sudah ditutup rapat.',
    status: 'awaiting_confirmation',
    dispatchStatus: 'assigned',
    allowReassign: true,
    problemPhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&auto=format&fit=crop&q=80',
    ],
    resultPhotos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80',
    ],
    createdAt: '2026-10-14T09:00:00Z',
    timestamps: {
      paidAt: 'Rab 09.04',
      workerConfirmedAt: 'Rab 09.20',
      onTheWayAt: 'Sab 07.40',
      inProgressAt: 'Sab 08.12',
      awaitingConfirmationAt: 'Sab 10.42',
    },
  },
  {
    id: 'order-2',
    orderCode: '3MZA',
    customerId: 'user-hana',
    customerName: 'Hana Amelia',
    customerPhone: '+62 812-3456-7890',
    workerId: 'worker-4',
    workerName: 'Yuni Hidayati',
    workerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    packageId: 'pkg-5',
    packageName: 'Perbaiki engsel / pintu',
    packagePrice: 100000,
    serviceFee: 5000,
    total: 105000,
    address: 'Jl. Tebet Barat Dalam II No. 14, RT 05/RW 02, Tebet, Jakarta Selatan 12810.',
    scheduledDate: 'Hari ini',
    timeSlot: '14.00–17.00',
    description: 'Pintu lemari dapur bawah anjlok dan berdecit saat dibuka.',
    status: 'on_the_way',
    dispatchStatus: 'assigned',
    allowReassign: true,
    problemPhotos: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    ],
    resultPhotos: [],
    createdAt: '2026-10-16T10:00:00Z',
    timestamps: {
      paidAt: '10.05',
      workerConfirmedAt: '10.15',
      onTheWayAt: '13.30',
    },
  },
  {
    id: 'order-3',
    orderCode: '9TFC',
    customerId: 'user-hana',
    customerName: 'Hana Amelia',
    customerPhone: '+62 812-3456-7890',
    workerId: 'worker-3',
    workerName: 'Rudi Hartono',
    workerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    packageId: 'pkg-4',
    packageName: 'Cat ulang dinding s.d. 10 m²',
    packagePrice: 350000,
    serviceFee: 5000,
    total: 355000,
    address: 'Jl. Tebet Barat Dalam II No. 14, RT 05/RW 02, Tebet, Jakarta Selatan 12810.',
    scheduledDate: 'Sel, 20 Okt 2026',
    timeSlot: '08.00–11.00',
    description: 'Cat dinding kamar tidur utama mengelupas karena rembesan AC lama.',
    status: 'pending_payment',
    dispatchStatus: 'idle',
    allowReassign: true,
    problemPhotos: [],
    resultPhotos: [],
    createdAt: '2026-10-16T14:00:00Z',
    timestamps: {},
  },
];

export const MOCK_USER: UserProfile = {
  id: 'user-hana',
  fullName: 'Hana Amelia',
  email: 'hana.amelia@email.com',
  phone: '+62 812-3456-7890',
  defaultAddress: 'Jl. Tebet Barat Dalam II No. 14, Tebet, Jakarta Selatan',
  isPlus: false,
  onboardingCompleted: true,
  role: 'customer',
};
