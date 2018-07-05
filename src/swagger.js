import swaggerJSDoc from 'swagger-jsdoc'
import fs from 'fs'

const options = {
  swaggerDefinition: {
    info: {
      title: 'Karbon14 API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes.js'],
}

const swaggerSpec = swaggerJSDoc(options)

fs.writeFile('./src/public/swagger.json', JSON.stringify(swaggerSpec), (err) => {
  if (err) return console.log(err)

  console.log('Swagger doc was saved!')
})
