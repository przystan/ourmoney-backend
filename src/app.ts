import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as apiController from './controllers/api';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import apiRoute from './routes/api.route';
import { corsOptions } from './config/options';
import connectDB from './config/db';
// Create Express server
const app = express();

const expressSwagger = require('express-swagger-generator')(app);
// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const router = express.Router();

dotenv.config({ path: '.env' });

//initDatabaseConnect
connectDB();

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

// app.get('/db', async (req: Request, res: Response) => {
//     const dbs = await listDatabases(Database.client);
//     res.send(dbs);
// });

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);

// app.use('/item', apiRoute);

// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(specs, {
//         explorer: true
//     })
// );

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0'
        },
        host: 'localhost:8080',
        basePath: '',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: ''
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

require('./routes/auth.route')(app);

process.on('SIGINT', () => {
    console.log('exit');
    //Database.client.close();
    process.exit();
});

export default app;
