import express from 'express';
const routes = express.Router();
import authToken from '../middleware/jwtToken.js';

import {
  createClientAgencyDetails,
  updateClientDetails,
  getMaxTotalbill,
  getAllDetails,
  login,
  signup,
} from '../controllers/index.js';
// create agency and client

/**
 * @swagger
 * '/create':
 *  post:
 *    tags:
 *    - Agency
 *    summary: Enters agency and client details
 *    requstBody:
 *      required:true
 *    content:
 *      application/json:
 *        schema:
 *          oneOf:
 *            - $ref: '#/components/schemas/createAgencyInput'
 *            - $ref: '#/components/schemas/createClientInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          appication/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/createAgencyResponse'
 *                - $ref: '#/components/schemas/createClientResponse'
 *      400:
 *        description: Bad request
 *
 *
 */

routes.post('/create', authToken, createClientAgencyDetails);
// update client

/**
 * @swagger
 * '/updateClient/{clientId}':
 *   patch:
 *     tags:
 *     - Client
 *     parameters:
 *      - in: path
 *        name: clientId
 *        required: true
 *        type: string
 *        description: The Client ID.
 *      - in: body
 *        name: Client
 *        description: Update Client
 *        requstBody:
 *          required:true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createClientUpdate'
 *     responses:
 *       201:
 *         description: Created
 */
routes.put('/updateClient/:clientId', updateClientDetails);
// get maximum totalbill

routes.get('/', getAllDetails);

routes.get('/getMaxTotalbill', getMaxTotalbill);

// login routes
routes.post('/login', login);
// signup
routes.post('/singup', signup);

export default routes;
