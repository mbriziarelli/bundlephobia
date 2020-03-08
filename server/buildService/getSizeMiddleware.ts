import url from "url"
import { Request, Response } from "express"
import { getStats } from "./getStats"
import { isValidPackageName, makeBadPackageNameError, isCustomError, makeErrorFromCustomError } from './errors'

export const getSizeMiddleware = async (req: Request, res: Response) => {
  const { query: { p: packageName } } = url.parse(req.url, true)

  try {
    if (isValidPackageName(packageName)) {
      res.json(await getStats(packageName));
    } else {
      res.status(400).json(makeBadPackageNameError(packageName))
    }
  } catch (error) {
    if (isCustomError(error)) {
      const { statusCode, message } = makeErrorFromCustomError(error)
      res.status(statusCode).json({ message })
    } else {
      res.status(500).json({ message: "Unknown Error"})
    }
  }
}
