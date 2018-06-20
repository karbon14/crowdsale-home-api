import bunyan from 'bunyan'

const logger = bunyan.createLogger({ name: 'Karbon14' })

if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1)
}

export const log = logger
