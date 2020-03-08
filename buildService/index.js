const { default: Worker } = require('jest-worker')

const worker = new Worker(require.resolve('./worker'), {
  exposedMethods: ["getStats"]
})

module.exports = async (/** @type {string} */ moduleName) => {
  // @ts-ignore
  return await worker.getStats(moduleName)
}