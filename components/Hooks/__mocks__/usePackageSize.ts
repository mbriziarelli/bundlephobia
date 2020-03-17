const actualUsePackageSize = jest.requireActual('../usePackageSize.ts')

export const Status = Object.getOwnPropertyDescriptor(
  actualUsePackageSize,
  'Status'
)?.value

export default jest.fn()
