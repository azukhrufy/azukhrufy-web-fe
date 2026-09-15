// utils
import { DateTime } from "luxon";

// ---------------------------------------------

const DEFAULT_FALLBACK = "-";

// ---------------------------------------------

/**
 * Parse ISO8601 date-time string into its year
 *
 * Note: `setZone: true` keeps the year as written on the input string,
 * so it stays consistent between server and client (no timezone shifting).
 *
 * @param {string} [isoDate] ISO8601 date-time string
 * @return {number | null} `null` when the input is empty or invalid
 */
function parseYear(isoDate) {
  if (!isoDate) return null;

  const parsed = DateTime.fromISO(isoDate, { setZone: true });

  return parsed.isValid ? parsed.year : null;
}

/**
 * Format year (or year range) from ISO8601 date-time strings.
 *
 * - Same year      -> `"2026"`
 * - Different year -> `"2025-2026"`
 *
 * @param {string} startDate ISO8601 date-time string
 * @param {string} [endDate] ISO8601 date-time string.
 * When empty or invalid, only `startDate`'s year is returned (e.g. ongoing period)
 * @param {string} [fallback] Default to `DEFAULT_FALLBACK`, used when `startDate` is empty or invalid
 * @return {string}
 */
export function formatYear(startDate, endDate, fallback = DEFAULT_FALLBACK) {
  const startYear = parseYear(startDate);

  if (startYear === null) return fallback;

  const endYear = parseYear(endDate);

  if (endYear === null || endYear === startYear) return String(startYear);

  return `${startYear}-${endYear}`;
}

export default formatYear;

