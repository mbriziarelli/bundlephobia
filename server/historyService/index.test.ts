import getHistory from '.'

describe('historyService module', () => {
  describe('when the package exists', () => {
    it('returns the latest version, the two previous minors and the first previous major', async () => {
      const history = await getHistory('react')

      expect(Array.isArray(history)).toBe(true)
      expect(history).toHaveLength(4)
      expect(history).toEqual(['16.13.0', '16.12.0', '16.11.0', '15.6.2'])
    })
    it('returns the version specified in the package name, the two previous minors and the first previous major', async () => {
      const history = await getHistory('react@16.11.0')

      expect(Array.isArray(history)).toBe(true)
      expect(history).toHaveLength(4)
      expect(history).toEqual(['16.11.0', '16.10.2', '16.10.1', '15.6.2'])
    })
    it('returns the empty array, if the version does not exist', async () => {
      const history = await getHistory('redux@23.1.1')

      expect(Array.isArray(history)).toBe(true)
      expect(history).toHaveLength(0)
    })
    it('returns an array containing less than 4 elements if there is not enough versions prior to the given one', async () => {
      const history = await getHistory('redux@0.0.2')

      expect(Array.isArray(history)).toBe(true)
      expect(history).toHaveLength(2)
      expect(history).toEqual(['0.0.2', '0.0.1'])
    })
  })
  describe('when the package does not exist', () => {
    it('returns the empty array', async () => {
      const history = await getHistory('express')

      expect(Array.isArray(history)).toBe(true)
      expect(history).toHaveLength(0)
    })
  })
})
