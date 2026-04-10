import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLocaleDate(date: Date) {
  const result = new Date(date);
  const locale = 'tw-zh';
  return result.toLocaleDateString(locale);
}
