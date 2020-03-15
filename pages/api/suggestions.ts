import { NextApiRequest, NextApiResponse } from 'next'
import { isNonEmptyString } from '../../server/helpers/types'
import getSuggestions from '../../server/suggestionsService'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { q: query } = req.query
  const suggestions = isNonEmptyString(query)
    ? await getSuggestions(query.toLowerCase().trim())
    : []

  res.status(200).json(suggestions)
}
