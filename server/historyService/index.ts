import extractOrderedVersions from './extractOrderedVersions'
import logger from '../logger'

export default async (packageName: string): Promise<string[]> => {
  try {
    return extractOrderedVersions(packageName)
  } catch (error) {
    logger.error(error)
    return []
  }
}
