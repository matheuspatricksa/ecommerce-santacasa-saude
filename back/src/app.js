import express from 'express';
import router from './routes.js';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { createPlanTable } from './controller/plans.js';
import { createClientTable } from './controller/clients.js';
import { createPurchaseTable } from './controller/purchases.js';

const app = express();

createPlanTable();
createClientTable();
createPurchaseTable();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, () => {
    console.log('API running on port 3000');
})

https.createServer({
    key: fs.readFileSync('src/SSL/code.key'),
    cert: fs.readFileSync('src/SSL/code.crt'),
}, app).listen(3443, () => {
    console.log('HTTPS API running on port 3443');
});