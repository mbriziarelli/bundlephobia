import { useEffect, useState } from 'react'
import axios, { CancelToken, CancelTokenSource } from 'axios'
import { Suggestion } from 'bundlephobia-suggestions-service'
import useDebounce from './useDebounce'
import { isNonEmptyString } from '../../server/helpers/types'

const fetchSuggestions = (
  searchTerm: string,
  cancelToken: CancelToken
): Promise<Suggestion[]> =>
  axios
    .get<Suggestion[]>(`/api/suggestions?q=${searchTerm}`, {
      cancelToken,
    })
    .then(({ data }) => data)
    .catch(() => [])

export default (packageName: string, debounce = 200): Suggestion[] => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const debouncedPackageName = useDebounce(packageName, debounce)

  useEffect(() => {
    const trimmedPackageName = debouncedPackageName.trim()
    let source: CancelTokenSource | null = null

    if (isNonEmptyString(trimmedPackageName)) {
      source = axios.CancelToken.source()

      fetchSuggestions(trimmedPackageName, source.token).then(result => {
        setSuggestions(result)
        source = null
      })
    } else if (suggestions.length > 0) {
      setSuggestions([])
    }

    return (): void => void source?.cancel()
  }, [debouncedPackageName])

  return suggestions
}
