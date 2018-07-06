require('dotenv').config({ path: '.env' })
import Koa from 'koa'
import cors from 'koajs-cors'
import { router } from './routes'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
const PORT = process.env.PORT || 3000
const app = new Koa()

const corsOptions = {
  methods: ['GET', 'POST'],
  headers: ['Content-Type', 'Authorization', 'token'],
  origin: '*',
}

app
  .use(koaBody())
  .use(bodyParser())
  .use(cors(corsOptions))
  .use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => console.log(`Koa app listening on http://localhost:${PORT}`))
