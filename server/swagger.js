const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const app = require('./app');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'eCommerce REST API',
            version: '1.0.0',
            description: 'eCommerce API'
        },
        host: 'localhost:4001',
        basePath: '/'
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = (app) =>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}




/*
swagger: "2.0"

info:
  description: "Codecademy e-commerce REST API"
  version: "1.0.0"
  title: "E-commerce REST API"

schemes: 
  - http

host: localhost:4000

basePath: "/"

paths:
  /auth/register:
    post:
      summary: "Register a new user"
      description: "Register a new user"
      produces:
        - "application/json"
      parameters:
      responses:
        200:
          description: 200 Success
          schema:
            type: object
            items:
        409:
          description: 409 Conflict
          schema:
            type: object
            items:
        500:
          description: 500 Internal Server Error
          schema:
            type: object
            items:
  /auth/login:
    post:
      summary: "Login to a user account"
      description: "Login to a user account"
      produces:
        - "application/json"
      parameters:
      responses:
        200:
          description: 200 Success
          schema:
            type: object
            items:
        401:
          description: 401 Unauthorized
          schema:
            type: object
            items:
        500:
          description: 500 Internal Server Error
          schema:
            type: object
            items:
  /users/{userId}:
    get:
      summary: "Get user record"
      description: "Get user record"
      produces:
        - "application/json"
      parameters:
      responses:
        200:
          description: 200 Success
          schema:
            type: object
            items:
        500:
          description: 500 Internal Server Error
          schema:
            type: object
            items:
    put:
      summary: "Update user record"
      description: "Update user record"
      produces:
        - "application/json"
      parameters:
      responses:
        200:
          description: 200 Success
          schema:
            type: object
            items:
        500:
          description: 500 Internal Server Error
          schema:
            type: object
            items:

*/