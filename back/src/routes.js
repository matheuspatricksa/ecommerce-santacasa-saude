import { Router } from "express";

import { selectPlans, selectPlan, insertPlan, updatePlan, deletePlan } from './controller/plans.js';
import { selectClients, selectClient, insertClient, updateClient, deleteClient } from './controller/clients.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statusCode: '200',
    message: "Santa Casa API running!"
  })
});

// Plans routes
router.get('/plans', selectPlans); //ok
router.get('/plan', selectPlan); //ok
router.post('/plan', insertPlan); //ok
router.put('/plan', updatePlan); //ok
router.delete('/plan', deletePlan); //ok

// Clients routes
router.get('/clients', selectClients); //ok
router.get('/client', selectClient); //ok
router.post('/client', insertClient); //ok
router.put('/client', updateClient);  //ok
router.delete('/client', deleteClient); //ok

// Orders routes

export default router;