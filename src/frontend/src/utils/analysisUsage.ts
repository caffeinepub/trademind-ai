const KEY = "trademind_usage";

interface UsageRecord {
  date: string;
  count: number;
}

export const FREE_LIMIT = 5;

export function getTodayUsage(): number {
  const today = new Date().toDateString();
  const raw = localStorage.getItem(KEY);
  if (!raw) return 0;
  const rec: UsageRecord = JSON.parse(raw);
  if (rec.date !== today) return 0;
  return rec.count;
}

export function incrementUsage(): number {
  const today = new Date().toDateString();
  const current = getTodayUsage();
  const newCount = current + 1;
  localStorage.setItem(KEY, JSON.stringify({ date: today, count: newCount }));
  return newCount;
}

export function hasReachedLimit(isPremium: boolean): boolean {
  if (isPremium) return false;
  return getTodayUsage() >= FREE_LIMIT;
}

export function getRemainingCount(isPremium: boolean): number {
  if (isPremium) return Number.POSITIVE_INFINITY;
  return Math.max(0, FREE_LIMIT - getTodayUsage());
}
