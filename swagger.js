const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Games API",
      version: "1.0.0",
      description: "CSE341 W03 CRUD API"
    },
    servers: [
      {
        url: "https://w03-crud.onrender.com",
        description: "Production server"
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;