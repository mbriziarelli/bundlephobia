import axios from "axios";
import toSortedSuggestions from "./toSortedSuggestions";

export const getSuggestions = async (query: string) => {
  try {
    const { data: suggestions } = await axios.get(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    );

    return toSortedSuggestions(Array.isArray(suggestions) ? suggestions : []);
  } catch {
    return [];
  }
};
