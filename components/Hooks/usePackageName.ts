import { useRouter } from 'next/router'
import { isNonEmptyString } from '../../server/helpers/types'

const sanitizePackageName = (packageName: unknown): string =>
  isNonEmptyString(packageName) ? packageName : ''

const usePackageName = (): [string, (_: string) => void] => {
  const router = useRouter()
  return [
    sanitizePackageName(router.query.p),
    (newPackageName: string): void => {
      router.push(
        isNonEmptyString(newPackageName) ? `/?p=${newPackageName}` : '/',
        undefined,
        { shallow: true }
      )
    },
  ]
}

export default usePackageName
