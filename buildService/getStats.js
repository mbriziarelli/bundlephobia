const { default: Worker } = require('jest-worker')
const { exposedMethod } = require('./getStatsWorker')

const exposedMethods = [exposedMethod]

const numWorkers = 4

/** @type { (method: string, ...args: unknown[]) => string | null } */
const computeWorkerKey = (method, ...args) => {
  if (method === exposedMethod) {
    if (args.length > 0 && typeof args[0] === 'string') {
      return args[0]
    }
  }
  return null
}

const worker = new Worker(require.resolve('./getStatsWorker'), {
  exposedMethods,
  numWorkers,
  computeWorkerKey
})

/** @typedef {import("package-build-stats").PackageStats} PackageStats */
/** @type { (moduleName: string) => Promise<PackageStats>} */
module.exports = async moduleName => {
  // @ts-ignore - TS doesn't know that the worker instance is exposing getStats function 
  return await worker[exposedMethod](moduleName)
}