import { resolve } from 'path'
import { createReadStream } from 'fs'

export const whitepaper = (configuration) => (ctx) => {
  const { WHITEPAPER_FILE } = configuration
  const fileName = resolve(__dirname, `../../public/${WHITEPAPER_FILE}`)
  ctx.body = createReadStream(fileName)

  ctx.set('Content-disposition', `attachment; filename=${WHITEPAPER_FILE}`)
  ctx.set('Content-Type', 'application/force-download')
  ctx.status = 200
}
