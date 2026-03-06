/**
 * Format a number with locale-aware thousand separators.
 * @example formatNumber(1234.56) // "1,234"
 * @example formatNumber(1234.56, 2) // "1,234.56"
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a number as currency.
 * @example formatCurrency(1234.56) // "$1,234.56"
 * @example formatCurrency(1000, 'EUR') // "€1,000.00"
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

/**
 * Format a decimal value as a percentage.
 * @example formatPercentage(0.15) // "15%"
 * @example formatPercentage(0.1234, 1) // "12.3%"
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${formatNumber(value * 100, decimals)}%`;
}

/**
 * Format a number in compact notation (K, M, B).
 * @example formatCompact(1234) // "1.2K"
 * @example formatCompact(1234567) // "1.2M"
 */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}
