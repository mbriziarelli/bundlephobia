import extractOrderedVersions from './extractOrderedVersions'

export default async (packageName: string): Promise<string[]> => {
  try {
    return extractOrderedVersions(packageName)
  } catch (error) {
    return []
  }
}
