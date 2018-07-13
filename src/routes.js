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

import swaggerjson from './public/swagger.json'

/**
 * @swagger
 * paths:
 *   /contact:
 *     post:
 *       description: Support email
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: contact
 *           description: Contact schema.
 *           schema:
 *             $ref: '#/definitions/Contact'
 *       responses:
 *         200:
 *           description: 200 ok
 * definitions:
 *   Contact:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       message:
 *         type: string
 *     required:
 *       - name
 *       - email
 *       - message
 */
router.post('/contact', validateSchema({ body: contactSchema }), contact(sendEmail))

/**
 * @swagger
 * paths:
 *  /subscribe:
 *    post:
 *     description: Subscribe to a list of mailchimp
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: subscribe
 *         description: Subscribe schema.
 *         schema:
 *           $ref: '#/definitions/Subscribe'
 *     responses:
 *       200:
 *         description: 200 ok
 * definitions:
 *   Subscribe:
 *     properties:
 *       email:
 *         type: string
 *     required:
 *       - email
 */
router.post('/subscribe', validateSchema({ body: subscribeSchema }), subscribe(addEmailList))

/**
 * @swagger
 * paths:
 *  /whitepaper:
 *   get:
 *     description: Download whitepaper
 *     produces:
 *       - application/pdf
 *     responses:
 *       '200':
 *         description: File whitepaper
 *         content:
 *          application/pdf:
 *           schema:
 *            type: string
 *            format: binary
 * 
 */
router.get('/whitepaper', validateSchema({ query: whitepaperSchema }), whitepaper(configuration))

router.get('/api-docs', (ctx) => ctx.body = swaggerjson)

export { router }
