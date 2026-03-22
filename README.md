# @philiprehberger/core-utils

[![CI](https://github.com/philiprehberger/ts-core-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-core-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/core-utils.svg)](https://www.npmjs.com/package/@philiprehberger/core-utils)
[![License](https://img.shields.io/github/license/philiprehberger/ts-core-utils)](LICENSE)

Pure utility functions for formatting, pagination, slugs, class merging, and more

## Installation

```bash
npm install @philiprehberger/core-utils
# Optional peer deps (only needed for cn()):
npm install clsx tailwind-merge
```

## Usage

```ts
import {
  formatCurrency,
  generateSlug,
  paginateArray,
  cn,
} from '@philiprehberger/core-utils';

// Format a currency value
const price = formatCurrency(29.99, 'USD'); // "$29.99"

// Generate a URL-friendly slug
const slug = generateSlug('Hello World!'); // "hello-world"

// Paginate an in-memory array
const result = paginateArray(items, 2, 10);
// { data: [...], pagination: { page: 2, limit: 10, total: 100, ... } }

// Merge Tailwind classes (requires clsx + tailwind-merge)
const classes = cn('px-2 py-1', 'px-4'); // "py-1 px-4"
```

## API

### Formatting

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatNumber` | `(value: number, decimals?: number) => string` | Locale-aware number formatting with thousand separators. |
| `formatCurrency` | `(value: number, currency?: string) => string` | Format as currency. Default: `'USD'`. |
| `formatPercentage` | `(value: number, decimals?: number) => string` | Convert decimal to percentage string (0.15 → "15%"). |
| `formatCompact` | `(value: number) => string` | Compact notation (1234 → "1.2K"). |

### Strings

| Function | Signature | Description |
|----------|-----------|-------------|
| `truncate` | `(text: string, length: number, suffix?: string) => string` | Truncate with suffix. Default suffix: `"..."`. |
| `generateSlug` | `(text: string) => string` | URL-friendly slug from text. |
| `generateUniqueSlug` | `(text: string, checkExists: (slug: string) => Promise<boolean>) => Promise<string>` | Slug with collision avoidance. |
| `generateSlugWithDate` | `(text: string, date?: Date) => string` | Date-prefixed slug (YYYY-MM-DD-slug). |
| `isValidSlug` | `(slug: string) => boolean` | Validate slug format. |
| `extractSlugFromPath` | `(path: string) => string` | Extract last path segment. |

### Pagination

| Function | Signature | Description |
|----------|-----------|-------------|
| `calculatePagination` | `(page?: number, limit?: number, maxLimit?: number) => { skip, take, page, limit }` | Sanitized pagination params. Default limit: 20, max: 100. |
| `buildPaginationMeta` | `(page: number, limit: number, total: number) => PaginationMeta` | Build metadata from query results. |
| `createPaginatedResult` | `<T>(data: T[], page: number, limit: number, total: number) => PaginationResult<T>` | Combine data with pagination meta. |
| `paginateArray` | `<T>(array: T[], page?: number, limit?: number) => PaginationResult<T>` | Paginate an in-memory array. |

### Class Merging

| Function | Signature | Description |
|----------|-----------|-------------|
| `cn` | `(...inputs: ClassValue[]) => string` | Merge Tailwind classes. Requires `clsx` and `tailwind-merge` peer deps. |

### Serialization

| Function | Signature | Description |
|----------|-----------|-------------|
| `serializeObject` | `<T>(obj: T) => T` | Recursively convert Dates to ISO strings. |
| `deserializeObject` | `<T>(obj: T) => T` | Recursively convert ISO strings back to Dates. |

### Async

| Function | Signature | Description |
|----------|-----------|-------------|
| `sleep` | `(ms: number) => Promise<void>` | Delay execution. |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
