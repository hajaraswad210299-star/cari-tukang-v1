import { MOCK_ORDERS, Order, MOCK_USER, UserProfile } from '@/lib/mock/data';

// Persistent in-memory / local storage helper for interactive orders
let currentOrders = [...MOCK_ORDERS];
let currentUser = { ...MOCK_USER };

export async function getOrders(statusFilter?: 'active' | 'history'): Promise<Order[]> {
  if (statusFilter === 'active') {
    return currentOrders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled');
  }
  if (statusFilter === 'history') {
    return currentOrders.filter((o) => o.status === 'completed' || o.status === 'cancelled');
  }
  return currentOrders;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return currentOrders.find((o) => o.id === id || o.orderCode === id);
}

export async function createOrder(data: {
  packageId: string;
  workerId?: string;
  address: string;
  scheduledDate: string;
  timeSlot: string;
  description: string;
  allowReassign: boolean;
  problemPhotos: string[];
}): Promise<Order> {
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  const id = `order-${Date.now()}`;
  
  const newOrder: Order = {
    id,
    orderCode: code,
    customerId: currentUser.id,
    customerName: currentUser.fullName,
    customerPhone: currentUser.phone,
    workerId: data.workerId || 'worker-1',
    workerName: 'Agus Santoso',
    workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    packageId: data.packageId,
    packageName: 'Ganti keran',
    packagePrice: 150000,
    serviceFee: currentUser.isPlus ? 0 : 5000,
    total: currentUser.isPlus ? 150000 : 155000,
    address: data.address,
    scheduledDate: data.scheduledDate,
    timeSlot: data.timeSlot,
    description: data.description,
    status: 'pending_payment',
    dispatchStatus: 'idle',
    allowReassign: data.allowReassign,
    problemPhotos: data.problemPhotos,
    resultPhotos: [],
    createdAt: new Date().toISOString(),
    timestamps: {},
  };

  currentOrders.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: Order['status'],
  timestampNote?: string
): Promise<Order | undefined> {
  const order = currentOrders.find((o) => o.id === orderId || o.orderCode === orderId);
  if (!order) return undefined;

  order.status = newStatus;
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  
  if (newStatus === 'paid') {
    order.timestamps.paidAt = now;
    order.dispatchStatus = 'searching';
  } else if (newStatus === 'worker_confirmed') {
    order.timestamps.workerConfirmedAt = now;
    order.dispatchStatus = 'assigned';
  } else if (newStatus === 'on_the_way') {
    order.timestamps.onTheWayAt = now;
  } else if (newStatus === 'in_progress') {
    order.timestamps.inProgressAt = now;
  } else if (newStatus === 'awaiting_confirmation') {
    order.timestamps.awaitingConfirmationAt = now;
  } else if (newStatus === 'completed') {
    order.timestamps.completedAt = now;
  }

  return order;
}

export async function getUserProfile(): Promise<UserProfile> {
  return currentUser;
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  currentUser = { ...currentUser, ...data };
  return currentUser;
}
