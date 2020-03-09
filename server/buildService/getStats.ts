import Worker from 'jest-worker'
import { PackageStats } from 'package-build-stats'
import { exposedMethod } from './getStatsWorker'

const exposedMethods = [exposedMethod]

const computeWorkerKey = (
  method: string,
  ...args: unknown[]
): string | null => {
  if (method === exposedMethod) {
    if (args.length > 0 && typeof args[0] === 'string') {
      return args[0]
    }
  }
  return null
}

const worker = new Worker(require.resolve('./getStatsWorker'), {
  exposedMethods,
  computeWorkerKey,
})

export const getStats = async (moduleName: string): Promise<PackageStats> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore - TS doesn't know that the worker instance is exposing getStats function
  return await worker[exposedMethod](moduleName)
}
