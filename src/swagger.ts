import swaggerJsdoc from 'swagger-jsdoc';
import * as api from './controllers/api';

const options = {
    // List of files to be processed.
    apis: [__dirname+"/routes/*.js"],
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    basePath: '/',
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Time to document that Express API you built',
            version: '1.0.0',
            description: 'A test project to understand how easy it is to document and Express API',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/'
            },
            contact: {
                name: 'Swagger',
                url: 'https://swagger.io',
                email: 'Info@SmartBear.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:8080/'
            }
        ]
    },

    host: 'localhost:8080'
};

const specs = swaggerJsdoc(options);
export default specs;
