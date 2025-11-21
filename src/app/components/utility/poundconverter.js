export function formatGBP(amount) {
  if (typeof amount !== "number") {
    // Try to convert or handle invalid input gracefully
    amount = Number(amount);
    if (isNaN(amount)) return "£0.00";
  }
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
