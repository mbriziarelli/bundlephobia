import React, { ReactElement } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResultsBox from './ResultsBox'

interface Props {
  packageName: string
}

const FetchingResults: React.FC<Props> = ({ packageName }): ReactElement => (
  <ResultsBox title={`Building ${packageName}`}>
    <CircularProgress />
  </ResultsBox>
)

export default FetchingResults
