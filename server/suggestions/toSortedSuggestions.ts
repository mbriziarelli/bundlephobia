import { NpmsSuggestion, Suggestion } from "./types";

const toSuggestion = (s: NpmsSuggestion): Suggestion | null => {
  if (s.package?.name && s.package?.version) {
    const suggestion: Suggestion = {
      name: s.package.name,
      version: s.package.version
    };

    if (s.package?.description) suggestion.description = s.package.description;
    if (s.highlight) suggestion.highlight = s.highlight;

    return suggestion;
  }

  return null;
};

const compareNpmsSuggestions = (s1: NpmsSuggestion, s2: NpmsSuggestion) => {
  const score1 = s1.searchScore ?? 0;
  const score2 = s2.searchScore ?? 0;

  return score2 - score1;
};

const sortNpmsSuggestions = (ss: NpmsSuggestion[]) =>
  ss.sort(compareNpmsSuggestions);

const isSuggestion = (s: Suggestion | null): s is Suggestion => s !== null;

export default (ss: NpmsSuggestion[]) =>
  sortNpmsSuggestions(ss)
    .map(toSuggestion)
    .filter(isSuggestion);
