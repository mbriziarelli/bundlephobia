declare module "package-build-stats" {
  interface Asset {
    name: string
    type: string
    size: number
    gzip: number
    parse: unknown
  }

  interface DependencySize {
    name: string
    approximateSize: number
  }

  export interface PackageStats {
    dependencyCount: number
    hasJSNext: boolean
    hasJSModule: boolean
    hasSideEffects: boolean
    peerDependencies: string[]
    ignoredMissingDependencies?: string[]
    assets: Asset[]
    dependencySizes: DependencySize[]
    size: number
    gzip: number
    parse: unknown
  }

  export interface BuildPackageStatsOptions {
    client: "npm" | "yarn"
    limitConcurrency?: boolean
    networkConcurrency?: number
    customImports?: string[]
  }

  export type CustomErrorName = "PackageNotFoundError" | "InstallError" | "EntryPointError" | "MissingDependencyError" | "CLIBuildError" | "BuildError"

  export class CustomError {
    name: CustomErrorName
    originalError: Error
    extra?: unknown 
  }

  export default function (packageName: string, options: BuildPackageStatsOptions): Promise<PackageStats>
}