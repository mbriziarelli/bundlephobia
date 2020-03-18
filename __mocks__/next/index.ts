import { Request, Response } from 'express'
const actualNext = jest.requireActual('next')

export default (): typeof import('next') => ({
  ...actualNext,
  prepare: (): Promise<void> => Promise.resolve(),
  getRequestHandler: () => (req: Request, res: Response): void =>
    void res.status(200).send('This part of the app is handled by Next.js'),
})
