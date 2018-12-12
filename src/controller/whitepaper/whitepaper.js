import { resolve } from 'path'
import { createReadStream } from 'fs'
import Joi from 'joi'

export const whitepaperSchema = () => ({
  lang: Joi.string()
    .min(2)
    .max(2),
})

export const whitepaper = (ctx) => {
  const lang = ctx.query && ctx.query.lang ? ctx.query.lang : 'EN'
  const whitepaperName = `whitepaper_Karbon14_${lang.toUpperCase()}.pdf`

  const fileName = resolve(__dirname, `../../../node_modules/@karbon14/whitepaper/whitepaper/${whitepaperName}`)
  ctx.body = createReadStream(fileName)

  ctx.set('Content-disposition', `attachment; filename=${whitepaperName}`)
  ctx.set('Content-Type', 'application/pdf')
  ctx.status = 200
}
