import request from 'supertest'
import * as Next from 'next'
import createExpressApp from '.'

describe('Express App', () => {
  const app = createExpressApp(Next.default({}))

  it('handles /api/size route', async () => {
    await request(app)
      .get('/api/size')
      .expect(400) // missing package name
  })
  it('delegates the handling of other routes to next.js', async () => {
    await request(app)
      .get('/')
      .expect(200) // handled by next.js
  })
})
