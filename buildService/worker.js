const getBuiltPackageStats = require('package-build-stats');

exports.getStats = async (/** @type {string} */ packageName) => {
  return await getBuiltPackageStats(packageName, { client: 'yarn' })
}
