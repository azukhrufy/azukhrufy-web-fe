// utils
import { DateTime } from "luxon";

// ---------------------------------------------

const DEFAULT_FORMATTER_FALLBACK = "-";

// ---------------------------------------------

/**
 * @callback DateTimeNormalizer
 * @param {DateTime} dateTime
 * @param {Object} [options]
 * @param {boolean} [options.isApplyOffset]
 * Default to `false`. Calculate the resulting date time with timezone offset correction, or just mark the existing date and time with specified timezone
 *
 * For example, let's say you have a DateTime object of "01/01/2024 00:00:00", and have specified timezone "UTC+7" for the helper instance.
 * - `isApplyOffset = true`, the result will be "01/01/2024 **07:00:00** UTC+7"
 * - `isApplyOffset = false`, the result will be "01/01/2024 **00:00:00** UTC+7"
 * @return {DateTime}
 */

/**
 * @callback DateTimeCreator
 * @return {DateTime}
 */

/**
 * @callback DateTimeCreatorFromISO
 * @param {string} iso
 * @return {DateTime}
 */

/**
 * @callback DateTimeCreatorFromMillis
 * @param {number} millis
 * @return {DateTime}
 */

/**
 * @callback DateTimeCreatorFromJSDate
 * @param {Date} input
 * @param {Object} [options]
 * @param {boolean} [options.isApplyOffset]
 * Default to `false`.
 *
 * Calculate the resulting date time with timezone offset correction, or just mark the existing date and time with specified timezone
 *
 * For example, let's say you have a DateTime object of "01/01/2024 00:00:00", and have specified timezone "UTC+7" for the helper instance.
 * - `isApplyOffset = true`, the result will be "01/01/2024 **07:00:00** UTC+7"
 * - `isApplyOffset = false`, the result will be "01/01/2024 **00:00:00** UTC+7"
 * @return {DateTime}
 */

/**
 * @callback DateTimeValueToInput
 * @param {string} isoDate
 * @return {string}
 */

/**
 * @callback DateTimeInputToValue
 * @param {Date | string} input can be JS Date or ISO string
 * @returns {string | undefined}
 */

/**
 * @callback DateTimeInputToValueWithOffset
 * @param {Date | string} input can be JS Date or ISO string
 * @param {Object} [options]
 * @param {boolean} [options.isApplyOffset]
 * Default to `false`, ignored if input is not JS Date.
 *
 * Calculate the resulting date time with timezone offset correction, or just mark the existing date and time with specified timezone
 *
 * For example, let's say you have a DateTime object of "01/01/2024 00:00:00", and have specified timezone "UTC+7" for the helper instance.
 * - `isApplyOffset = true`, the result will be "01/01/2024 **07:00:00** UTC+7"
 * - `isApplyOffset = false`, the result will be "01/01/2024 **00:00:00** UTC+7"
 * @return {string | undefined}
 */

/**
 * @callback DateTimeValueFormatter
 * @param {string} isoDate
 * @param {string} [fallback] default to `DEFAULT_FORMATTER_FALLBACK`
 * @return {string}
 */

/**
 * Reusable DateTimeHelper instance, configured with specific timezone and locale.
 *
 * For usage, you can:
 * - `normalize`  : Normalize DateTime instance to use helper's configuration
 * - `now`        : Get new DateTime with current time and configured timezone/locale
 * - `fromXXX`    : Create DateTime from specific input
 * - `toXXXInput` : Convert ISO8601 string to input value for date/time input element
 * - `XXXToISO`   : Convert input value from date/time input element to ISO8601 string, possibly with timezone offset correction. Normally used to transform form values before sending data to API.
 * - `formatXXX`  : Format ISO8601 string to human-readable date/time string
 *
 * @typedef DateTimeHelper
 * @property {DateTimeNormalizer} normalize
 * @property {DateTimeCreator} now
 * @property {DateTimeCreatorFromISO} fromISO
 * @property {DateTimeCreatorFromMillis} fromMillis
 * @property {DateTimeCreatorFromJSDate} fromJSDate
 * @property {DateTimeValueToInput} toDateInput
 * @property {DateTimeValueToInput} toDateTimeInput
 * @property {DateTimeValueToInput} toTimeInput
 * @property {DateTimeInputToValue} dateStartAtToISO
 * @property {DateTimeInputToValue} dateEndAtToISO
 * @property {DateTimeInputToValueWithOffset} dateTimeInputToISO
 * @property {DateTimeInputToValue} dateInputToISO
 * @property {DateTimeInputToValue} timeInputToISO
 * @property {DateTimeValueFormatter} formatDate
 * @property {DateTimeValueFormatter} formatDateMedium
 * @property {DateTimeValueFormatter} formatDateShort
 * @property {DateTimeValueFormatter} formatDayMonth
 * @property {DateTimeValueFormatter} formatDateTime
 * @property {DateTimeValueFormatter} formatDateTimeMedium
 * @property {DateTimeValueFormatter} formatDateTimeShort
 * @property {DateTimeValueFormatter} formatTime
 */

// ---------------------------------------------

/**
 * @param {Date} date
 * @return {string}
 */
function __getDateOnly(date) {
  const yyyy = `${date.getFullYear()}`.padStart(4, "0");
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * @param {Date} date
 * @return {string}
 */
function __getTimeOnly(date) {
  const hh = `${date.getHours()}`.padStart(2, "0");
  const mm = `${date.getMinutes()}`.padStart(2, "0");

  return `${hh}:${mm}`;
}

// ---------------------------------------------

/**
 * @param {Object} config
 * @param {string} [config.zone]
 * @param {string} [config.locale]
 * @return {DateTimeHelper}
 */
function createDateTimeHelper(config) {
  /**
   * Normalize DateTime to use helper's configuration
   * @type {DateTimeNormalizer}
   */
  const normalize = (dateTime, isCorrectTZOnly = false) => {
    let result = dateTime;

    if (config.zone) {
      result = result.setZone(config.zone, {
        keepLocalTime: isCorrectTZOnly,
      });
    }

    if (config.locale) {
      result = result.setLocale(config.locale);
    }

    return result;
  };

  // ---------------------------------------------

  /**
   * @type {DateTimeCreator}
   */
  const now = () => {
    return normalize(DateTime.now());
  };

  /**
   * For precise result, make sure the input includes timezone information
   * @type {DateTimeCreatorFromISO}
   */
  const fromISO = (iso) => {
    return DateTime.fromISO(iso, config);
  };

  /**
   * @type {DateTimeCreatorFromMillis}
   */
  const fromMillis = (millis) => {
    return DateTime.fromMillis(millis, config);
  };

  /**
   * @type {DateTimeCreatorFromJSDate}
   */
  const fromJSDate = (jsDate, options) => {
    const { isApplyOffset = false } = options ?? {};

    // by default, when converting from JS Date
    // luxon will assume the input is in local timezone
    // and will convert it to timezone specified in the options
    if (isApplyOffset) {
      return DateTime.fromJSDate(jsDate, config);
    }

    // otherwise, we will use exact date and time from the input
    // and mark it with the specified timezone
    const { zone, ...rest } = config;
    let result = DateTime.fromJSDate(jsDate, rest);

    if (zone) {
      result = result.setZone(zone, {
        keepLocalTime: true,
      });
    }

    return result;
  };

  // ---------------------------------------------

  /**
   * Parse date from ISO8610 to value for `<input type='datetime-local'/>`
   * @type {DateTimeValueToInput}
   */
  const toDateTimeInput = (isoDate) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.startOf("second").toFormat("yyyy-MM-ddTHH:mm");
    } else {
      return "";
    }
  };

  /**
   * Parse date from ISO8610 to value for `<input type='date'/>`
   * @type {DateTimeValueToInput}
   */
  const toDateInput = (isoDate) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat("yyyy-MM-dd");
    } else {
      return "";
    }
  };

  /**
   * Parse date from ISO8610 to value for `<input type='time'/>`
   * @type {DateTimeValueToInput}
   */
  const toTimeInput = (isoDate) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat("HH:mm");
    } else {
      return "";
    }
  };

  // ---------------------------------------------

  /**
   * Normalize date input to start of day
   * @type {DateTimeInputToValue}
   */
  const dateStartAtToISO = (date) => {
    if (!date) return undefined;

    const isoDate = date instanceof Date ? __getDateOnly(date) : date;
    const parsed = DateTime.fromISO(isoDate, config);

    if (!parsed.isValid) {
      console.warn(`dateStartAtToISO: invalid date input - ${date}`);

      return undefined;
    }

    return parsed.startOf("day").toISO();
  };

  /**
   * Normalize date input to end of day
   * @type {DateTimeInputToValue}
   */
  const dateEndAtToISO = (date) => {
    if (!date) return undefined;

    const isoDate = date instanceof Date ? __getDateOnly(date) : date;
    const parsed = DateTime.fromISO(isoDate, config);

    if (!parsed.isValid) {
      console.warn(`dateEndAtToISO: invalid date input - ${date}`);

      return undefined;
    }

    return parsed.endOf("day").toISO();
  };

  /**
   * @type {DateTimeInputToValueWithOffset}
   */
  const dateTimeInputToISO = (input, options) => {
    const { isApplyOffset = false } = options ?? {};

    if (!input) return undefined;

    let parsed = null;

    if (input instanceof Date) {
      parsed = fromJSDate(input, { isApplyOffset });
    } else {
      const format = "yyyy-MM-dd'T'HH:mm";

      if (isApplyOffset) {
        const { zone, ...rest } = config;
        // create luxon DateTime object with the input, as in local timezone
        parsed = DateTime.fromFormat(input, format, rest);

        // then convert it to the specified timezone
        parsed = parsed.setZone(config.zone);
      } else {
        parsed = DateTime.fromFormat(input, format, config);
      }
    }

    if (parsed?.isValid !== true) {
      console.warn(`dateTimeInputToISO: invalid date input - ${input}`);

      return undefined;
    }

    return parsed.toISO();
  };

  /**
   * Convert date only input to complete ISO8601 string
   * @type {DateTimeInputToValue}
   */
  const dateInputToISO = (date) => {
    if (!date) return undefined;

    const isoDate = date instanceof Date ? __getDateOnly(date) : date;
    const parsed = DateTime.fromISO(isoDate, config);

    if (!parsed.isValid) {
      console.warn(`dateInputToISO: invalid date input - ${date}`);

      return undefined;
    }

    return parsed.toISO();
  };

  /**
   * Convert time only input to complete ISO8601 string
   * @type {DateTimeInputToValue}
   */
  const timeInputToISO = (time) => {
    if (!time) return undefined;

    const isoTime = time instanceof Date ? __getTimeOnly(time) : time;
    const parsed = DateTime.fromISO(isoTime, config);

    if (!parsed.isValid) {
      console.warn(`timeInputToISO: invalid time input - ${time}`);

      return undefined;
    }

    return parsed.toISO();
  };

  // ---------------------------------------------

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDate = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATE_FULL);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateLong = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat("cccc, dd LLLL");
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateMidLength = (
    isoDate,
    fallback = DEFAULT_FORMATTER_FALLBACK
  ) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat("cccc, dd LLL");
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateMedium = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATE_MED);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateShort = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATE_SHORT);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDayMonth = (
    isoDate,
    format,
    fallback = DEFAULT_FORMATTER_FALLBACK
  ) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat(format || "dd LLL");
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateTime = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATETIME_FULL);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateTimeMedium = (
    isoDate,
    fallback = DEFAULT_FORMATTER_FALLBACK
  ) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATETIME_MED);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatDateTimeShort = (
    isoDate,
    fallback = DEFAULT_FORMATTER_FALLBACK
  ) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.DATETIME_SHORT);
    } else {
      return fallback;
    }
  };

  /**
   * @type {DateTimeValueFormatter}
   */
  const formatTime = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toLocaleString(DateTime.TIME_SIMPLE);
    } else {
      return fallback;
    }
  };

  const formatTimeLong = (isoDate, fallback = DEFAULT_FORMATTER_FALLBACK) => {
    const parsed = DateTime.fromISO(isoDate, config);

    if (parsed.isValid) {
      return parsed.toFormat("HH:mm:ss");
    } else {
      return fallback;
    }
  };

  return {
    normalize,
    //
    now,
    fromISO,
    fromMillis,
    fromJSDate,
    //
    toDateInput,
    toDateTimeInput,
    toTimeInput,
    //
    dateStartAtToISO,
    dateEndAtToISO,
    dateTimeInputToISO,
    dateInputToISO,
    timeInputToISO,
    //
    formatDate,
    formatDateLong,
    formatDateMidLength,
    formatDateMedium,
    formatDateShort,
    formatDayMonth,
    formatDateTime,
    formatDateTimeMedium,
    formatDateTimeShort,
    formatTime,
    formatTimeLong,
  };
}

const platformDateTimeHelper = createDateTimeHelper({
  zone: "Asia/Jakarta",
  locale: "id-ID",
});

const defaultDateTimeHelper = createDateTimeHelper({
  locale: "id-ID",
});

export { createDateTimeHelper, platformDateTimeHelper, defaultDateTimeHelper };
