// Copied from  https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

import React from 'react'

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return (): void => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}
