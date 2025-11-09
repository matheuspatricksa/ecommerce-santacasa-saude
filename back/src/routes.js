import { Router } from "express";

import { selectPlans, selectPlan, insertPlan, updatePlan, deletePlan } from './controller/plans.js';
import { selectClients, selectClient, insertClient, updateClient, deleteClient } from './controller/clients.js';
import { selectPurchases, insertPurchase } from './controller/purchases.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statusCode: '200',
    message: "Santa Casa API running!"
  })
});

// Plans routes
router.get('/plans', selectPlans);
router.get('/plan', selectPlan);
router.post('/plan', insertPlan);
router.put('/plan', updatePlan);
router.delete('/plan', deletePlan);

// Clients routes
router.get('/clients', selectClients);
router.get('/client', selectClient);
router.post('/client', insertClient);
router.put('/client', updateClient);
router.delete('/client', deleteClient);

// Purchases routes
router.get('/purchases', selectPurchases);
router.post('/purchase', insertPurchase);

export default router;