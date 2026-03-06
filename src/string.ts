/**
 * Truncate text to a maximum length with a suffix.
 * @example truncate('Hello World', 5) // "Hello..."
 */
export function truncate(text: string, length: number, suffix: string = '...'): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + suffix;
}

/**
 * Generate a URL-friendly slug from a string.
 * @example generateSlug("Hello World!") // "hello-world"
 * @example generateSlug("Product #123") // "product-123"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate a unique slug by appending a counter if the slug already exists.
 * @param text - Text to generate slug from
 * @param checkExists - Async function that returns true if slug is taken
 */
export async function generateUniqueSlug(
  text: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = generateSlug(text);
  let counter = 1;

  while (await checkExists(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
    if (counter > 1000) {
      throw new Error('Could not generate unique slug after 1000 attempts');
    }
  }

  return slug;
}

/**
 * Generate a slug with a date prefix (YYYY-MM-DD-slug-text).
 * @example generateSlugWithDate("Summer Sale") // "2026-03-06-summer-sale"
 */
export function generateSlugWithDate(text: string, date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}-${generateSlug(text)}`;
}

/**
 * Validate if a string is a valid URL slug.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Extract the last segment from a URL path.
 * @example extractSlugFromPath("/products/awesome-product/") // "awesome-product"
 */
export function extractSlugFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}
