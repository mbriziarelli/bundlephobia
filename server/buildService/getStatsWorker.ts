import getBuiltPackageStats, { PackageStats } from 'package-build-stats'

export const exposedMethod = 'getStats'

export const getStats = async (packageName: string): Promise<PackageStats> =>
  getBuiltPackageStats(packageName, { client: 'yarn' })
