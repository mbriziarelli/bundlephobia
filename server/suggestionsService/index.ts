import axios from 'axios'
import toSortedSuggestions from './toSortedSuggestions'
import { Suggestion } from './types'

export default async (query: string): Promise<Suggestion[]> => {
  try {
    const { data: suggestions } = await axios.get(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    )

    return toSortedSuggestions(Array.isArray(suggestions) ? suggestions : [])
  } catch {
    return []
  }
}
