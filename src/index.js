const app = require('./app')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDocument = require('../swagger.json')
const port = process.env.PORT || 3000

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Bridge API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Octan Group",
          url: "https://octan.group",
          email: "hello@octan.group",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/admins",
        },
      ],
    },
    apis: ["../models/admins"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))
app.listen(port, () => {
    console.log(`The server is up and running on ${port}!`)
})