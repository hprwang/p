/**
 * Date helpers.
 *
 * Supabase returns `date` columns as `YYYY-MM-DD` strings. Parsing those with
 * `new Date('2024-01-15')` treats them as *UTC midnight*, which renders a day
 * early in timezones west of UTC. These helpers parse the string as a local
 * date (at noon to avoid DST/UTC drift) so the calendar date a user sees
 * matches the date they actually entered.
 */

/** Parse a `YYYY-MM-DD` string into a local Date at noon. Null when absent/invalid. */
export function parseLocalDate(
  value: string | null | undefined
): Date | null {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day, 12, 0, 0)
}

/** Format a `YYYY-MM-DD` string in the user's local timezone. Empty string when absent. */
export function formatDate(
  value: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  const date = parseLocalDate(value)
  return date ? date.toLocaleDateString('en-US', options) : ''
}

/**
 * Whole calendar days from today until a `YYYY-MM-DD` deadline. A deadline
 * today returns 0, tomorrow 1, yesterday -1 — no time-of-day edge cases.
 */
export function daysUntil(value: string | null | undefined): number {
  const deadline = parseLocalDate(value)
  if (!deadline) return 0
  const now = new Date()
  const msPerDay = 24 * 60 * 60 * 1000
  const deadlineDay = Date.UTC(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate()
  )
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((deadlineDay - today) / msPerDay)
}