// lib/dateUtils.ts
export function toIsoUtcOrNull(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  // Gelecek tarihleri engelle (opsiyonel ama mantıklı)
  const now = new Date();
  if (d.getTime() > now.getTime()) return undefined;
  return d.toISOString(); // UTC, Z ile biter
}

// published sabitleme için yardımcı (fallback gerekirse)
export function freezePublished(published?: string, fallback?: string): string | undefined {
  return toIsoUtcOrNull(published) ?? toIsoUtcOrNull(fallback);
}
