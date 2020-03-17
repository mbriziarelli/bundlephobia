import { NextApiRequest, NextApiResponse } from 'next'
import { isString } from '../../server/helpers/types'
import getSuggestions from '../../server/suggestionsService'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { q } = req.query
  const query = isString(q) ? q.toLowerCase().trim() : ''

  const suggestions =
    query.length > 0 ? await getSuggestions(query.toLowerCase().trim()) : []

  res.status(200).json(suggestions)
}
