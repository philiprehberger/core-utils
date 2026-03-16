# @philiprehberger/core-utils

[![CI](https://github.com/philiprehberger/core-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/core-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/core-utils.svg)](https://www.npmjs.com/package/@philiprehberger/core-utils)
[![License](https://img.shields.io/github/license/philiprehberger/core-utils)](LICENSE)

Pure utility functions for formatting, pagination, slugs, class merging, and more.

## Installation

```bash
npm install @philiprehberger/core-utils
# Optional peer deps (only needed for cn()):
npm install clsx tailwind-merge
```

## API

### Formatting

```ts
import { formatNumber, formatCurrency, formatPercentage, formatCompact } from '@philiprehberger/core-utils';

formatNumber(1234.56)        // "1,235"
formatNumber(1234.56, 2)     // "1,234.56"
formatCurrency(29.99)        // "$29.99"
formatCurrency(1000, 'EUR')  // "€1,000.00"
formatPercentage(0.15)       // "15%"
formatCompact(1234567)       // "1.2M"
```

### Class Merging (Tailwind)

```ts
import { cn } from '@philiprehberger/core-utils';

cn('px-2 py-1', 'px-4')                    // "py-1 px-4"
cn('text-red-500', isActive && 'text-blue') // conditional classes
```

### Slugs

```ts
import { generateSlug, generateUniqueSlug, isValidSlug } from '@philiprehberger/core-utils';

generateSlug("Hello World!")  // "hello-world"
isValidSlug("hello-world")   // true

const slug = await generateUniqueSlug("My Product", async (s) => {
  return await db.exists(s);
});
```

### Pagination

```ts
import { paginateArray, calculatePagination } from '@philiprehberger/core-utils';

const result = paginateArray(items, 2, 10);
// { data: [...], pagination: { page: 2, limit: 10, total: 100, totalPages: 10, ... } }

const { skip, take } = calculatePagination(2, 10);
// { skip: 10, take: 10, page: 2, limit: 10 }
```

### Serialization

```ts
import { serializeObject, deserializeObject } from '@philiprehberger/core-utils';

const serialized = serializeObject({ createdAt: new Date() });
// { createdAt: "2026-03-06T..." }
```

### Misc

```ts
import { truncate, sleep } from '@philiprehberger/core-utils';

truncate('Hello World', 5)  // "Hello..."
await sleep(1000)           // wait 1 second
```

## API Reference

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

## License

MIT
