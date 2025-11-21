"use client";
import Script from "next/script";
import { useState } from "react";

export default function Page() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const initLoqate = () => {
    if (window.ClickToAddress) {
      new window.ClickToAddress({
        accessToken: "YOUR-KEY-HERE",
        dom: "#addressInput",
        country: "GBR",
      });
    }
  };

  return (
    <div>
      {/* Load Loqate CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.addressy.com/css/captureplus-2.30.min.css"
      />

      {/* Load Loqate JS */}
      <Script
        src="https://cdn.addressy.com/js/captureplus-2.30.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
          initLoqate();
        }}
      />

      <div className="p-5">
        <input
          id="addressInput"
          type="text"
          placeholder="Start typing address…"
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
