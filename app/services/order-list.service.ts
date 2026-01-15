import { getProductStock } from "@/app/services/product-stock.service";

export type OrderStatus =
  | "Completed"
  | "Processing"
  | "Rejected"
  | "On Hold"
  | "In Transit";

export type OrderItem = {
  id: string;
  name: string;
  address: string;
  date: string;
  type: string;
  status: OrderStatus;
};

/** id normalize: decode, trim, remove '#', remove path segments, pad numeric */
function normalizeOrderId(raw: string) {
  let t = String(raw ?? "");

  // URL encode edilmiş gelebilir
  try {
    t = decodeURIComponent(t);
  } catch {
    // ignore
  }

  t = t.trim();

  // "#00001" gibi
  if (t.startsWith("#")) t = t.slice(1);

  // "orders/00001" gibi yanlışlıkla path gelirse son segmenti al
  if (t.includes("/")) t = t.split("/").filter(Boolean).pop() ?? t;

  // sadece rakam ise 5 haneye tamamla
  if (/^\d+$/.test(t)) return t.padStart(5, "0");

  // "00001 " gibi her şeyden sonra tekrar trim
  return t.trim();
}

export async function getOrderList(): Promise<OrderItem[]> {
  const products = await getProductStock();
  const types = Array.from(new Set(products.map((p) => p.category)));

  const orders: OrderItem[] = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "689 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: types[0] ?? "Digital Product",
      status: "Completed",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      type: types[1] ?? "Fashion",
      status: "Processing",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      type: types[2] ?? "Mobile",
      status: "Rejected",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destinay Lake Suite 600",
      date: "05 Feb 2019",
      type: types[3] ?? "Accessory",
      status: "Completed",
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "29 Jul 2019",
      type: types[0] ?? "Digital Product",
      status: "Processing",
    },
    {
      id: "00006",
      name: "Alfred Murray",
      address: "543 Weinmann Mountain",
      date: "15 Aug 2019",
      type: types[1] ?? "Fashion",
      status: "Completed",
    },
    {
      id: "00007",
      name: "Maggie Sullivan",
      address: "New Scottieberg",
      date: "21 Dec 2019",
      type: types[2] ?? "Mobile",
      status: "Processing",
    },
    {
      id: "00008",
      name: "Rosio Todd",
      address: "New Jon",
      date: "30 Apr 2019",
      type: types[3] ?? "Accessory",
      status: "On Hold",
    },
    {
      id: "00009",
      name: "Dollie Hines",
      address: "124 La Force Suite 975",
      date: "09 Jan 2019",
      type: types[0] ?? "Digital Product",
      status: "In Transit",
    },
  ];

  return orders;
}

export async function getOrderById(id: string) {
  const list = await getOrderList();
  const normalized = normalizeOrderId(id);

  // normal eşleşme
  const direct = list.find((o) => o.id === normalized);
  if (direct) return direct;

  // bazen "0001" gibi gelirse diye ikinci şans: sadece rakamları alıp pad
  const digits = normalized.replace(/\D/g, "");
  if (digits) {
    const padded = digits.padStart(5, "0");
    return list.find((o) => o.id === padded) ?? null;
  }

  return null;
}

/* =========================
   ORDER DETAILS
========================= */

export type OrderLine = {
  productId: string;
  productName: string;
  productImageUrl: string;
  category: string;
  qty: number;
  unit: number;
  total: number;
};

export type OrderDetails = {
  orderNo: string;
  date: string;
  type: string;
  status: OrderStatus;

  customerName: string;
  customerEmail: string;
  customerPhone: string;

  shippingAddressLine: string;
  shippingCountry: string;

  trackingNo: string;
  carrier: string;

  lines: OrderLine[];

  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
};

export async function getOrderDetailsById(
  id: string
): Promise<OrderDetails | null> {
  const normalized = normalizeOrderId(id);

  const order = await getOrderById(normalized);
  if (!order) return null;

  const products = await getProductStock();

  // deterministic ürün seçimi (her order id için farklı kombinasyon)
  const n = Number(normalized) || 1;
  const pick = (i: number) => products[i % products.length];

  const p1 = pick(n);
  const p2 = pick(n + 2);

  const line1: OrderLine = {
    productId: p1.id,
    productName: p1.name,
    productImageUrl: p1.imageUrl,
    category: p1.category,
    qty: 1,
    unit: Number(p1.price.toFixed(2)),
    total: Number((p1.price * 1).toFixed(2)),
  };

  const line2: OrderLine = {
    productId: p2.id,
    productName: p2.name,
    productImageUrl: p2.imageUrl,
    category: p2.category,
    qty: 2,
    unit: Number(p2.price.toFixed(2)),
    total: Number((p2.price * 2).toFixed(2)),
  };

  const subtotal = Number((line1.total + line2.total).toFixed(2));
  const shipping = 25;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const grandTotal = Number((subtotal + shipping + tax).toFixed(2));

  return {
    orderNo: order.id,
    date: order.date,
    type: order.type,
    status: order.status,

    customerName: order.name,
    customerEmail: `${order.name.toLowerCase().replaceAll(" ", ".")}@mail.com`,
    customerPhone: "+90 500 100 200 300",

    shippingAddressLine: order.address,
    shippingCountry: "Turkey",

    trackingNo: `TRK-${order.id}-A`,
    carrier: "DashStack Express",

    lines: [line1, line2],

    subtotal,
    shipping,
    tax,
    grandTotal,
  };
}
