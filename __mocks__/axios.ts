const actualAxios = jest.requireActual('axios')

export default {
  ...actualAxios,
  get: jest.fn(),
}
