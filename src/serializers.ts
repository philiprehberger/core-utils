/**
 * Recursively serialize an object for state management.
 * Converts Date objects to ISO strings. Handles nested objects and arrays.
 */
export function serializeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return obj.toISOString() as unknown as T;
  if (Array.isArray(obj)) return obj.map(serializeObject) as unknown as T;
  if (typeof obj === 'object') {
    const serialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeObject(value);
    }
    return serialized as T;
  }
  return obj;
}

/**
 * Recursively deserialize an object from state management.
 * Converts ISO date strings back to Date objects.
 */
export function deserializeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
      return new Date(obj) as unknown as T;
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(deserializeObject) as unknown as T;
  if (typeof obj === 'object') {
    const deserialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      deserialized[key] = deserializeObject(value);
    }
    return deserialized as T;
  }
  return obj;
}
