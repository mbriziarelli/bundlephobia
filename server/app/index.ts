import url from 'url'
import * as Next from 'next'
import express, { Request, Response, Express } from 'express'
import getSizeMiddleware from '../buildService'

export default (nextServer: ReturnType<typeof Next.default>): Express => {
  const app = express()

  app.get('/api/size', getSizeMiddleware)
  app.get(
    '*',
    async (req: Request, res: Response): Promise<void> => {
      try {
        await nextServer.getRequestHandler()(req, res, url.parse(req.url, true))
      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    }
  )

  return app
}
