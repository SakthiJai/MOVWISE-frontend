import React, { Suspense } from "react";
import ViewQuoteClient from "./ViewQuoteClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-5">Loading...</p>}>
      <ViewQuoteClient />
    </Suspense>
  );
}
