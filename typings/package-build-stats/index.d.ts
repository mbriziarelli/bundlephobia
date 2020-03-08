declare module "package-build-stats" {
  export interface BuildPackageStatsOptions {
    client: "npm" | "yarn",
    limitConcurrency?: boolean
    networkConcurrency?: number
    customImports?: string[]
  }

  function getBuiltPackageStats(packageName: string, options: BuildPackageStatsOptions): Promise<any>

  export = getBuiltPackageStats
}