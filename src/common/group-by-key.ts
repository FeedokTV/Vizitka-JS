export function groupByKey<K, T>(
  keys: readonly K[],
  rows: readonly T[],
  getKey: (row: T) => K,
): T[][] {
  const groups = new Map<K, T[]>(keys.map((key) => [key, []]));
  for (const row of rows) {
    groups.get(getKey(row))?.push(row);
  }
  return keys.map((key) => groups.get(key) ?? []);
}
