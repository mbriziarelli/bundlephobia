import { NextApiRequest, NextApiResponse } from 'next'
import { isString } from '../../server/helpers/types'
import getHistory from '../../server/historyService'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { p } = req.query
  const packageName = isString(p) ? p.toLowerCase().trim() : ''

  const history =
    packageName.length > 0
      ? await getHistory(packageName.toLowerCase().trim())
      : {}

  res.status(200).json(history)
}
