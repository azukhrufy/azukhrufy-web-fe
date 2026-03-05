// react
import { createContext, useMemo } from "react";
// hooks
// import useAuth from '@/hooks/useAuth'
// utils
import { Duration } from "luxon";
import {
  createDateTimeHelper,
  defaultDateTimeHelper,
  platformDateTimeHelper,
} from "@/utils/dateTimeHelper";

// --------------------------------------------------------

const initialState = {
  platform: platformDateTimeHelper,
  user: defaultDateTimeHelper,
  client: defaultDateTimeHelper,
  // just in case u like to use spread operator when consuming this context
  // i.e. const { platformDateTimeHelper } = useContext(TimezoneContext)
  platformDateTimeHelper,
  userDateTimeHelper: defaultDateTimeHelper,
  clientDateTimeHelper: defaultDateTimeHelper,
};

/**
 * @typedef TimezoneContextValue
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} platform
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} user
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} client
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} platformDateTimeHelper
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} userDateTimeHelper
 * @property {import('~/utils/dateTimeHelper').DateTimeHelper} clientDateTimeHelper
 */

/**
 * @type {React.Context<TimezoneContextValue>}
 */
const TimezoneContext = createContext(initialState);

// --------------------------------------------------------

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
function TimezoneProvider({ children }) {
  const organization = {};

  // recalculating client timezone helper when organization changes
  const clientDateTimeHelper = useMemo(() => {
    if (organization?.timezoneOffset) {
      // TODO: to be refactored, need to handle timezone offset from backend properly
      // currently offset is relative to local tz,
      // so UTC+7 become -420, a bit wtf, but that's how it is for now
      const zoneStr = `${organization.timezoneOffset}`;
      const zoneAbs = Math.abs(zoneStr);

      // resulting zone
      const zonePrefix = zoneStr[0] === "-" ? "UTC+" : "UTC-";
      const zoneTimeValue = Duration.fromObject({ minutes: zoneAbs }).toFormat(
        "hh:mm"
      );
      const zone = `${zonePrefix}${zoneTimeValue}`;

      return createDateTimeHelper(
        {
          zone,
          locale: "id-ID",
        },
        (dateTime) => dateTime.setZone(zone).setLocale("id-ID")
      );
    } else {
      return defaultDateTimeHelper;
    }
  }, [organization]);

  return (
    <TimezoneContext.Provider
      value={{
        ...initialState,
        client: clientDateTimeHelper,
        clientDateTimeHelper,
      }}
    >
      {children}
    </TimezoneContext.Provider>
  );
}

export { TimezoneProvider, TimezoneContext };
