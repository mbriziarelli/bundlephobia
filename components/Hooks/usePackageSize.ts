import { useEffect, useState } from 'react'
import axios, { AxiosError, CancelToken, CancelTokenSource } from 'axios'
import { ServerError } from 'bundlephobia-errors'
import { PackageStats } from 'package-build-stats'
import { isNonEmptyString, isNumber } from '../../server/helpers/types'

export interface PackageSizes {
  minifiedSize: number
  gzippedSize: number
}

export enum Status {
  sleeping = 'sleeping',
  fetching = 'fetching',
  received = 'received',
  error = 'error',
}

interface SleepingResult {
  status: Status.sleeping
}

interface FetchingResult {
  status: Status.fetching
}

interface ReceivedResult {
  status: Status.received
  results: PackageSizes
}

interface ErrorResult {
  status: Status.error
  error: ServerError
}

type Result = SleepingResult | FetchingResult | ReceivedResult | ErrorResult

const isServerError = (error: unknown): error is ServerError => {
  if (error) {
    const statusCode = Object.getOwnPropertyDescriptor(error, 'statusCode')
      ?.value
    const code = Object.getOwnPropertyDescriptor(error, 'code')?.value
    const message = Object.getOwnPropertyDescriptor(error, 'message')?.value

    return (
      isNumber(statusCode) &&
      isNonEmptyString(code) &&
      isNonEmptyString(message)
    )
  }

  return false
}

const buildError = (error: AxiosError): ServerError => {
  const serverError = {
    ...error.response?.data,
    statusCode: error.response?.status ?? 500,
  }
  return isServerError(serverError)
    ? serverError
    : {
        statusCode: error.response?.status ?? 500,
        code: 'UnknownError',
        message: 'Unknown error while building package.',
      }
}

const buildPackage = (
  packageName: string,
  cancelToken: CancelToken
): Promise<ReceivedResult | ErrorResult> =>
  axios
    .get<PackageStats>(`/api/size?p=${packageName}`, {
      cancelToken,
    })
    .then(response => {
      const packageStats = response.data
      return {
        status: Status.received,
        results: {
          minifiedSize: packageStats.size,
          gzippedSize: packageStats.gzip,
        },
      } as ReceivedResult
    })
    .catch((error: AxiosError) => ({
      status: Status.error,
      error: buildError(error),
    }))

export default (packageName: string): Result => {
  const [result, setResult] = useState<Result>({ status: Status.sleeping })

  useEffect(() => {
    let source: CancelTokenSource | null = null

    if (isNonEmptyString(packageName)) {
      source = axios.CancelToken.source()

      setResult({ status: Status.fetching })
      buildPackage(packageName, source.token).then(result => {
        setResult(result)
        source = null
      })
    } else {
      setResult({ status: Status.sleeping })
    }

    return (): void => void source?.cancel()
  }, [packageName])

  return result
}
