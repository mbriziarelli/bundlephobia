declare module 'bundlephobia-errors' {
  export interface ServerError {
    statusCode: number
    code: string
    message: string
  }
}
