import express from 'express';
const routes = express.Router();

import {
  createClientAgencyDetails,
  updateClientDetails,
  getMaxTotalbill,
} from '../controllers/index.js';
// create agency and client
routes.post('/create', createClientAgencyDetails);
// update client
routes.put('/updateClient/:clientId', updateClientDetails);
// get maximum totalbill
routes.get('/getMaxTotalbill', getMaxTotalbill);

export default routes;
