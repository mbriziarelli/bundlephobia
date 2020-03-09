import url from 'url'
import { Request, Response } from 'express'
import { getStats } from './getStats'
import { isNonEmptyString } from '../helpers/types'
import {
  isCustomError,
  makeBadPackageNameError,
  makeErrorFromCustomError,
  genericServerError,
} from '../errors'

export const getSizeMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    query: { p: packageName },
  } = url.parse(req.url, true)

  try {
    if (isNonEmptyString(packageName)) {
      const stats = await getStats(packageName)
      res.status(200).json(stats)
    } else {
      const { statusCode, code, message } = makeBadPackageNameError(packageName)
      res.status(statusCode).json({ code, message })
    }
  } catch (error) {
    const { statusCode, code, message } = isCustomError(error)
      ? makeErrorFromCustomError(error)
      : genericServerError

    res.status(statusCode).json({ code, message })
  }
}
