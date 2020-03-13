import reactPackument from '../__data__/react-packument.json'
import reduxPackument from '../__data__/redux-packument.json'

const pacote = jest.genMockFromModule('pacote')

Object.defineProperty(pacote, 'packument', {
  value: jest.fn().mockImplementation((packageName: string) => {
    switch (packageName.split('@')[0]) {
      case 'react':
        return Promise.resolve(reactPackument)
      case 'redux':
        return Promise.resolve(reduxPackument)
      default:
        return Promise.reject(new Error('HTTP 404'))
    }
  }),
})

export default pacote
