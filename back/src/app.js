import express from 'express';
import router from './routes.js';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { createPlanTable } from './controller/plans.js';
import { createClientTable } from './controller/clients.js';
import { createPurchaseTable } from './controller/purchases.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

async function start() {
    try {
        // inicializa/create tabelas e seeds de forma síncrona
        await createPlanTable();
        await createClientTable();
        await createPurchaseTable();

        app.listen(3000, () => {
            console.log('API running on port 3000');
        });

        https.createServer({
            key: fs.readFileSync('src/SSL/code.key'),
            cert: fs.readFileSync('src/SSL/code.crt'),
        }, app).listen(3443, () => {
            console.log('HTTPS API running on port 3443');
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();