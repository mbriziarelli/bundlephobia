const { default: Worker } = require('jest-worker')

const worker = new Worker(require.resolve('./worker'), {
  exposedMethods: ["getStats"]
})

module.exports = async (/** @type {string} */ moduleName) => {
  // @ts-ignore - TS doesn't know that the worker instance is exposing this function 
  return await worker.getStats(moduleName)
}