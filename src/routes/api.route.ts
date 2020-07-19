import express from 'express';
const router = express.Router();
import * as apiController from '../controllers/api';

/**
 * @swagger
 * path:
 *  /item:
 *    get:
 *      summary: Get test item
 *      requestBody:
 *        content:
 *          application/json:
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              
 */

router.post('/', apiController.addTestItem);


router.get('/:id', apiController.getTestItem);

export default router;
