import Router from 'koa-router'
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

/**
 * @swagger
 * /contact:
 *   post:
 *     description: Support email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of user.
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email of user.
 *         required: true
 *         type: string
 *       - name: message
 *         description: Message of support.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 ok
 */
router.post('/contact', validateSchema({ body: contactSchema }), contact(sendEmail))

/**
 * @swagger
 * /subscribe:
 *   post:
 *     description: Subscribe to a list of mailchimp
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for subscribe.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 ok
 */
router.post('/subscribe', validateSchema({ body: subscribeSchema }), subscribe(addEmailList))

/**
 * @swagger
 * /whitepaper:
 *   get:
 *     description: Download whitepaper
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: File whitepaper
 */
router.get('/whitepaper', validateSchema({ query: whitepaperSchema }), whitepaper(configuration))

export { router }
