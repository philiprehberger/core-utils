import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with deduplication.
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution.
 * @example cn('px-2 py-1', 'px-4') // "py-1 px-4"
 * @example cn('text-red', condition && 'text-blue')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
