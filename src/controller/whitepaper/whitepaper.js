import { resolve } from 'path'
import { createReadStream } from 'fs'
import Joi from 'joi'

export const whitepaperSchema = () => ({
  lang: Joi.string()
    .min(2)
    .max(2),
})

export const whitepaper = (configuration) => (ctx) => {
  const lang = ctx.query && ctx.query.lang ? ctx.query.lang : 'EN'
  const whitepaperName = configuration[`WHITEPAPER_FILE_${lang.toUpperCase()}`]

  const fileName = resolve(__dirname, `../../public/${whitepaperName}`)
  ctx.body = createReadStream(fileName)

  ctx.set('Content-disposition', `attachment; filename=${whitepaperName}`)
  ctx.set('Content-Type', 'application/pdf')
  ctx.status = 200
}
