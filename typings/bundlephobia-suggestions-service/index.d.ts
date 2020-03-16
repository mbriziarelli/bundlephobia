declare module 'bundlephobia-suggestions-service' {
  /**
   * npms.io Suggestion format
   * @see https://npms.io/
   * @see https://api-docs.npms.io/
   */

  export type NpmsSuggestion = Partial<{
    package: Partial<{
      name: string
      scope: string
      version: string
      description: string
      date: string
      links: Partial<{
        npm: string
        homepage: string
        repository: string
        bugs: string
      }>
      publisher: Partial<{
        username: string
        email: string
      }>
      maintainers: [
        Partial<{
          username: string
          email: string
        }>
      ]
    }>
    score: Partial<{
      final: number
      detail: Partial<{
        quality: number
        popularity: number
        maintenance: number
      }>
    }>
    searchScore: number
    highlight: string
  }>

  // Current app Suggestion

  export interface Suggestion {
    name: string
    version: string
    description?: string
    highlight?: string
  }
}
