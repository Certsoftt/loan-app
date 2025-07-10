// src/services/log.ts
export function logEvent(event: string, data?: any) {
  // In production, replace this with analytics (Firebase, Sentry, etc.)
  // For demo, just log to console
  // eslint-disable-next-line no-console
  console.log(`[LOG] ${event}`, data || '');
}
