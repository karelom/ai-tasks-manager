import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import postgres from 'postgres';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLocaleDate(date: Date) {
  const result = new Date(date);
  const locale = 'tw-zh';
  return result.toLocaleDateString(locale);
}

export function normalizeText(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

/**
 * Turns an object into a safe SQL WHERE clause fragment.
 * Example: { id: 1, status: 'active' } -> "id" = $1 AND "status" = $2
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildWhereConditions(sql: postgres.Sql, payload: Record<string, any>) {
  const entries = Object.entries(payload).filter(([_, v]) => v !== undefined);
  if (entries.length === 0) return sql`TRUE`;

  return entries
    .map(([key, value]) => sql`${sql(key)} = ${value}`)
    .reduce((acc, curr) => sql`${acc} AND ${curr}`);
}
