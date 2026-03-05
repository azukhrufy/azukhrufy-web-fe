// react
import { TimezoneContext } from '@/contexts/TimezoneContext'
import { useContext } from 'react'

// --------------------------------------------------------

/**
 * Get DateTimeHelper instance based on client's timezone
 * @returns {import('~/contexts/TimezoneContext').TimezoneContextValue}
 */
export default function useDateTimeHelper() {
  const context = useContext(TimezoneContext)

  if (!context)
    throw new Error('useDateTimeHelper must be use inside TimezoneProvider')

  return context
}
