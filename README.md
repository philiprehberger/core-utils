# @philiprehberger/core-utils

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

## License

MIT
