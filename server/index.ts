import url from 'url'
import path from 'path'
import express, { Request, Response } from 'express'
import next from 'next'
import getSizeMiddleware from './buildService'

const dev = process.env.NODE_ENV !== 'production'
const dir = path.resolve(__dirname, '../')
const app = next({ dev, dir })
const handle = app.getRequestHandler()

const handleToNextMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  await handle(req, res, url.parse(req.url, true))
}

const onListening = (err: unknown): void => {
  if (err) throw err
  console.log('Listening on http://localhost:3000')
}

app.prepare().then(() => {
  const expressApp = express()

  expressApp
    .get('/api/size', getSizeMiddleware)
    .use(handleToNextMiddleware)
    .listen(3000, onListening)
})
