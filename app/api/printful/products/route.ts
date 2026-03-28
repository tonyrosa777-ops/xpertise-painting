import { NextResponse } from "next/server";
import { getSyncProducts } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

export async function GET() {
  const storeId = seededProducts.storeId as number;

  if (!storeId || !process.env.PRINTFUL_API_KEY) {
    // No store configured yet — return seeded placeholder data
    return NextResponse.json(seededProducts.products);
  }

  try {
    const products = await getSyncProducts(storeId);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Printful products fetch error:", err);
    return NextResponse.json(seededProducts.products);
  }
}
