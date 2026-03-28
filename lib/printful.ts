const PRINTFUL_API_BASE = "https://api.printful.com";

function getHeaders(storeId?: number) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
  if (storeId) {
    headers["X-PF-Store-Id"] = String(storeId);
  }
  return headers;
}

async function pfetch<T>(path: string, options?: RequestInit & { storeId?: number }): Promise<T> {
  const { storeId, ...fetchOptions } = options ?? {};
  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...fetchOptions,
    headers: {
      ...getHeaders(storeId),
      ...(fetchOptions.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful API ${res.status} on ${path}: ${text}`);
  }

  const json = await res.json();
  return json.result ?? json;
}

export interface SyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface SyncVariantDetail {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    thumbnail_url: string;
    preview_url: string;
  }>;
  options: unknown[];
  sku: string | null;
  availability_status: string;
}

export interface SyncProductDetail {
  sync_product: SyncProduct;
  sync_variants: SyncVariantDetail[];
}

export interface OrderRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email?: string;
  phone?: string;
}

export interface OrderItem {
  sync_variant_id: number;
  quantity: number;
}

export interface OrderData {
  recipient: OrderRecipient;
  items: OrderItem[];
  retail_costs?: {
    currency: string;
    subtotal: string;
    shipping?: string;
  };
}

export interface Order {
  id: number;
  external_id: string;
  store: number;
  status: string;
}

export async function getSyncProducts(storeId: number): Promise<SyncProduct[]> {
  const allProducts: SyncProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const page = await pfetch<{ result: SyncProduct[] }>(
      `/store/products?limit=${limit}&offset=${offset}`,
      { storeId }
    );
    const results = (page as unknown as { result: SyncProduct[] }).result ?? (page as unknown as SyncProduct[]);
    if (!results || results.length === 0) break;
    allProducts.push(...results);
    if (results.length < limit) break;
    offset += limit;
  }

  return allProducts;
}

export async function createOrder(storeId: number, orderData: OrderData): Promise<Order> {
  return pfetch<Order>("/orders", {
    method: "POST",
    storeId,
    body: JSON.stringify(orderData),
  });
}
