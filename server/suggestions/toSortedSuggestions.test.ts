import toSortedSuggestions from "./toSortedSuggestions";
import { NpmsSuggestion } from "./types";

describe("toSortedSuggestions function", () => {
  it("removes npms suggestions without name", () => {
    const npmsSuggestions: NpmsSuggestion[] = [
      {
        package: {
          version: "1.0.0"
        }
      }
    ];

    const suggestions = toSortedSuggestions(npmsSuggestions);

    expect(suggestions).toHaveLength(0);
  });
  it("removes npms suggestions without version", () => {
    const npmsSuggestions: NpmsSuggestion[] = [
      {
        package: {
          name: "foo"
        }
      }
    ];

    const suggestions = toSortedSuggestions(npmsSuggestions);

    expect(suggestions).toHaveLength(0);
  });
  it("adds description field if it is provided in npms suggestion", () => {
    const description = "description";
    const npmsSuggestions: NpmsSuggestion[] = [
      {
        package: {
          name: "foo",
          version: "1.0.0",
          description
        }
      }
    ];

    const suggestions = toSortedSuggestions(npmsSuggestions);

    expect(suggestions[0].description).toBe(description);
  });
  it("adds highlight field if it is provided in npms suggestion", () => {
    const highlight = "highlight";
    const npmsSuggestions: NpmsSuggestion[] = [
      {
        package: {
          name: "foo",
          version: "1.0.0"
        },
        highlight
      }
    ];

    const suggestions = toSortedSuggestions(npmsSuggestions);

    expect(suggestions[0].highlight).toBe(highlight);
  });
  it("sorts suggestions using the searchScore property", () => {
    const foo1 = "foo1";
    const foo2 = "foo2";
    const foo3 = "foo3";
    const version = "1.0.0";
    const npmsSuggestions: NpmsSuggestion[] = [
      {
        package: {
          name: foo1,
          version
        }
      },
      {
        package: {
          name: foo2,
          version
        },
        searchScore: 1
      },
      {
        package: {
          name: foo3,
          version: version
        },
        searchScore: 2
      }
    ];

    const suggestions = toSortedSuggestions(npmsSuggestions);

    expect(suggestions).toEqual([
      {
        name: foo3,
        version
      },
      {
        name: foo2,
        version
      },
      {
        name: foo1,
        version
      }
    ]);
  });
});
