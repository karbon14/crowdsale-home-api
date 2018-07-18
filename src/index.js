import Koa from 'koa'
import cors from 'koajs-cors'
import { router } from './routes'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import serve from 'koa-static'
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
  .use(serve(__dirname + '/public'))
  .use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname + '/public'))

app.listen(PORT, () => console.log(`Koa app listening on http://localhost:${PORT}`))
