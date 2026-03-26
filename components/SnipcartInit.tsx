"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function SnipcartInit() {
  useEffect(() => {
    // Create the Snipcart config div via direct DOM manipulation so React
    // never tracks it. Snipcart injects its cart UI adjacent to this div —
    // if React owns this element, those injections corrupt React's DOM model
    // and cause insertBefore/removeChild crashes during page navigation.
    if (!document.getElementById("snipcart")) {
      const div = document.createElement("div");
      div.id = "snipcart";
      div.setAttribute("data-config-modal-style", "side");
      div.setAttribute(
        "data-api-key",
        process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? "YOUR_SNIPCART_PUBLIC_KEY"
      );
      div.hidden = true;
      document.body.appendChild(div);
    }
  }, []);

  return (
    <Script
      src="https://cdn.snipcart.com/themes/v3.7.3/default/snipcart.js"
      strategy="lazyOnload"
    />
  );
}
