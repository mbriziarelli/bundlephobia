import React, { ReactElement } from 'react'
import usePackageName from '../Hooks/usePackageName'
import usePackageSize, { Status } from '../Hooks/usePackageSize'
import FetchingResults from './FetchingResults'
import ErrorResults from './ErrorResults'
import ReceivedResults from './ReceivedResults'

const Results: React.FC = (): ReactElement | null => {
  const [packageName] = usePackageName()
  const result = usePackageSize(packageName)

  switch (result.status) {
    case Status.sleeping:
      return null
    case Status.fetching:
      return <FetchingResults packageName={packageName} />
    case Status.received:
      return (
        <ReceivedResults
          packageName={packageName}
          packageSizes={result.results}
        />
      )
    case Status.error:
      return (
        <ErrorResults packageName={packageName} serverError={result.error} />
      )
  }
}

export default Results
