import React, { ReactElement } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../components/theme'

const AllTheProviders: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options: RenderOptions = {}
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
