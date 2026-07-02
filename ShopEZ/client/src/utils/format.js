export function formatMoney(value) {
  return `Rs.${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}
