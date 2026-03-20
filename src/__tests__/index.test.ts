import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');
const {
  formatNumber, formatCurrency, formatPercentage, formatCompact,
  truncate, generateSlug, generateUniqueSlug, generateSlugWithDate, isValidSlug, extractSlugFromPath,
  calculatePagination, buildPaginationMeta, paginateArray, createPaginatedResult,
  serializeObject, deserializeObject,
  sleep,
} = mod;

describe('formatNumber', () => {
  it('formats integer with no decimals', () => {
    assert.equal(formatNumber(1234), '1,234');
  });

  it('formats with decimals', () => {
    assert.equal(formatNumber(1234.56, 2), '1,234.56');
  });

  it('formats zero', () => {
    assert.equal(formatNumber(0), '0');
  });

  it('formats negative numbers', () => {
    assert.equal(formatNumber(-1234), '-1,234');
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    assert.equal(formatCurrency(29.99), '$29.99');
  });

  it('formats EUR', () => {
    const result = formatCurrency(1000, 'EUR');
    assert.ok(result.includes('1,000.00'));
  });
});

describe('formatPercentage', () => {
  it('formats decimal as percentage', () => {
    assert.equal(formatPercentage(0.15), '15%');
  });

  it('formats with decimals', () => {
    assert.equal(formatPercentage(0.1234, 1), '12.3%');
  });
});

describe('formatCompact', () => {
  it('formats thousands', () => {
    assert.equal(formatCompact(1234), '1.2K');
  });

  it('formats millions', () => {
    assert.equal(formatCompact(1234567), '1.2M');
  });
});

describe('truncate', () => {
  it('truncates long text', () => {
    assert.equal(truncate('Hello World', 5), 'Hello...');
  });

  it('returns unchanged text if under limit', () => {
    assert.equal(truncate('Hi', 10), 'Hi');
  });

  it('uses custom suffix', () => {
    assert.equal(truncate('Hello World', 5, '…'), 'Hello…');
  });
});

describe('generateSlug', () => {
  it('converts text to slug', () => {
    assert.equal(generateSlug('Hello World!'), 'hello-world');
  });

  it('handles special characters', () => {
    assert.equal(generateSlug('Product #123'), 'product-123');
  });

  it('handles leading/trailing dashes', () => {
    assert.equal(generateSlug('  Hello  '), 'hello');
  });

  it('handles empty string', () => {
    assert.equal(generateSlug(''), '');
  });
});

describe('generateUniqueSlug', () => {
  it('returns base slug when no collision', async () => {
    const slug = await generateUniqueSlug('Hello', async () => false);
    assert.equal(slug, 'hello');
  });

  it('appends counter on collision', async () => {
    let calls = 0;
    const slug = await generateUniqueSlug('Hello', async (s) => {
      calls++;
      return calls <= 1; // first call collides
    });
    assert.equal(slug, 'hello-1');
  });
});

describe('generateSlugWithDate', () => {
  it('prefixes slug with date', () => {
    const date = new Date(2026, 0, 15);
    assert.equal(generateSlugWithDate('Summer Sale', date), '2026-01-15-summer-sale');
  });
});

describe('isValidSlug', () => {
  it('validates correct slug', () => {
    assert.equal(isValidSlug('hello-world'), true);
  });

  it('rejects uppercase', () => {
    assert.equal(isValidSlug('Hello'), false);
  });

  it('rejects spaces', () => {
    assert.equal(isValidSlug('hello world'), false);
  });
});

describe('extractSlugFromPath', () => {
  it('extracts last segment', () => {
    assert.equal(extractSlugFromPath('/products/awesome-product/'), 'awesome-product');
  });

  it('handles path without trailing slash', () => {
    assert.equal(extractSlugFromPath('/a/b/c'), 'c');
  });
});

describe('calculatePagination', () => {
  it('returns correct skip and take', () => {
    const result = calculatePagination(2, 10);
    assert.equal(result.skip, 10);
    assert.equal(result.take, 10);
  });

  it('sanitizes page below 1', () => {
    const result = calculatePagination(0, 10);
    assert.equal(result.page, 1);
    assert.equal(result.skip, 0);
  });

  it('caps limit at maxLimit', () => {
    const result = calculatePagination(1, 200, 100);
    assert.equal(result.limit, 100);
  });
});

describe('buildPaginationMeta', () => {
  it('calculates total pages', () => {
    const meta = buildPaginationMeta(1, 10, 25);
    assert.equal(meta.totalPages, 3);
    assert.equal(meta.hasNextPage, true);
    assert.equal(meta.hasPreviousPage, false);
  });

  it('last page has no next', () => {
    const meta = buildPaginationMeta(3, 10, 25);
    assert.equal(meta.hasNextPage, false);
    assert.equal(meta.hasPreviousPage, true);
  });
});

describe('paginateArray', () => {
  it('paginates array correctly', () => {
    const items = Array.from({ length: 25 }, (_, i) => i);
    const result = paginateArray(items, 2, 10);
    assert.equal(result.data.length, 10);
    assert.equal(result.data[0], 10);
    assert.equal(result.pagination.total, 25);
  });

  it('handles empty array', () => {
    const result = paginateArray([], 1, 10);
    assert.equal(result.data.length, 0);
    assert.equal(result.pagination.total, 0);
  });
});

describe('serializeObject / deserializeObject', () => {
  it('serializes Date to ISO string', () => {
    const date = new Date('2026-01-01T00:00:00.000Z');
    const result = serializeObject({ createdAt: date });
    assert.equal(result.createdAt, '2026-01-01T00:00:00.000Z');
  });

  it('deserializes ISO string back to Date', () => {
    const result = deserializeObject({ createdAt: '2026-01-01T00:00:00.000Z' });
    assert.ok(result.createdAt instanceof Date);
  });

  it('handles nested objects', () => {
    const obj = { user: { createdAt: new Date('2026-01-01T00:00:00.000Z') } };
    const serialized = serializeObject(obj);
    assert.equal(serialized.user.createdAt, '2026-01-01T00:00:00.000Z');
  });

  it('handles null and undefined', () => {
    assert.equal(serializeObject(null), null);
    assert.equal(serializeObject(undefined), undefined);
  });

  it('handles arrays', () => {
    const arr = [new Date('2026-01-01T00:00:00.000Z')];
    const result = serializeObject(arr);
    assert.equal(result[0], '2026-01-01T00:00:00.000Z');
  });
});

describe('sleep', () => {
  it('resolves after delay', async () => {
    const start = Date.now();
    await sleep(50);
    assert.ok(Date.now() - start >= 40); // small tolerance
  });
});
