import Worker from 'jest-worker'
import { PackageStats } from 'package-build-stats'
import { isString } from '../helpers/types'
import { exposedMethod } from './getStatsWorker'

let _worker: Worker | null = null

const exposedMethods = [exposedMethod]

const computeWorkerKey = (method: string, ...args: unknown[]): string | null =>
  method === exposedMethod && isString(args[0]) ? args[0] : null

const getWorker = (): Worker => {
  if (_worker === null)
    _worker = new Worker(require.resolve('./getStatsWorker'), {
      exposedMethods,
      computeWorkerKey,
    })

  return _worker
}

export const getStats = async (moduleName: string): Promise<PackageStats> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore - TS doesn't know that the worker instance is exposing getStats function
  return await getWorker()[exposedMethod](moduleName)
}
