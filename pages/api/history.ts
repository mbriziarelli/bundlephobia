import { NextApiRequest, NextApiResponse } from 'next'
import { isNonEmptyString } from '../../server/helpers/types'
import getHistory from '../../server/historyService'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { p: packageName } = req.query
  const history = isNonEmptyString(packageName)
    ? await getHistory(packageName)
    : {}

  res.status(200).json(history)
}
