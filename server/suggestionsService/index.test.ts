import * as Axios from 'axios'
import { Suggestion } from 'bundlephobia-suggestions-service'
import * as SuggestionsSorter from './toSortedSuggestions'
import getSuggestions from '.'

jest.mock('./toSortedSuggestions', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  }
})

afterAll(() => {
  jest.unmock('./toSortedSuggestions')
})

describe('suggestionsService module', () => {
  const spyOnGet = jest.spyOn(Axios.default, 'get')
  const spyOnToSortedSuggestions = jest.spyOn(SuggestionsSorter, 'default')

  beforeEach(() => {
    spyOnGet.mockClear()
    spyOnToSortedSuggestions.mockClear()
  })

  it('returns an array of sorted suggestions', async () => {
    const query = 'foo@1.0.0'
    const rawSuggestions = [{ raw: 'yes' }]
    const sortedSuggestions = ([{ sorted: 'yes' }] as unknown) as Suggestion[]
    spyOnGet.mockResolvedValueOnce({ data: rawSuggestions })
    spyOnToSortedSuggestions.mockReturnValueOnce(sortedSuggestions)

    const suggestions = await getSuggestions(query)

    expect(spyOnGet).toHaveBeenCalledTimes(1)
    expect(spyOnGet.mock.calls[0][0]).toContain(query)
    expect(spyOnToSortedSuggestions).toHaveBeenCalledTimes(1)
    expect(spyOnToSortedSuggestions.mock.calls[0][0]).toEqual(rawSuggestions)
    expect(suggestions).toEqual(sortedSuggestions)
  })

  it('returns an empty array if the call to the suggestions API does not return an Array', async () => {
    const query = 'foo@1.0.0'
    const rawSuggestions = {}
    spyOnGet.mockResolvedValueOnce({ data: rawSuggestions })

    const suggestions = await getSuggestions(query)

    expect(spyOnGet).toHaveBeenCalledTimes(1)
    expect(spyOnGet.mock.calls[0][0]).toContain(query)
    expect(suggestions).toEqual([])
  })

  it('returns an empty array if the call to the suggestions API failed', async () => {
    const query = 'foo@1.0.0'
    spyOnGet.mockRejectedValueOnce('rejected!')

    const suggestions = await getSuggestions(query)

    expect(spyOnGet).toHaveBeenCalledTimes(1)
    expect(spyOnGet.mock.calls[0][0]).toContain(query)
    expect(suggestions).toEqual([])
  })
})
