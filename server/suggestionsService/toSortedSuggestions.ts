import { NpmsSuggestion, Suggestion } from 'bundlephobia-suggestions-service'

const toSuggestion = (
  name: string,
  version: string,
  description?: string,
  highlight?: string
): Suggestion => ({
  name,
  version,
  ...(description ? { description } : null),
  ...(highlight ? { highlight } : null),
})

const toSuggestionOrNull = (s: NpmsSuggestion): Suggestion | null =>
  s.package?.name && s.package?.version
    ? toSuggestion(
        s.package.name,
        s.package.version,
        s.package.description,
        s.highlight
      )
    : null

const compareNpmsSuggestions = (
  s1: NpmsSuggestion,
  s2: NpmsSuggestion
): number => (s2.searchScore ?? 0) - (s1.searchScore ?? 0)

const isSuggestion = (s: Suggestion | null): s is Suggestion => s !== null

export default (ss: NpmsSuggestion[]): Suggestion[] =>
  ss
    .sort(compareNpmsSuggestions)
    .map(toSuggestionOrNull)
    .filter(isSuggestion)
