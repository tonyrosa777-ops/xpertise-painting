import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("Stripe webhook secret not configured — skipping verification");
    return NextResponse.json({ received: true });
  }

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2026-03-25.dahlia",
  });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("Stripe webhook error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny = session as any;
    const shipping = sessionAny.collected_information?.shipping_details ?? sessionAny.shipping_details;
    if (!shipping?.address) {
      console.error("No shipping address in session:", session.id);
      return NextResponse.json({ received: true });
    }

    let cartItems: Array<{
      id: string | number;
      name: string;
      quantity: number;
      price: number;
      printful_variant_id?: number;
    }> = [];

    try {
      cartItems = JSON.parse(session.metadata?.cart ?? "[]");
    } catch {
      console.error("Failed to parse cart metadata for session:", session.id);
      return NextResponse.json({ received: true });
    }

    const printfulItems = cartItems
      .filter((item) => item.printful_variant_id)
      .map((item) => ({
        sync_variant_id: item.printful_variant_id!,
        quantity: item.quantity,
      }));

    if (printfulItems.length === 0) {
      console.warn("No Printful variant IDs in cart for session:", session.id);
      return NextResponse.json({ received: true });
    }

    const storeId = seededProducts.storeId as number;
    if (!storeId) {
      console.warn("Printful store not configured — manual fulfillment required for session:", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      const order = await createOrder(storeId, {
        recipient: {
          name: shipping.name ?? "Customer",
          address1: shipping.address.line1 ?? "",
          address2: shipping.address.line2 ?? undefined,
          city: shipping.address.city ?? "",
          state_code: shipping.address.state ?? "",
          country_code: shipping.address.country ?? "US",
          zip: shipping.address.postal_code ?? "",
          email: session.customer_details?.email ?? undefined,
        },
        items: printfulItems,
        retail_costs: {
          currency: "USD",
          subtotal: ((session.amount_subtotal ?? 0) / 100).toFixed(2),
          shipping: ((session.shipping_cost?.amount_total ?? 0) / 100).toFixed(2),
        },
      });
      console.log(`Printful order created: ${order.id} for Stripe session: ${session.id}`);
    } catch (err) {
      console.error("Failed to create Printful order:", err);
      // Don't return error to Stripe — payment succeeded, log for manual fulfillment
    }
  }

  return NextResponse.json({ received: true });
}
