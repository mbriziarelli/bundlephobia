import pacote, { Packument } from 'pacote'
import prerelease from 'semver/functions/prerelease'
import compare from 'semver/functions/compare'
import diff from 'semver/functions/diff'
import { isNonEmptyString } from '../helpers/types'

const isNotPrerelease = (version: string): boolean =>
  Array.isArray(prerelease(version)) === false

const getOrderedVersions = (packument: Packument): string[] =>
  Object.keys(packument.versions)
    .filter(isNotPrerelease)
    .sort(compare)
    .reverse()

const extractVersion = (packageName: string, packument: Packument): string => {
  const packageVersion = packageName.split('@')[1]

  return packageVersion === undefined || packageVersion === 'latest'
    ? packument['dist-tags'].latest
    : packageVersion
}

const getOrderedVersionsSlice = (
  orderedVersions: string[],
  fromVersion: string,
  count: number
): string[] => {
  const index = orderedVersions.indexOf(fromVersion)
  return index !== -1 ? orderedVersions.slice(index, index + count) : []
}

const getPreviousMajorVersion = (
  orderedVersions: string[],
  currentVersion: string
): string => {
  const orderedVersionsSlice = getOrderedVersionsSlice(
    orderedVersions,
    currentVersion,
    orderedVersions.length
  )

  const diffIsMajor = (version: string): boolean =>
    diff(currentVersion, version) === 'major'

  return orderedVersionsSlice.length
    ? orderedVersionsSlice.find(diffIsMajor) ?? ''
    : ''
}

export default async (packageName: string): Promise<string[]> => {
  try {
    const packument = await pacote.packument(packageName)
    const orderedVersions = getOrderedVersions(packument)
    const currentVersion = extractVersion(packageName, packument)

    const history = new Set(
      getOrderedVersionsSlice(orderedVersions, currentVersion, 3)
    ).add(getPreviousMajorVersion(orderedVersions, currentVersion))

    return Array.from(history).filter(isNonEmptyString)
  } catch (error) {
    return []
  }
}
