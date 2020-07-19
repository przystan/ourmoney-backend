import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as apiController from './controllers/api';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import Database from './config/db';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import apiRoute from './routes/api.route';
// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

dotenv.config({ path: '.env' });

async function listDatabases(client: MongoClient) {
    const databasesList: any = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
    return databasesList;
}

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

app.get('/db', async (req: Request, res: Response) => {
    const dbs = await listDatabases(Database.client);
    res.send(dbs);
});

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);

app.use('/item', apiRoute);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true
    })
);

process.on('SIGINT', () => {
    console.log('exit');
    Database.client.close();
    process.exit();
});

export default app;
