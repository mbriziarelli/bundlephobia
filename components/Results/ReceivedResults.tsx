import React, { ReactElement } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { PackageSizes } from '../Hooks/usePackageSize'
import ResultsBox from './ResultsBox'
import wordings from '../wordings.json'

const useStyles = makeStyles((theme: Theme) => ({
  size: {
    color: 'black',
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
  },
  unit: {
    color: 'gray',
    fontWeight: 'bold',
  },
  label: {
    textTransform: 'uppercase',
    color: 'silver',
  },
}))

interface SizeResultProps {
  sizeInBytes: number
  label: string
}

interface ReceivedResultsProps {
  packageName: string
  packageSizes: PackageSizes
}

const megabyte = 1024 * 1024
const kilobyte = 1024

const toUnits = (sizeInBytes: number): [string, string] => {
  if (sizeInBytes >= megabyte) {
    return [(sizeInBytes / megabyte).toFixed(1), wordings.megabytesUnit]
  } else if (sizeInBytes >= kilobyte) {
    return [(sizeInBytes / kilobyte).toFixed(1), wordings.kilobytesUnit]
  } else {
    return [sizeInBytes.toString(), wordings.bytesUnit]
  }
}

const SizeResult: React.FC<SizeResultProps> = ({ sizeInBytes, label }) => {
  const classes = useStyles()
  const [size, unit] = toUnits(sizeInBytes)
  return (
    <Grid
      container
      direction="row"
      item
      justify="center"
      xs={6}
      alignContent="flex-start"
    >
      <Grid xs={12} item container justify="center">
        <Typography className={classes.size} variant="h4">
          {size}
        </Typography>
        <Typography className={classes.unit} variant="h4">
          {unit}
        </Typography>
      </Grid>
      <Grid xs={12} item container justify="center">
        <Typography className={classes.label} variant="h6">
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}

const ReceivedResults: React.FC<ReceivedResultsProps> = ({
  packageName,
  packageSizes,
}): ReactElement => (
  <ResultsBox title={`${packageName} bundle size`}>
    <SizeResult
      sizeInBytes={packageSizes.minifiedSize}
      label={wordings.minified}
    />
    <SizeResult
      sizeInBytes={packageSizes.gzippedSize}
      label={wordings.minifiedAndGzipped}
    />
  </ResultsBox>
)

export default ReceivedResults
