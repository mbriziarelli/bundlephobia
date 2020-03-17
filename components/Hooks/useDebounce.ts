// Copied from  https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

import { useEffect, useState } from 'react'

export default <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return (): void => void clearTimeout(handler)
  }, [value])

  return debouncedValue
}
