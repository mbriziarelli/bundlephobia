const mockedRouter = jest.genMockFromModule('next/router')

export const useRouter = jest.fn()

export default mockedRouter
