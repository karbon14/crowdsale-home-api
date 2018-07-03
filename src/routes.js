import Router from 'koa-router'
import joi from 'joi'
import { validateSchema } from './middleware/validateSchema/validateSchema'
import { configuration } from './configuration/configuration'

import { SendEmail } from './modules/SendEmail/SendEmail'
import { Transporter } from './modules/Transporter/Transporter'
import { AddEmailList } from './modules/AddEmailList/AddEmailList'

const transporter = Transporter(configuration)
const sendEmail = SendEmail(configuration, transporter)
const addEmailList = AddEmailList(configuration)

const router = new Router()

import { contact, contactSchema } from './controller/contact/contact'
import { subscribe, subscribeSchema } from './controller/subscribe/subscribe'
import { whitepaper, whitepaperSchema } from './controller/whitepaper/whitepaper'

router.post('/contact', validateSchema({ body:  contactSchema }), contact(sendEmail))
router.post('/subscribe', validateSchema({ body: subscribeSchema }), subscribe(addEmailList))
router.get('/whitepaper', validateSchema({ query: whitepaperSchema }), whitepaper(configuration))

export { router }
