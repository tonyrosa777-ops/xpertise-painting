import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Snipcart price validation — return the authoritative price
  return NextResponse.json({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: null,
    shippable: false,
  });
}
