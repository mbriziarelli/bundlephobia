import path from 'path'
import next from 'next'
import logger from './logger'
import createExpressApp from './app'

const dev = process.env.NODE_ENV !== 'production'
const dir = path.resolve(__dirname, '../')
const nextApp = next({ dev, dir })

nextApp.prepare().then(() => {
  const expressApp = createExpressApp(nextApp)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expressApp.listen(3000, (err: any): void => {
    if (err) {
      logger.error(err)
      process.exit(1)
    } else {
      logger.info('Listening on http://localhost:3000')
    }
  })
})
