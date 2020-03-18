import path from 'path'
import next from 'next'
import createExpressApp from './app'

const dev = process.env.NODE_ENV !== 'production'
const dir = path.resolve(__dirname, '../')
const nextApp = next({ dev, dir })

nextApp.prepare().then(() => {
  const expressApp = createExpressApp(nextApp)

  expressApp.listen(3000, (err: unknown): void => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log('Listening on http://localhost:3000')
    }
  })
})
