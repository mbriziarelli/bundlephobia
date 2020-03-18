import winston from 'winston'

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  silent: process.env.NODE_ENV === 'test',
})

export default logger
