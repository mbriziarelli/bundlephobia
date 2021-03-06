import axios from 'axios'
import { Suggestion } from 'bundlephobia-suggestions-service'
import toSortedSuggestions from './toSortedSuggestions'
import logger from '../logger'

export default async (query: string): Promise<Suggestion[]> => {
  try {
    const { data: suggestions } = await axios.get(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    )

    return Array.isArray(suggestions) ? toSortedSuggestions(suggestions) : []
  } catch (error) {
    logger.error(error)
    return []
  }
}
