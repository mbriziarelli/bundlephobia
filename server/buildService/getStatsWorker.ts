import getBuiltPackageStats from 'package-build-stats'

export const exposedMethod = "getStats"

export const getStats = async (packageName: string) => getBuiltPackageStats(packageName, { client: 'yarn' })

