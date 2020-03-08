const url = require("url");
const getStats = require("./getStats")
const { isValidPackageName, makeBadPackageNameError, isCustomError, makeErrorFromCustomError } = require('./errors')

/** @typedef {import("express").Request} Request */
/** @typedef {import("express").Response} Response */
/** @typedef {import("express").NextFunction} NextFunction */

/** @type { (req: Request, res: Response, next: NextFunction) => Promise<void> } */
module.exports = async (req, res, next) => {
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
