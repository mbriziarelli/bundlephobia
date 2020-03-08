const getBuiltPackageStats = require('package-build-stats');

exports.exposedMethod = "getStats"

exports.getStats = async (/** @type {string} */ packageName) => {
  return await getBuiltPackageStats(packageName, { client: 'npm' })
}
