import { useEffect, useState } from 'react'
import axios from 'axios'
import useDebounce from './useDebounce'
import { Suggestion } from '../../server/suggestionsService/types'
import { isNonEmptyString } from '../../server/helpers/types'

const fetchSuggestions = (searchTerm: string): Promise<Suggestion[]> =>
  axios
    .get(`/api/suggestions?q=${searchTerm}`)
    .then(({ data }) => data)
    .catch(() => [])

export default (packageName: string, debounce = 200): Suggestion[] => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const debouncedPackageName = useDebounce(packageName, debounce)

  useEffect(() => {
    const trimmedPackageName = debouncedPackageName.trim()

    if (isNonEmptyString(trimmedPackageName)) {
      fetchSuggestions(trimmedPackageName).then(setSuggestions)
    } else if (suggestions.length > 0) {
      setSuggestions([])
    }
  }, [debouncedPackageName])

  return suggestions
}
