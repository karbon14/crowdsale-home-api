import Router from 'koa-router'
import joi from 'joi'
import { validateSchema } from './middleware/validateSchema/validateSchema'
import { configuration } from './configuration/configuration'

import { SendEmail } from './modules/SendEmail/SendEmail'
import { Transporter } from './modules/transporter/transporter'
import { AddEmailList } from './modules/AddEmailList/AddEmailList'

const transporter = Transporter(configuration)
const sendEmail = SendEmail(configuration, transporter)
const addEmailList = AddEmailList(configuration)

const router = new Router()

import { contact, contactSchema } from './controller/contact/contact'
import { subscribe, subscribeSchema } from './controller/subscribe/subscribe'
import { whitepaper } from './controller/whitepaper/whitepaper'

router.post('/subscribe', validateSchema(subscribeSchema(joi)), subscribe(addEmailList))
router.post('/contact', validateSchema(contactSchema(joi)), contact(sendEmail))
router.get('/whitepaper', whitepaper(configuration))

export { router }
