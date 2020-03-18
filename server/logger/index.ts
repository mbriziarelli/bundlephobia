import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'bundlephobia' }),
    winston.format.timestamp(),
    winston.format.json({
      space: process.env.NODE_ENV === 'production' ? 0 : 2,
    })
  ),
  transports: [new winston.transports.Console()],
  silent: process.env.NODE_ENV === 'test',
})

export default logger
