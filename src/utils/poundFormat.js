export function poundFormat(value) {
  if (value === null || value === undefined || value === '') return '';
  // Remove non-numeric except dot
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return '';
  // Format with commas, 2 decimals
  return num.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}