import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//import {Express,request,response} from 'express'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    info: {
      title: 'Devabrat Saikia API Assignment for Zerozilla Infotech Pvt Ltd',
      description:
        'This is a REST API application made with Nodejs Express and MongoDB.',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/index.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
