import React from 'react'
import { render } from './test-utils'
import { RenderResult } from '@testing-library/react'

interface Props {
  callback: () => void
}

export const TestHook: React.FC<Props> = ({ callback }) => {
  callback()
  return null
}

export const testHook = (callback: () => void): RenderResult =>
  render(<TestHook callback={callback} />)
